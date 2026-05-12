// import dotenv from "dotenv";

// dotenv.config();
// import express from "express";
// import {createServer} from "node:http";
// import {Server} from "socket.io";


// import mongoose from "mongoose";
// import { connectToSocket } from "./src/controllers/socketManager.js";

// import cors from "cors";
// import userRoutes from "./src/routes/users.routes.js"

// const app = express();
// const server = createServer(app);
// const io = connectToSocket(server);


// app.set("port", (process.env.PORT || 8000));
// app.use(cors());
// app.use(express.json({limit: "40kb"}));
// app.use(express.urlencoded({limit: "40kb", extended: true}));


// app.use("/api/v1/users", userRoutes);
// // app.use("/api/v2/users", newUserRoutes);

// // app.get("/home", (req,res) => {
// //     return res.json({"hello": "world"})
// // });

// const start = async() => {
// app.set("mongo_user")
//     const connectionDb = await mongoose.connect(process.env.MONGO_URI);
   
//     console.log(`MONGO connected DB Host: ${connectionDb.connection.host}`);
    
//     server.listen(app.get("port"), () => { 
//         console.log("LISTENING ON PORT 8000");
//     });
// }

// start();




import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./src/controllers/socketManager.js";
import userRoutes from "./src/routes/users.routes.js";

const app = express();

const server = createServer(app);

connectToSocket(server);

app.use(cors());

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {

    console.log("Database connection error");

    console.error(error);

  }
};

start();