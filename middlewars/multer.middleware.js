import path from "path";

import multer from "multer";

const upload = multer({


  dest: "uploads/",   // Specify the destination folder for storing uploaded files
 

  // Set limits for the uploaded file size 
  limits: { fileSize: 80 * 1024 * 1024 }, // 80 MB limit

  // Specify the storage configuration for multer
  storage: multer.diskStorage({
    destination: "uploads/", // Specify the destination folder
    filename: (req, file, cb) => {
      // Specify the filename for the uploaded file (original filename)
      cb(null, file.originalname);
    },
  }),

  // Define a file filter to restrict allowed file types
  fileFilter: (req, file, cb) => {
    // Extract the file extension from the original filename
    let ext = path.extname(file.originalname);

    // Check if the file extension is not one of the allowed types
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
      // Reject the file with an error message for unsupported file types
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }

    // Accept the file if it meets the criteria
    cb(null, true);
  },
});

export default upload;
