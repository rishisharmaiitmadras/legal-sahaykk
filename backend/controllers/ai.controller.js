import { spawn } from "child_process";
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");

export const askAI = async (req, res) => {

    try {

        const userText = req.body.text;

        if (!userText) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        // ==================================
        // PDF EXISTS
        // ==================================

        if (req.file) {

            console.log("PDF Uploaded");

            // uploaded file path
            const filePath = req.file.path;

            // read pdf
            const dataBuffer = fs.readFileSync(filePath);

            // extract text
            const pdfData = await pdfParse(dataBuffer);

            const extractedText = pdfData.text;

            // save extracted text
            fs.writeFileSync(
                "python/LegalSahayk/temp_contract.txt",
                extractedText
            );

            console.log("PDF text extracted and saved");

            // ==================================
            // RUN INGESTION
            // ==================================

            await new Promise((resolve, reject) => {

                const ingestProcess = spawn("python", [
                    "python/LegalSahayk/ingestion.py"
                ]);

                let ingestError = "";

                ingestProcess.stderr.on("data", (data) => {
                    ingestError += data.toString();
                });

                ingestProcess.on("close", (code) => {

                    if (code !== 0) {
                        reject(ingestError);
                    } else {
                        resolve();
                    }

                });

            });

            console.log("Contract ingestion completed");
        }

        // ==================================
        // RUN PYTHON AGENT
        // ==================================

        const pythonProcess = spawn("python", [
            "python/LegalSahayk/run_agent.py",
            userText
        ]);

        let outputData = "";
        let errorData = "";

        // stdout capture
        pythonProcess.stdout.on("data", (data) => {
            outputData += data.toString();
        });

        // stderr capture
        pythonProcess.stderr.on("data", (data) => {
            errorData += data.toString();
        });

        // process complete
        pythonProcess.on("close", (code) => {

            if (code !== 0) {

                return res.status(500).json({
                    success: false,
                    error: errorData
                });

            }

            return res.json({
                success: true,
                answer: outputData
            });

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });

    }

};