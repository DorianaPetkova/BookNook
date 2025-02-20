import User from "../../../models/User";
import connectMongoDB from "@/utils/db";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("📦 Incoming Data:", body);

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        // Create new user with hashed password
        await connectMongoDB();       
        const newUser = await User.create({
            email: body.email,
            password: hashedPassword, // Store hashed password
        });

        console.log("✅ User Created:", newUser);

        return NextResponse.json({ message: "User added", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("❌ Error Creating user:", error);
        return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const users = await User.find();
        return NextResponse.json({ users });
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
        const user = await User.findById(id);
        if (!user) {
            console.warn(`No user found with ID: ${id}`);
            return NextResponse.json({ error: `User with ID ${id} not found` }, { status: 404 });
        }

        // 4️⃣ Attempt Deletion
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            console.error(`Failed to delete user with ID: ${id}`);
            return NextResponse.json({ error: `Failed to user book with ID: ${id}` }, { status: 500 });
        }

        // 5️⃣ Success Response
        console.log(`User deleted successfully: ${id}`);
        return NextResponse.json({ message: `User with ID ${id} deleted successfully` }, { status: 200 });
    } catch (error) {
        // 6️⃣ Detailed Error Handling
        console.error("Error deleting user:", error.message, error.stack);
        return NextResponse.json({ 
            error: `Failed to delete user: ${error.message}` 
        }, { status: 500 });
    }
}
