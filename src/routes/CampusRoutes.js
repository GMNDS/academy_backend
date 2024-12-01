import express from "express";
import { CampusController } from "../controllers/CampusController";

const router = express.Router();
const campusController = new CampusController();

router.get("/campus", campusController.getAll);
router.get("/campus/:id", campusController.getById);
router.get("/campus/:name", campusController.getByName);
router.post("/campus", campusController.create);
router.put("/campus/:id", campusController.update);
router.delete("/campus/:id", campusController.delete);

export default router;
