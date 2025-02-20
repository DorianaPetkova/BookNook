import Books from "../../../models/Book";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        await connectMongoDB();

        const MASTER_ADMIN_ID = process.env.NEXT_PUBLIC_MASTER_ADMIN_ID; 
        if (!MASTER_ADMIN_ID) {
            throw new Error("MASTER_ADMIN_ID is not set in .env file");
           

        }

        // Always use the master admin ID
        const newBook = await Books.create({
            ...body,
            addedByUserId: MASTER_ADMIN_ID,  // Ensure MASTER_ADMIN_ID is defined
        });
        

        return NextResponse.json({ message: "Book added", book: newBook }, { status: 201 });
    } catch (error) {
        console.error("❌ Error Creating Book:", error);
        return NextResponse.json({ error: error.message || "Failed to create book" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const books = await Books.find();
        return NextResponse.json({ books });
    } catch (error) {
        console.error("Error retrieving users:", error);
        return NextResponse.json({ error: "Failed to retrieve users" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        // 1️⃣ Validate the ID
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            console.error("Missing 'id' parameter in request URL.");
            return NextResponse.json({ error: "Missing 'id' parameter" }, { status: 400 });
        }

        // 2️⃣ Connect to DB
        await connectMongoDB();

        // 3️⃣ Check if the Book Exists
        const book = await Books.findById(id);
        if (!book) {
            console.warn(`No book found with ID: ${id}`);
            return NextResponse.json({ error: `Book with ID ${id} not found` }, { status: 404 });
        }

        // 4️⃣ Attempt Deletion
        const deletedBook = await Books.findByIdAndDelete(id);
        if (!deletedBook) {
            console.error(`Failed to delete book with ID: ${id}`);
            return NextResponse.json({ error: `Failed to delete book with ID: ${id}` }, { status: 500 });
        }

        // 5️⃣ Success Response
        console.log(`Book deleted successfully: ${id}`);
        return NextResponse.json({ message: `Book with ID ${id} deleted successfully` }, { status: 200 });
    } catch (error) {
        // 6️⃣ Detailed Error Handling
        console.error("Error deleting book:", error.message, error.stack);
        return NextResponse.json({ 
            error: `Failed to delete book: ${error.message}` 
        }, { status: 500 });
    }
}
