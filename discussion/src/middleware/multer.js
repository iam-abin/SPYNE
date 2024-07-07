import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadsDir = path.join("uploads", "post-images");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Corrected this line
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const maximumFileSize = { fileSize: 10 * 1024 * 1024 }; // 10 MB limit

const uploadFile = multer({
    storage: imageStorage,
    limits: maximumFileSize,
    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        if (![".jpg", ".jpeg", ".png"].includes(extension.toLowerCase())) {
            cb(new Error(`${extension} is an unsupported file type!`), false);
            return;
        }
        cb(null, true);
    },
}).single("image");

export { uploadFile };
