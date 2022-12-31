let express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const employees = require("./routes/employee.route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./documentation/swagger.json");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(fileUpload());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", employees);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});

export {};
