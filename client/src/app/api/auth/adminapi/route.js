import { connectDB } from "@/utils/database";
import User from "@/models/User";

export async function GET(){
    try {
        console.log('GET');
        await connectDB();
        const result = await User.find();
        console.log('result', result);
        return new Response(JSON.stringify(result), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: "Något gick fel"}), {status: 500});
    }
}