import express from "express";
import {
  getEmployees,
  addEmployee,
  getEmployeesGroup,
} from "../controllers/employeeControllers";
const router = express.Router();

// get
router.get("/employees", getEmployees);
router.get("/employees-group", getEmployeesGroup);
// router.get("/employees-by-manager", getEmployeesByManager);

// Post
router.post("/add-employee", addEmployee);

export default router;
