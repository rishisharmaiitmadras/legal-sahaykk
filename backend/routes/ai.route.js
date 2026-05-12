import express from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { askAI } from "../controllers/ai.controller.js"
//router is the mini app 
const router = express.Router()

router.post("/ask", upload.single("file"), askAI);


export default router