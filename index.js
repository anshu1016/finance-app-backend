import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import KPI from "./models/KPI.js";
import { kpis,products,transactions } from "./data/data.js";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import Product from "./models/Product.js"
import transactionRoutes from "./routes/transaction.js"
import Transaction from "./models/Transaction.js";
/** CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;

// Routes
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction",transactionRoutes);
// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`PORT IS LISTENING AT ${PORT}`));
    // Comment out or remove the line below if you don't have permissions to drop the database
    // await mongoose.connection.db.dropDatabase();
    // Optionally, check if the KPI collection is empty before inserting data


    // const existingKpis = await KPI.find();
    // if (existingKpis.length === 0) {
    //   KPI.insertMany(kpis);
    // }

    //  const existingProducts = await Product.find();
    // if (existingProducts.length === 0) {
    //   Product.insertMany(products);
    // }

    //   const existingTransactions = await Transaction.find();
    //  if (existingTransactions.length === 0) {
    //   Transaction.insertMany(transactions);
    //  }
     Transaction.insertMany(transactions);
    
  })
  .catch((error) => console.log(`DID NOT CONNECT: ${error}`));
