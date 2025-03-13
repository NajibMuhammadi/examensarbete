import { connectDB } from "@/utils/database";
import Product from "@/models/ProductdbModels";
import productSchema from "@/models/ProductModels";

export async function POST(req, res) {
    const body = await req.json();
    const {title, description, propertytype, price, photo, location} = body;

    const {error} = productSchema.validate(body)

    if(error){
        return new Response(JSON.stringify({
            message: error.details[0].message
        }), {status : 400});
    }

    try {
        await connectDB();
        const product = new Product({ title, description, propertytype, price, photo, location });
        await product.save();
        return new Response(JSON.stringify({ 
            message: "Produkt tillagd",
            product: product
        }), { status: 200 });
    } catch (error) {
        console.error("Error during POST operation:", error);
        return new Response(JSON.stringify({ message: "Något gick fel" }), { status: 500 });
    }
}