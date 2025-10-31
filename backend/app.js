import express from "express";
import cors from "cors";
import { sequelize } from "./src/config/db.js";
import { Users } from "./src/api/v1/users/model.js";
import { RequestCuti } from "./src/api/v1/reqCuti/model.js";
import { HistoryCuti } from "./src/api/v1/historyCuti/model.js";
import { Role } from "./src/api/v1/roles/model.js";
import authRouter from "./src/api/v1/auth/route.js";
import reqCutiRouter from "./src/api/v1/reqCuti/route.js";
import historyCutiRouter from "./src/api/v1/historyCuti/route.js";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

await Users.sync();
await RequestCuti.sync();
await HistoryCuti.sync();
await Role.sync();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("register", (userID) => {
    socket.userID = userID;
    console.log(`📡 User ${userID} registered with socket ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const v1 = "/api/v1";

app.use(v1, authRouter);
app.use(v1, reqCutiRouter);
app.use(v1, historyCutiRouter);

app.get("/", (req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 5000;

await sequelize.authenticate();
console.log("✅ DB connected successfully");

server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
