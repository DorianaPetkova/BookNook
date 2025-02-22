import User from "../../../models/User";
import connectMongoDB from "@/utils/db";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("📦 Incoming Data:", body);

        // hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        // post
        await connectMongoDB();       
        const newUser = await User.create({
            email: body.email,
            password: hashedPassword, 
        });

        console.log("User Created:", newUser);

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
        // id
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            console.error("Missing 'id' parameter in request URL.");
            return NextResponse.json({ error: "Missing 'id' parameter" }, { status: 400 });
        }

        await connectMongoDB();

        // book exist
        const user = await User.findById(id);
        if (!user) {
            console.warn(`No user found with ID: ${id}`);
            return NextResponse.json({ error: `User with ID ${id} not found` }, { status: 404 });
        }

        // delete
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            console.error(`Failed to delete user with ID: ${id}`);
            return NextResponse.json({ error: `Failed to user book with ID: ${id}` }, { status: 500 });
        }

        console.log(`User deleted successfully: ${id}`);
        return NextResponse.json({ message: `User with ID ${id} deleted successfully` }, { status: 200 });
    } catch (error) {
      
        console.error("Error deleting user:", error.message, error.stack);
        return NextResponse.json({ 
            error: `Failed to delete user: ${error.message}` 
        }, { status: 500 });
    }
}
