import express from "express";
import cors from "cors";
import CampusRoutes from "./routes/CampusRoutes";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/api/v1", CampusRoutes);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
