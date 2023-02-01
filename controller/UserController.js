import { User } from "../models/index.js";
import bcrypt from "bcryptjs"
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken"

const UserController = {
    async register(req,res,next){

        //Check if username,email exists
        try {
            const exists = await User.exists({$or:[{email:req.body.email},{username:req.body.username}]})

            if(exists){
                return res.status(409).json("Email or username already exists.")
            }

        } catch (error) {
            next(error)
        }


        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const newUser = new User({
            ...req.body,
            password:hashedPassword
        })

        try {
           const new_user = await newUser.save()
           res.status(200).json(["Successfully registered.",new_user])
        } catch (error) {
            next(error)
        }
    },
    async login(req,res,next){
        try {
            const user = await User.findOne({name: req.body.name})

            if(!user){
                return next(createError(404,"User not found!"))
            }

            const checkPassword = await bcrypt.compare(req.body.password,user.password)

            if(!checkPassword) return next(createError(400,"Wrong password or username!!"))

            // create token
            const token = jwt.sign(
                {id:user._id,role : user.role},
                process.env.JWT,{expiresIn:'1d'}
                )

            const {password,role,...otherDetails} = user._doc


            res.cookie("access_token",token,{
                httpOnly : true,
            }).status(200).send({details:{...otherDetails},role})

        } catch (error) {
            next(error)
        }
    },
    async logout(req,res,next){
       try {
        res.cookie("access_token",'',{maxAge: 1}).send("Logged out.")
       } catch (error) {
        console.log(error);
       }
    }
}

export default UserController