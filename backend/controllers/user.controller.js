import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashPassword = await  bcryptjs.hash(password, 10)
        const createdUser = new User
            ({  
                fullname: fullname,
                email: email,
                password: hashPassword,
            })
        await createdUser.save()
        res.status(201).json({ messsage: "User created",user:{
            _id: createdUser._id,
            fullname:createdUser.fullname,
            email: createdUser.email,
        }, });
    } catch (error) {
        console.log("user creation error", error)
        res.status(500).json({ message: "signup error" })
    }
}

export const login= async(req,res)=>{
try {
    const {email,password} = req.body
    const user = await User.findOne({email})
    const isMatch =await bcryptjs.compare(password,user.password)
    if (!user || !isMatch) {
        return res.status(400).json({message :"invalid username or password"})
        
    }else{
        //rtn 
        return res.status(200).json ({message:"login successfull",
            _id:user.id,
            fullname:user.fullname,
            email:user.email
        })
    }
} catch (error) {
    console.log("login error",error);
}
}