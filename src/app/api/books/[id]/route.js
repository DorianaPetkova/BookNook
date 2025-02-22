import Books from "../../../../models/Book";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const updateData = await request.json();

        // check id
        if (!id) {
            console.error("Missing 'id' parameter in request URL.");
            return NextResponse.json({ error: "Missing 'id' parameter" }, { status: 400 });
        }

        // check data
        if (!Object.keys(updateData).length) {
            console.warn("No data provided for update.");
            return NextResponse.json({ error: "No data provided to update" }, { status: 400 });
        }

        await connectMongoDB();

        // book exist check
        const existingBook = await Books.findById(id);
        if (!existingBook) {
            console.warn(`No book found with ID: ${id}`);
            return NextResponse.json({ error: `Book with ID ${id} not found` }, { status: 404 });
        }

        // put
        const updatedBook = await Books.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedBook) {
            console.error(`Failed to update book with ID: ${id}`);
            return NextResponse.json({ error: `Failed to update book with ID: ${id}` }, { status: 500 });
        }

    
        console.log(`Book updated successfully: ${updatedBook}`);
        return NextResponse.json({ message: `Book with ID ${id} updated successfully`, updatedBook }, { status: 200 });

    } catch (error) {
       
        console.error("Error updating book:", error.message, error.stack);
        return NextResponse.json({ 
            error: `Failed to update book: ${error.message}` 
        }, { status: 500 });
    }
}
