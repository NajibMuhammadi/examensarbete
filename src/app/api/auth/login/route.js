import { connectDB } from "@/utils/database";
import User from "@/models/User";
import bcrypt from 'bcryptjs'

export async function POST(req, res){
    
    const { email, password } = await req.json();

    if(!email || !password){
        return new Response(JSON.stringify({ message: 'Email and password are required'}), {status: 400});
    }

    try {
        await connectDB();

        const user = await User.findOne({email});
        const hashedPassword = await bcrypt.compare(password, user.password);

        if(!user || !hashedPassword){
            return new Response(JSON.stringify({ message: 'Invalid email or password'}), {status: 401});
        }

        return new Response(JSON.stringify({ message: 'Logged in successfully'}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message}), {status: 500});
    }   
}