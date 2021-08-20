import express from "express";
import { getEmployees, addEmployee } from "../controllers/employeeControllers";
const router = express.Router();

// get
router.get("/employees", getEmployees);

// Post
router.post("/add-employee", addEmployee);

export default router;
