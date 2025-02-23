import mongoose from "mongoose";

// Sets the schema for the product
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Reason why we don't type products is because mongoose is going to read and change it into products
const Product = mongoose.model("Product", productSchema);

export default Product;
