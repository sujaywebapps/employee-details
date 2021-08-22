import express from "express";
import {
  getEmployees,
  addEmployee,
  getEmployeesGroup,
  clearAll,
} from "../controllers/employeeControllers";
const router = express.Router();

// get
router.get("/employees", getEmployees);
router.get("/employees-group", getEmployeesGroup);
// router.get("/employees-by-manager", getEmployeesByManager);
router.get("/clear-all", clearAll);

// Post
router.post("/add-employee", addEmployee);

export default router;
