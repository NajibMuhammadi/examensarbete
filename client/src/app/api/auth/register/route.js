import { connectDB } from "@/utils/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { v4 as uuid } from 'uuid';
import userSchema from "@/models/UserModels";

export async function POST(req, res){

    const body = await req.json();

    const {email, username, password, confirmPassword} = body;    

    const {error} = userSchema.validate(body);

    if(error){
        return new Response(JSON.stringify(
            {message: error.details[0].message}),
             {status: 400}
        );
    }

    if(password !== confirmPassword){
        return new Response(JSON.stringify({message: "Lösenorden matchar inte"}), {status: 400});
    }

    try {
        await connectDB();

        const userExist = await User.findOne({email});

        if(userExist){
            if(userExist.googleUser){
                return new Response(JSON.stringify({message: "Användaren med detta email finns redan"}), {status: 400});
            } else if(userExist.username === username){
                return new Response(JSON.stringify({message: "Användaren med detta användarnamn finns redan"}), {status: 400});
            }
            return new Response(JSON.stringify({message: "Användaren med detta email finns redan"}), {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            id: uuid().substring(0, 6),
            googleUser: false,
        });

        await newUser.save();

        return new Response(JSON.stringify({message: "Användaren har skapats"}), {status: 200});   

    }catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message: "Något gick fel"}), {status: 500});
    }
}