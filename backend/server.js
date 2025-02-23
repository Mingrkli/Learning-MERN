import express from "express";
import dotenv from "dotenv";
import path from "path";

// Connecting to the database
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes);

// Checks of the NODE_ENV is in production,
// if so, we'll serve static assets from the frontend/dist directory
// and, catches all GET requests routes that hasn't been matched in the routers into the index files in the dist since this is production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Connect to the port and database :D
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
