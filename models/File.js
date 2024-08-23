const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    videoUrl:{
        type:String
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

// Post Middleware
fileSchema.post("save",async(doc)=>{
     try {
        console.log("DOC :- ",doc);

        // Now Create Transporter using nodemailer
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });

        // Send Mail
        let info = await transporter.sendMail({
            from:'AhmarFaraz',
            to: doc.email, 
            subject: "New File Uploaded on Cloudinary",
            html: `<h1>Hello there!!<h1/><p>Your ${doc.videoUrl ? "Video":"Image"} has been successfully uploaded, Kindly check it out : </p><a href="${doc.videoUrl ? doc.videoUrl : doc.imageUrl}" >${doc.videoUrl ? doc.videoUrl : doc.imageUrl}<a/>`
        })
        console.log("INFO -> ",info);
     } catch (error) {
        console.error(error);

     }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;