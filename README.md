**Project Description: Cloud-Integrated File Upload and Compression Service**

This project is a Node.js server application built using Express.js that provides users with a simple yet powerful interface to upload images and videos. Users also have the option to compress their files before uploading. The application is integrated with Cloudinary, a cloud-based image and video management service, ensuring that all files are securely stored in the cloud.

**Key Features:**
* File Upload: Users can upload images and videos through a user-friendly interface.
* File Compression: Provides an option to compress files before uploading, helping to reduce file size.
* Cloud Storage: Uploaded files are securely stored on Cloudinary, ensuring high availability and easy access.
* File Validation: Checks file types and ensures they meet size constraints (under 5MB).
* Automated Email Notification: Once the file is uploaded, the user receives an email with a link to the file, improving usability and access.


**File Structure:**
1. index.js: Configures the Express application, connects to the MongoDB database and Cloudinary, and defines file upload routes.
2. /routes/FileUpload.js: Defines API routes for image and video uploads, file compression, and validation.
3. /models/File.js: Establishes the schema for uploaded files and implements a post-save hook that sends an email notification to the user.
4. /controllers/fileUpload.js: Contains logic for file validation, compression, uploading to Cloudinary, and saving metadata to the database.

This project is designed for scalability and is ideal for applications that require efficient file management, compression, cloud storage, and user notifications.
