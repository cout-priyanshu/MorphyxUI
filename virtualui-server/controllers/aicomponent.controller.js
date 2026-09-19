import User from "../models/user.model.js";
import { askAI } from "../utils/openRouter.js";

export const generateComponent = async (req, res) => {
  let user = null;
  let creditDeducted = false;

  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    // Deduct credits if normal user
    if (user.role === "user") {
      if (user.aiCredits < 50) {
        return res.status(400).json({ message: "Not enough AI credits" });
      }
      user.aiCredits -= 50;
      await user.save();
      creditDeducted = true;
    }

    const messages = [
      {
        role: "system",
        content: `You are a React component generator. Output ONLY a valid JSON object. No markdown, no backticks, no explanation.

CRITICAL: Your entire response must be parseable by JSON.parse(). Start with { and end with }.

OUTPUT FORMAT:
{
  "name": "ComponentName",
  "code": "<full component code as single escaped string>",
  "props": ["prop1", "prop2"]
}

--- CODE RULES ---
- Import hooks like this: import React, { useState, useEffect, useRef, useCallback } from "react";
- Named export only: export const ComponentName = ({ ...props }) => { ... }
- Inline styles ONLY. No CSS classes, no Tailwind, no styled-components.
- All props must have default values. Component must look great with zero props passed.
- No TypeScript. No external libraries. No framer-motion. No icon libraries.
- NEVER use template literals inside JSX style objects.
- Always use string concatenation for dynamic style values: "1px solid " + accent
- NEVER use position "fixed". Use "absolute" or "relative" only.
- For hex to rgba conversion, define this helper inside the component:
  const alpha = (hex, op) => { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return "rgba("+r+","+g+","+b+","+op+")"; };
- In the JSON output, escape every double quote inside the code string as \\"
- In the JSON output, escape every newline inside the code string as \\n
- Do NOT use single quotes inside JSX. Use escaped double quotes \\" only.

--- DESIGN RULES ---
- Dark backgrounds: #070507, #0a0709, #0c080a, #0e0a0d
- Primary text & frost accents: #f5eff2 (Frosted White), #fbcfe8 (Soft Pink Mist), #fda4af (Muted Rose Tint)
- Rich accent colors: #e11d48, #be123c, #f43f5e (Subdued Velvet Crimson & Deep Rose)
- Interactive surfaces: #1b1015, #221017, #2a171f (Dark Wine / Tinted Obsidian)
- border-radius: 14px to 20px on cards, 8px to 10px on buttons & badge tabs
- Font: system-ui, -apple-system, sans-serif
- Subtle borders: 1px solid rgba(244, 63, 94, 0.15) & 1px solid rgba(255, 255, 255, 0.06)
- Box shadows: 0 20px 50px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.05)
- Aesthetic: Refined frosted pinkish-white on pitch obsidian, zero harsh neon bloom, self-contained layout.

--- LIVE PREVIEW RULES ---
- Renders inside react-live sandbox. Container is dark #070507, 800px wide, 400px min-height.
- NEVER use position fixed. It breaks the sandbox.
- NEVER import from any external package. Only React and its hooks are in scope.
- Everything must be self-contained inside the component.
- Use widths between 280px and 720px so it centers nicely in preview.

--- EXAMPLE 1: Button ---
{"name":"Button","code":"import React from \\"react\\";\\n\\nexport const Button = ({ text = \\"Get Started\\", bg = \\"#1b1015\\", color = \\"#f5eff2\\", border = \\"#e11d48\\", size = \\"md\\", disabled = false, loading = false, onClick = () => {} }) => {\\n  const sizes = { sm: \\"8px 16px\\", md: \\"11px 24px\\", lg: \\"14px 32px\\" };\\n  return (\\n    <button\\n      onClick={onClick}\\n      disabled={disabled || loading}\\n      style={{\\n        background: bg,\\n        color: color,\\n        padding: sizes[size],\\n        borderRadius: \\"10px\\",\\n        border: \\"1px solid \\" + border,\\n        cursor: disabled ? \\"not-allowed\\" : \\"pointer\\",\\n        fontWeight: \\"600\\",\\n        fontSize: \\"14px\\",\\n        fontFamily: \\"system-ui,sans-serif\\",\\n        boxShadow: \\"0 4px 14px rgba(225,29,72,0.25)\\",\\n        opacity: disabled ? 0.6 : 1,\\n        transition: \\"all 0.2s\\"\\n      }}\\n    >\\n      {loading ? \\"Loading...\\" : text}\\n    </button>\\n  );\\n};","props":["text","bg","color","border","size","disabled","loading","onClick"]}

--- EXAMPLE 2: ImageCard ---
{"name":"ImageCard","code":"import React, { useState } from \\"react\\";\\n\\nexport const ImageCard = ({\\n  image = \\"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80\\",\\n  tag = \\"Travel\\",\\n  title = \\"Discover the Hidden Peaks\\",\\n  description = \\"A breathtaking journey through untouched landscapes and snow-capped summits.\\",\\n  buttonText = \\"Explore\\",\\n  accent = \\"#e11d48\\",\\n  bg = \\"#0c080a\\",\\n  onButtonClick = () => {}\\n}) => {\\n  const [hovered, setHovered] = useState(false);\\n  const alpha = (hex, op) => {\\n    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);\\n    return \\"rgba(\\" + r + \\",\\" + g + \\",\\" + b + \\",\\" + op + \\")\\";\\n  };\\n  return (\\n    <div\\n      onMouseEnter={() => setHovered(true)}\\n      onMouseLeave={() => setHovered(false)}\\n      style={{\\n        background: bg,\\n        borderRadius: \\"20px\\",\\n        overflow: \\"hidden\\",\\n        width: \\"310px\\",\\n        border: \\"1px solid \\" + (hovered ? alpha(accent, 0.4) : \\"rgba(255,255,255,0.06)\\"),\\n        fontFamily: \\"system-ui,sans-serif\\",\\n        transition: \\"transform 0.25s, border-color 0.25s\\",\\n        transform: hovered ? \\"translateY(-3px)\\" : \\"translateY(0px)\\",\\n        boxShadow: \\"0 20px 50px rgba(0,0,0,0.85)\\"\\n      }}\\n    >\\n      <div style={{ position: \\"relative\\", width: \\"100%\\", height: \\"170px\\", overflow: \\"hidden\\" }}>\\n        <img src={image} alt={title} style={{ width: \\"100%\\", height: \\"100%\\", objectFit: \\"cover\\" }} />\\n        <div style={{ position: \\"absolute\\", inset: 0, background: \\"linear-gradient(to top, rgba(12,8,10,0.8) 0%, transparent 60%)\\" }} />\\n        {tag && (\\n          <div style={{ position: \\"absolute\\", top: \\"12px\\", left: \\"12px\\", padding: \\"4px 10px\\", borderRadius: \\"20px\\", background: \\"#221017\\", border: \\"1px solid \\" + alpha(accent, 0.5), fontSize: \\"10px\\", fontWeight: \\"700\\", color: \\"#fbcfe8\\", textTransform: \\"uppercase\\" }}>{tag}</div>\\n        )}\\n      </div>\\n      <div style={{ padding: \\"18px\\" }}>\\n        <h3 style={{ fontSize: \\"15px\\", fontWeight: \\"700\\", color: \\"#f5eff2\\", margin: \\"0 0 8px\\" }}>{title}</h3>\\n        <p style={{ fontSize: \\"12px\\", color: \\"rgba(245,239,242,0.5)\\", lineHeight: 1.6, margin: \\"0 0 16px\\" }}>{description}</p>\\n        <button\\n          onClick={onButtonClick}\\n          style={{ width: \\"100%\\", padding: \\"10px\\", borderRadius: \\"10px\\", border: \\"1px solid \\" + alpha(accent, 0.4), background: \\"#1b1015\\", color: \\"#f5eff2\\", fontSize: \\"13px\\", fontWeight: \\"600\\", cursor: \\"pointer\\", fontFamily: \\"inherit\\" }}\\n        >{buttonText}</button>\\n      </div>\\n    </div>\\n  );\\n};","props":["image","tag","title","description","buttonText","accent","bg","onButtonClick"]}

--- EXAMPLE 3: PricingCard ---
{"name":"PricingCard","code":"import React from \\"react\\";\\n\\nexport const PricingCard = ({\\n  planName = \\"Pro Plan\\",\\n  description = \\"For creators and teams.\\",\\n  price = 29,\\n  currency = \\"$\\",\\n  period = \\"per month\\",\\n  badgeText = \\"Most Popular\\",\\n  ctaText = \\"Get Started\\",\\n  accent = \\"#e11d48\\",\\n  bg = \\"#0c080a\\",\\n  features = [\\"Unlimited projects\\", \\"Priority support\\", \\"Custom styles\\"],\\n  onCtaClick = () => {}\\n}) => {\\n  const alpha = (hex, op) => {\\n    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);\\n    return \\"rgba(\\" + r + \\",\\" + g + \\",\\" + b + \\",\\" + op + \\")\\";\\n  };\\n  return (\\n    <div style={{ background: bg, borderRadius: \\"20px\\", padding: \\"26px 22px\\", width: \\"300px\\", color: \\"#f5eff2\\", fontFamily: \\"system-ui,sans-serif\\", boxShadow: \\"0 20px 50px rgba(0,0,0,0.85)\\", border: \\"1px solid \\" + alpha(accent, 0.3), position: \\"relative\\" }}>\\n      {badgeText && (\\n        <div style={{ display: \\"inline-flex\\", alignItems: \\"center\\", padding: \\"3px 10px\\", borderRadius: \\"20px\\", marginBottom: \\"12px\\", background: \\"#221017\\", border: \\"1px solid \\" + alpha(accent, 0.4), fontSize: \\"10px\\", fontWeight: \\"700\\", color: \\"#fda4af\\", textTransform: \\"uppercase\\" }}>{badgeText}</div>\\n      )}\\n      <div style={{ fontSize: \\"18px\\", fontWeight: \\"800\\", marginBottom: \\"4px\\" }}>{planName}</div>\\n      <div style={{ fontSize: \\"12px\\", color: \\"rgba(245,239,242,0.5)\\", marginBottom: \\"18px\\" }}>{description}</div>\\n      <div style={{ display: \\"flex\\", alignItems: \\"baseline\\", gap: \\"2px\\", marginBottom: \\"16px\\" }}>\\n        <span style={{ fontSize: \\"16px\\", fontWeight: \\"700\\", color: \\"rgba(245,239,242,0.4)\\" }}>{currency}</span>\\n        <span style={{ fontSize: \\"44px\\", fontWeight: \\"800\\", color: \\"#f5eff2\\" }}>{Math.round(price)}</span>\\n        <span style={{ fontSize: \\"11px\\", color: \\"rgba(245,239,242,0.4)\\", marginLeft: \\"4px\\" }}>{period}</span>\\n      </div>\\n      <ul style={{ listStyle: \\"none\\", padding: 0, margin: \\"0 0 20px\\", display: \\"flex\\", flexDirection: \\"column\\", gap: \\"8px\\" }}>\\n        {features.map((f, i) => (\\n          <li key={i} style={{ fontSize: \\"12px\\", color: \\"rgba(245,239,242,0.75)\\" }}>• {f}</li>\\n        ))}\\n      </ul>\\n      <button onClick={onCtaClick} style={{ width: \\"100%\\", padding: \\"11px\\", borderRadius: \\"10px\\", border: \\"1px solid \\" + alpha(accent, 0.4), background: \\"#1b1015\\", color: \\"#f5eff2\\", fontSize: \\"13px\\", fontWeight: \\"600\\", cursor: \\"pointer\\", fontFamily: \\"system-ui,sans-serif\\" }}>{ctaText}</button>\\n    </div>\\n  );\\n};","props":["planName","description","price","currency","period","badgeText","ctaText","accent","bg","features","onCtaClick"]}`,
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const aiResponse = await askAI(messages);
    let parsed;

    try {
      const clean = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      parsed = JSON.parse(clean);
    } catch (parseError) {
      console.log("AI RESPONSE RAW:", aiResponse);
      console.log("JSON PARSE ERROR:", parseError);

      if (creditDeducted && user) {
        user.aiCredits += 50;
        await user.save();
      }

      return res.status(500).json({
        message: "AI returned invalid JSON. Credits refunded.",
      });
    }

    return res.status(200).json({
      parsed,
      remainingCredits: user.role === "user" ? user.aiCredits : null,
    });
  } catch (error) {
    console.log("GENERATE COMPONENT ERROR:", error);

    if (creditDeducted && user) {
      try {
        user.aiCredits += 50;
        await user.save();
      } catch (refundError) {
        console.log("Refund error:", refundError);
      }
    }

    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};