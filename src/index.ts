import { config } from "dotenv";
config();

import Server from "./Server"

const app = new Server();

app.start(parseInt(process.env.PORT as string));