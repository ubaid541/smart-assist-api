import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {type: String },
    email : {type: String, unique: true},
    password : {type: String },
    role:{type:String,default:"user"}
 }, {timestamps: true})

 export default mongoose.model('User',userSchema)