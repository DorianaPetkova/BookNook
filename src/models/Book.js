import mongoose, { Schema } from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true },
    author: { 
      type: String, 
      required: true },
    description: { 
      type: String, 
      required: true },
    epubUrl: { 
      type: String, 
      required: true },
    coverImageUrl: { 
      type: String, 
      default: "" },
    publishDate: { 
      type: Date, 
      required: true },
    pageCount: { 
      type: Number, 
      required: true },
    dateAdded: { 
      type: Date, 
      default: Date.now },
    addedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    genres: { type: [String], default: [] },
    language: { type: String, default: "en" },
  },
  { timestamps: true }
);

const Books =
  mongoose.models.Books || mongoose.model("Books", BookSchema);

export default Books;
