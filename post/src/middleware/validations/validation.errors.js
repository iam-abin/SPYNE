import { validationResult } from "express-validator";
import fs from 'fs';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Check if a file was uploaded
        if (req.file) {
            const filePath = req.file.path;
            // Attempt to delete the file
            fs.unlink(filePath, (err) => {
                if (err) {
                    throw new Error("Error deleting file")
                }
            });
        }
        // Return the validation errors
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
