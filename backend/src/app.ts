import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser"
import morgan from "morgan";    
import appRouter from "./routes/index.js";
import cors from "cors";
config();
const app = express();

// middlewares

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,            
}));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// remove this in the production (only for development)
app.use(morgan("dev"));

app.use("/api/v1", appRouter)

export default app;