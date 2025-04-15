import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connect_db } from './config/db.js';

import userRoutes from "./routes/userRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // Allow frontend requests
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
  
connect_db();

app.use("/api/users",userRoutes);
app.use("/api/schedules", scheduleRoutes);

app.listen(PORT,()=>{
    console.log(`Server listening on port http://localhost:${PORT}`);
})