import cors, { type CorsOptions } from "cors";
import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express();

const port = process.env.PORT;
app.use(express.json());

//configure cors
const options: CorsOptions = {

}
app.use(cors())

app.get("/", (req, res) => {
    res.json({
        message: "Server is working"
    })
})

app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`Server is listening on port :: ${port}`);
})
