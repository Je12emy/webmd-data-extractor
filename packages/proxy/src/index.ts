import config from "@jira-data/config/config.json";
import cors from "cors";
import express from "express";

const app = express();
const port = 8000;

app.use(
	cors({
		origin: "https://localhost:3000",
		methods: ["GET"],
		credentials: false,
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use("/api/jira", (req, res) => {});

app.listen(port, () => console.log(`proxy on :${port}`));
