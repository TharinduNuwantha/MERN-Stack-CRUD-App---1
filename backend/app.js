const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Import Routes & Models
const router = require('./Route/UserRouters');
require('./Models/RegisterModel');
require('./Models/PdfModel');
require('./Models/ImageModel');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/userPakaya", router);

// Static file serving
app.use("/files", express.static(path.join(__dirname, "files"))); // for pdf
app.use("/images", express.static(path.join(__dirname, "uploads/images"))); // for images

// Connect MongoDB
mongoose.connect('mongodb+srv://nuwanthatharindu99:3dkxyDvvgLjWgkZE@cluster0.zhu4kz2.mongodb.net/')
.then(() => {
    console.log("Database connected successfully");
    app.listen(5000, () => console.log("Server started on port 5000"));
})
.catch((err) => console.log(err));


// ================== REGISTER ==================
const RegUser = mongoose.model('Register');

app.post("/register", async (req, res) => {
    const { firstName, lastName, username, email, mobile, country, birthday, password } = req.body;
    try {
        await RegUser.create({
            firstName, lastName, username, email, mobile, country, birthday, password
        });
        res.send({ states: "ok" });
    } catch (err) {
        res.send({ states: "error" });
        console.log(err);
    }
});


// ================== LOGIN ==================
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const regUser = await RegUser.findOne({ email });

        if (!regUser) {
            return res.json({ err: "user not found" });
        }

        if (regUser.password === password) {
            return res.json({ status: "ok" });
        } else {
            return res.json({ err: "incorrect password" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});


// ================== PDF UPLOAD ==================
const PdfSchema = mongoose.model("PdfDetails");

const storagePdf = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "files")); // save PDFs in backend/files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});

const uploadPdf = multer({ storage: storagePdf });

app.post("/uploadpdf", uploadPdf.single("files"), async (req, res) => {
    try {
        console.log(req.file); // uploaded file
        const title = req.body.title;
        const pdf = req.file.filename;

        await PdfSchema.create({ title, pdf });
        res.status(200).json({ status: 200, message: "Upload success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/getpdf", async (req, res) => {
    try {
        const data = await PdfSchema.find({});
        res.send({ status: 200, data: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});


// ================== IMAGE UPLOAD ==================
const ImgSchema = mongoose.model("ImageFiles");

const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "uploads/images")); // ✅ safe uploads path
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const uploadImage = multer({ storage: storageImage });

app.post("/uploadImage", uploadImage.single("image"), async (req, res) => {
    console.log(req.file);
    const imageName = req.file.filename;

    try {
        await ImgSchema.create({ Image: imageName });
        res.json({ status: "ok" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Display Images
app.get("/getImage", async (req, res) => {
    try {
        const data = await ImgSchema.find({});
        res.send({ status: "ok", data: data });
    } catch (error) {
        res.json({ status: "error", error: error.message });
    }
});
