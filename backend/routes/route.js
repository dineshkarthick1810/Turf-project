const express = require("express")
const nodemailer = require("nodemailer")
const routes = express.Router()
const multer = require("multer")
const path = require("path")
const { Signup } = require("../Schemas/Signup")
const Products = require("../Schemas/Products")
const { Profile } = require("../Schemas/Profile")
const UserSignup = require("../Schemas/UserSignup")
const UserProfile = require("../Schemas/UserProfile")
const reviews = require("../Schemas/Reviews")
const Bookings = require("../Schemas/Bookings")
const cors=require("cors")
const fs = require("fs");


const uploadPath = path.join(__dirname,"./uploads/images"); // Ensure correct path
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(uploadPath)
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + "_" + uniqueSuffix);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1000 * 1000 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const isValid = allowedTypes.test(file.mimetype) && allowedTypes.test(path.extname(file.originalname));
        if (isValid) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpeg, .jpg, .png files are allowed"));
        }
    }
}).single("image");


//admin routes

routes.post("/addproducts", cors(), (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code == "LIMIT_FILE_SIZE") {
                    return res.json({ message: "File size exceeds limit" });
                }
                if (err.code == "LIMIT_UNEXPECTED_FILE") {
                    return res.json({ message: "Unsupported file format" });
                }
            }
            return res.json({ message: "File upload error", error: err });
        }

        // If no file is uploaded, return an error
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        try {
            // Create product data with uploaded file
            const data = {
                ...req.body,
                image: req.file.filename, // Assign image filename
            };

            // Save to MongoDB
            const uploadProducts = await Products.create(data);
            console.log("Product uploaded:", uploadProducts);
            console.log(req.file)
            res.json(uploadProducts);
        } catch (error) {
            console.error("Error saving product:", error);
            res.status(500).json({ message: "Internal Server Error", error });
        }
    });
});



//get all products
routes.get("/products", async (req, res) => {
    const Allproducts = await Products.find()
    console.log(Allproducts)
    res.json(Allproducts)

})

routes.post("/signup", async (req, res) => {
    const data = req.body


    if (data.role == "admin") {
        const UserCollection = await Signup.find()

        const UserExist = UserCollection.some((val, index) => {
            return val.username == data.username || val.mail == data.mail
        })
        if (UserExist) {
            res.json({ message: "Users already exixst" })

        }
        else {
            const uploadData = await Signup.create(data)
            const UserDatas = await Signup.find()
            const MatchData = UserDatas.find((val, index) => {
                return val.username == data.username && val.mail == data.mail

            })
            res.json({ id: MatchData._id, role: MatchData.role })

        }



    }
    else {
        //user aana work pakanuu

        const UserCollection = await UserSignup.find()
        const UserExist = UserCollection.some((val, index) => {
            return val.username == data.username || val.mail == data.mail
        })
        if (UserExist) {
            res.json({ message: "user already exits" })

        }
        else {
            const uploadData = await UserSignup.create(data)
            const Alldatas = await UserSignup.find()
            const Matchdata = Alldatas.find((val, index) => {
                return val.username == data.username || val.mail == data.mail

            })

            res.json({ id: Matchdata._id, role: Matchdata.role })
        }


    }


})

//login routes for adminusers

routes.get("/message",(req,res)=>{
    res.json({messgae:"from server"})
})

routes.post("/login", async (req, res) => {

    const data = req.body
    if (data.role == "admin") {
        const signup = await Signup.find()
        const FindId = signup.find((res, index) => {
            return res.mail == data.mail && res.password == data.password

        })

        if (!FindId) {
            res.json({ error: "user not exist" })

        }
        else {
            const AllProfile = await Profile.find()
            const FindProfile = AllProfile.find((val, index) => {
                return val.id == FindId._id
            })
            console.log(FindProfile)

            const Allproducts = await Products.find()
            const Datas = {
                messages: {
                    id: FindId._id,
                    role: FindId.role,
                    profileimage: FindProfile ? FindProfile.profileimage : null


                },
                products: Allproducts
            }
            res.json(Datas)

        }



    }
    else {
        console.log("userkula vanthrku")
        const signup = await UserSignup.find()

        const FindId = signup.find((res, index) => {
            return res.mail == data.mail && res.password == data.password
        })
        if (!FindId) {
            res.json({ error: "user not exist" })

        }
        else {
            const profile = await UserProfile.find()

            const FindProfile = profile.find((res, index) => {
                return res.id == FindId._id
            })
            const Datas = {
                messages: {
                    role: FindId.role,
                    id: FindId._id,
                    imageUrl: FindProfile ? FindProfile.profileimage : null
                }
            }
            console.log(Datas)
            res.json(Datas)
        }

    }
})

