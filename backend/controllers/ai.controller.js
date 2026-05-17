import { spawn } from "child_process";

export const askAI = async (req, res) => {

  try {

    const userText = req.body.text;

    if (!userText) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // ==================================
    // PDF EXISTS
    // ==================================

    if (req.file) {

      console.log("PDF Uploaded");

      // uploaded file path
      const filePath = req.file.path;

      // ==================================
      // RUN OCR EXTRACTION
      // ==================================

      await new Promise((resolve, reject) => {

        const ocrProcess = spawn("python", [
          "python/LegalSahayk/ocr_extract.py",
          filePath,
        ]);

        let ocrError = "";

        ocrProcess.stdout.on("data", (data) => {
          console.log(data.toString());
        });

        ocrProcess.stderr.on("data", (data) => {
          ocrError += data.toString();
        });

        ocrProcess.on("close", (code) => {

          if (code !== 0) {
            reject(ocrError);
          } else {
            resolve();
          }

        });

      });

      console.log("OCR extraction completed");

      // ==================================
      // RUN INGESTION
      // ==================================

      await new Promise((resolve, reject) => {

        const ingestProcess = spawn("python", [
          "python/LegalSahayk/ingestion.py",
        ]);

        let ingestError = "";

        ingestProcess.stdout.on("data", (data) => {
          console.log(data.toString());
        });

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
      userText,
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
          error: errorData,
        });

      }

      return res.json({
        success: true,
        answer: outputData,
      });

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });

  }

};