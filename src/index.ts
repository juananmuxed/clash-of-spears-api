import { configDotenv } from "dotenv";
import { Server } from "./server/App";

configDotenv();

const app = new Server()

app.listen()
