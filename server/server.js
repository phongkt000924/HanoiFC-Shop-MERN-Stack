import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

// ket noi database
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/hanoifc_shop", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.log("Connected to MongoDB failure!");
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
