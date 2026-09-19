import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { generateComponent } from "../controllers/aicomponent.controller.js"
import { saveComponent, publishComponent } from "../controllers/component.controller.js"

const componentRouter = express.Router()

componentRouter.post("/generate" , isAuth , generateComponent)

componentRouter.post("/save" , isAuth , saveComponent)

componentRouter.post("/publish" , isAuth , publishComponent)

export default componentRouter