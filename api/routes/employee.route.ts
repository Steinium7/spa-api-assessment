let express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee.controller");

router.post("/uploads", employeeController.fileUpload);

router.get("/all", employeeController.getAll);

router.get("/employee/:id", employeeController.getOne);

router.post("/create", employeeController.createEmployee);

module.exports = router;
