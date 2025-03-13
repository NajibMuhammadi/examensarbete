import { connectDB } from "@/utils/database";
import Product from "@/models/ProductdbModels";

export async function DELETE(req, {params}) {
    console.log("DELETE request received");
    const {id} = await params;

    if(!id) {
        return new Response(JSON.stringify({ message: "Användarid saknas" }), { status: 400 });
    }

    try {
        await connectDB();
        const result = await Product.findByIdAndDelete(id);

        if(!result){
            return new Response(JSON.stringify({ message: "Produkt hittades inte" }), { status: 404 });
        }
        return new Response(JSON.stringify({message: "Produkt raderad"}), { status: 200 });
    } catch (error) {
        console.error("Error during DELETE operation:", error);
        return new Response(JSON.stringify({ message: "Något gick fel" }), { status: 500 });
    }
}