import multer from "multer";

// storage define kar rahe hain
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // file yaha save hogi
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// multer instance
export const upload = multer({ storage });