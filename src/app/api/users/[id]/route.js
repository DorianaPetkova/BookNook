import User from "../../../../models/User";
import connectMongoDB from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const updateData = await request.json();

        // id
        if (!id) {
            console.error("Missing 'id' parameter in request URL.");
            return NextResponse.json({ error: "Missing 'id' parameter" }, { status: 400 });
        }

        // data check
        if (!Object.keys(updateData).length) {
            console.warn("No data provided for update.");
            return NextResponse.json({ error: "No data provided to update" }, { status: 400 });
        }

        await connectMongoDB();

        // user exist
        const existingUser = await User.findById(id);
        if (!existingUser) {
            console.warn(`No user found with ID: ${id}`);
            return NextResponse.json({ error: `User with ID ${id} not found` }, { status: 404 });
        }

        //hash 
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        // put
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            console.error(`Failed to update user with ID: ${id}`);
            return NextResponse.json({ error: `Failed to update user with ID: ${id}` }, { status: 500 });
        }

        console.log(`User updated successfully: ${updatedUser}`);
        return NextResponse.json({ message: `User with ID ${id} updated successfully`, updatedUser }, { status: 200 });

    } catch (error) {
       
        console.error("Error updating user:", error.message, error.stack);
        return NextResponse.json({ 
            error: `Failed to update user: ${error.message}` 
        }, { status: 500 });
    }
}
