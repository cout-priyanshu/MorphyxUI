import Component from "../models/component.model.js"
import User from "../models/user.model.js"
import path from "path"
import fs from "fs"
import { execSync } from "child_process"

export const saveComponent = async (req, res) => {
    try {
        const { name, code, props, visibility } = req.body

        if (!name || !code) {
            return res.status(400).json({ message: "Component name and code are required" })
        }

        const userId = req.userId || req.user?._id
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID not found" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User is not found" })
        }

        let finalName = name.trim()

        if (user.role === "admin") {
            const existing = await Component.findOne({ name: finalName, visibility: "public" })
            if (existing) {
                // Admin duplicate name par unique suffix jod dega
                finalName = `${finalName}_${Date.now().toString().slice(-4)}`
            }
        } else {
            const existing = await Component.findOne({
                name: finalName,
                owner: userId,
            })
            if (existing) {
                // User duplicate name par fail karne ke bajaye unique suffix laga dega
                finalName = `${finalName}_${Date.now().toString().slice(-4)}`
            }
        }

        // Component save with explicit private visibility and owner
        const component = await Component.create({
            name: finalName,
            code,
            props: Array.isArray(props) ? props : [],
            owner: userId,
            visibility: visibility || "private",
        })

        return res.status(200).json({
            success: true,
            message: "Component saved successfully",
            component
        })
    } catch (error) {
        console.error("Component save error:", error)
        return res.status(500).json({ message: `Failed to save component: ${error.message}` })
    }
}

export const publishComponent = async (req, res) => {
    try {
        const userId = req.userId || req.user?._id
        const user = await User.findById(userId)
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "Only admin can publish",
            })
        }

        const { componentId } = req.body
        const component = await Component.findById(componentId)
        if (!component) {
            return res.status(404).json({
                message: "Component not found",
            })
        }

        if (component.owner.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You can only publish your own components",
            })
        }

        const libPath = path.join(process.cwd(), "../morphyxui-lib")
        const componentDir = path.join(libPath, "src/components", component.name)
        const componentFile = path.join(componentDir, `${component.name}.jsx`)
        const indexFile = path.join(libPath, "src/index.js")

        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true })
        }
        fs.writeFileSync(componentFile, component.code)

        let indexContent = ""
        if (fs.existsSync(indexFile)) {
            indexContent = fs.readFileSync(indexFile, "utf8")
        }

        const exportLine = `export { ${component.name} } from "./components/${component.name}/${component.name}.jsx";`

        if (!indexContent.includes(exportLine)) {
            fs.appendFileSync(indexFile, `\n${exportLine}\n`)
        }

        console.log("Cleaning old build...")
        const distPath = path.join(libPath, "dist")

        if (fs.existsSync(distPath)) {
            fs.rmSync(distPath, { recursive: true, force: true })
        }

        console.log("Building library...")
        execSync("npm run build", {
            cwd: libPath,
            stdio: "inherit",
        })

        console.log("Updating version...")
        execSync("npm version patch --no-git-tag-version", {
            cwd: libPath,
            stdio: "inherit",
        })

        console.log("Publishing to npm...")
        execSync("npm publish --access public", {
            cwd: libPath,
            stdio: "inherit",
        })

        component.visibility = "public"
        component.npmPackage = "morphyx-ui"

        await component.save()

        return res.status(200).json({ message: "Component published successfully" })
    } catch (error) {
        console.error("Publish Error:", error)
        return res.status(500).json({ message: `Component publish error: ${error.message}` })
    }
}

export const getAllComponents = async (req, res) => {
    try {
        const components = await Component.find()
            .populate("owner", "name email")
            .sort({ createdAt: -1 })

        return res.status(200).json(components || [])
    } catch (error) {
        return res.status(500).json({ message: `Failed to get All Components: ${error.message}` })
    }
}