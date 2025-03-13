import { connectDB } from "@/utils/database";
import Product from "@/models/ProductdbModels";

export async function GET(req, res) {
    try {
        await connectDB();
        const result = await Product.find();
        return new Response(JSON.stringify(result), {status : 200});
    } catch (error) {
        return new Response(JSON.stringify({message: "Något gick fel"}), {status: 500});
    }
}