const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type,supportedTypes,file){
    if(supportedTypes.includes(type)){
        if(file.size > 5242880){
            console.log("File size is larger than 5Mb")
            return false;
        }
        console.log("File Format and Size is perfect")
        return true;
    }
    console.log("File format not supported")
    return false;
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

// Image Upload Handler
exports.imageUpload = async(req,res) => {
    try {
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg","png","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType,supportedTypes,file)) {
           return res.status(400).json({
            success:false,
            message:"Unsupported File"
           }) 
        }

        // File Format Supported h
        const response = await uploadFileToCloudinary(file,"Ahmar");
        console.log(response);
        console.log( response.secure_url);
        // Now save the details in DB
        const fileData = await File.create({
            name, 
            imageUrl:response.secure_url,
            tags,
            email
        })

        res.json({
            success:true,
            message:"Image Uploaded Successfully",
            imageUrl:response.secure_url
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


// Video Upload Handler
exports.videoUpload = async(req,res) => {
    try {
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        // Validation
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType,supportedTypes,file)) {
           return res.status(400).json({
            success:false,
            message:"Unsupported File"
           }) 
        }

        // File Format Supported h
        const response = await uploadFileToCloudinary(file,"Ahmar");
        console.log(response);
        console.log( response.secure_url);
        // Now save the details in DB
        const fileData = await File.create({
            name, 
            videoUrl:response.secure_url,
            tags,
            email
        })

        res.json({
            success:true,
            message:"video Uploaded Successfully",
            videoUrl:response.secure_url
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


// imageSizeReducer
exports.imageSizeReducer = async (req,res) => {
    try {
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg","png","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType,supportedTypes,file)) {
            return res.status(400).json({
             success:false,
             message:"Unsupported File"
            }) 
        }

        // File Format Supported h
        const response = await uploadFileToCloudinary(file,"Ahmar",10);
        console.log(response);
        console.log( response.secure_url);
        // Now save the details in DB
        const fileData = await File.create({
            name, 
            imageUrl:response.secure_url,
            tags,
            email
        })

        res.json({
            success:true,
            message:"video Uploaded Successfully",
            imageUrl:response.secure_url
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}