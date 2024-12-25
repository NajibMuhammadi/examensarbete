import { connectDB } from "@/utils/database";
import User from "@/models/User";

export async function GET(){
    try {
        await connectDB();
        const users = await User.find();
        return new Response(JSON.stringify(users), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message}), {status: 500});
    }
}