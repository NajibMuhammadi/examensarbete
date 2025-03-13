import { connectDB } from "@/utils/database";
import Product from "@/models/ProductdbModels";
import mongoose from "mongoose";

export async function GET(res, {params}) {
    console.log('GET RECEIVED');
    const {id} = await params;

    if(!id){
        return new Response (JSON.stringify({message: "Produkt-id saknas" }), { status: 400 });
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return new Response (JSON.stringify({message: "Användar id saknas" }), { status: 400 });
    }

    try {
        await connectDB();
        const product = await Product.findById(id);

        if (!product) {
            return new Response(JSON.stringify({ message: "Produkt hittades inte" }), { status: 404 });
        }

        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.error("Error during DELETE operation:", error);
        return new Response(JSON.stringify({ message: "Något gick fel heheheh" }), { status: 500 });
    }
}