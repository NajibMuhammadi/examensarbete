import { connectDB } from "@/utils/database";
import User from "@/models/User";

export async function DELETE(req, {params}) {
    console.log("DELETE request received");
    const { id } = await params;

    if (!id) {
        return new Response(JSON.stringify({ message: "Användarid saknas" }), { status: 400 });
    }

    try {
        await connectDB();
        const result = await User.findOneAndDelete({ id }); 

        if (!result) {
            return new Response(JSON.stringify({ message: "Användaren hittades inte" }), { status: 404 });
        }

        return new Response(JSON.stringify({message: "Användaren raderad"}), { status: 200 });
    } catch (error) {
        console.error("Error during DELETE operation:", error);
        return new Response(JSON.stringify({ message: "Något gick fel" }), { status: 500 });
    }
}