routes.delete("/Deleteproducts", async (req, res) => {
    const data = req.body
    const Deleteproduct = await Products.deleteOne({ phonenumber: data.number })
    const Allproducts = await Products.find()
    res.json(Allproducts)

})


routes.post("/profile", cors(),(req, res) => {

    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code == "LIMIT_FILE_SIZE") {
                res.json({ message: "file size exceeds" })
            }
            if (err.code == "LIMIT_UNEXPECTED_FILE") {
                res.json({ message: "unsupported file" })
            }

            return

        }

        try {


            const data = req.body
            data.profileimage = req.file.filename || req.file.fieldname
            console.log(data)
            if (data.role == "admin") {
                console.log(data)
                const uploadProfile = Profile.create(data)
                res.json({ image: data.profileimage })

            }

            else {
                console.log(data)
                const uploadProfile = UserProfile.create(data)
                res.json({ image: data.profileimage })

            }




        } catch (err) {
            console.log(err)

        }





    })

})

//admin routes



//user routes

routes.get("/allproducts", async (req, res) => {

    try {
        const GetProducts = await Products.find()
        res.json(GetProducts)

    } catch (err) {
        console.log(err)

    }


})

routes.post("/reviews", async (req, res) => {
    const data = req.body
    console.log(data)
    const AllUsers = await UserSignup.find()
    const profileImage = await UserProfile.find()
    const findProfile = profileImage.find((val, index) => {
        return val.id == data.id
    })
    console.log(findProfile)


    const FindUsername = AllUsers.find((val, index) => {
        return val._id == data.id
    })
    console.log(FindUsername)

    const Datas = {
        reviews: data.reviews,
        starcount: data.starCount,
        shopname: data.shopname,
        username: FindUsername.username,
        profile: findProfile.profileimage

    }
    const uploadReviews = await reviews.create(Datas)

    res.json({ message: "upload successful" })

})


routes.post("/bookings", async (req, res) => {
    const data = req.body
    const findUsers = await UserSignup.find()
    console.log(findUsers)
    const filteredUsername = findUsers.find((val, index) => {
        return val._id == data.Userid
    })
    data.username = filteredUsername.username
    data.mailid = filteredUsername.mail
    console.log(data)
    const bookings = await Bookings.create(data)
    res.json({ message: "bookings succesfull" })

})

routes.get("/bookings", async (req, res) => {
    const bookings = await Bookings.find()
    res.json(bookings)

})


routes.get("/reviews", async (req, res) => {
    const Allreviews = await reviews.find()
    console.log(Allreviews)
    res.json(Allreviews)
})

//user routes

routes.put("/bookings", async (req, res) => {
    const data = req.body
    if (data.status == "decline") {
        const AllBookings = await Bookings.find()
        const FindMongoId = AllBookings.find((val, index) => {
            return val.groundname == data.groundname

        })
        console.log(FindMongoId)


        const bookings = await Bookings.findByIdAndUpdate(FindMongoId._id, { decline: true }, { new: true })
        res.json({ messge: "update" })




    }
    else {
        const AllBookings = await Bookings.find()
        const FindMongoId = AllBookings.find((val, index) => {
            return val.groundname == data.groundname

        })
        console.log(FindMongoId)


        const bookings = await Bookings.findByIdAndUpdate(FindMongoId._id, { approved: true }, { new: true })
        res.json({ messge: "update" })

    }



})

//for sending emails to users

const Transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "dineshkarthick1810@gmail.com",
        pass: "ukdh cnot orey jcic"

    }
})

routes.post("/sendEmail", async (req, res) => {
    const data = req.body
    console.log(data)
    const FindingProduct = await Products.findOne({ shopname: data.groundname })
    console.log(FindingProduct)
    const mailOption = {
        from: {
            name: "Premium Turf",
            address: "dineshkarthick1810@gmail.com"
        },
        to: data.mail,
        subject: "Your booking will be succesfully accepted",
        text: "hi...!",
        html: `<p style={fontweight:"bold"}>Hi...! <span>${data.username}</span> you currently booking an ${data.groundname} that was succesfully accepted. It will be an  currently Holding process .Please make sure to confirm the booking to pay the amount of ground to this number ${FindingProduct.phonenumber} </p>
        <p>note : comes to the ground, please bring your payment screenshot and this mail </p>
        `
    }
   await Transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(info.response)
            res.json("email sent")
        }
    })

})





module.exports = routes
