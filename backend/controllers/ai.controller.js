import { spawn } from "child_process";
import fs from "fs";

// export const askAI = (req, res) => {
//   console.log(req.body)
//   const userText = req.body.text;


//   if (!userText) {
//     return res.status(400).json({
//       success: false,
//       message: "Text is required",
//     }); 
//   }

//   // Python process run karo
//   const pythonProcess = spawn("python", [
//     "python/LegalSahayk/run_agent.py",
//     userText,
//   ]);

//   let errorData = "";

//   pythonProcess.stderr.on("data", (data) => {
//     errorData += data.toString();
//   });

//   pythonProcess.on("close", () => {
//     if (errorData) {
//       return res.status(500).json({
//         success: false,
//         error: errorData,
//       });
//     }

//     // result.txt read karo
//     try {
//       const result = fs.readFileSync(
//         "python/LegalSahayk/result.txt",
//         "utf-8"
//       );

//       res.json({
//         success: true,
//         answer: result,
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: "Error reading result file",
//       });
//     }
//   });
// };




// //testing 

export const askAI = (req, res) => {

  console.log(req.body);

  const userText = req.body.text;

  if (!userText) {
    return res.status(400).json({
      success: false,
      message: "Text is required",
    });
  }

  // DUMMY RESPONSE
  return res.json({
    success: true,
    answer: `You asked: ${userText}`,
  });

};