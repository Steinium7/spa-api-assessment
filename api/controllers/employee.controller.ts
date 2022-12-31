const employeeModel = require("../models/employee.model");

module.exports = {
    getAll: (req: any, res: any) => {
        let data = employeeModel.getEmployees(req.query);
        if (data instanceof Error)
            return res.status(500).send({ err: "There is an Error" });

        res.send(data);
    },

    getOne: (req: any, res: any) => {
        let data = employeeModel.getOneEmployee(req.params.id);
        if (data instanceof Error)
            return res.status(500).send({ err: "There is an Error" });

        res.send(data);
    },

    createEmployee: (req: any, res: any) => {
        let data = employeeModel.createEmployee(req.body);
        if (!data) return res.sendStatus(200);
        res.sendStatus(500);
    },

    filter: (req: any, res: any) => {
        let data = employeeModel.getEmployees("filter", req.body.filter);
        if (data instanceof Error)
            return res.send({ err: "There is an Error" });

        res.send(data);
    },

    fileUpload: (req: any, res: any) => {
        if (!req.files) {
            return res.status(500).send({ msg: "file is not found" });
        }
        // accessing the file
        let response = employeeModel.fileUpload(req.files.file);

        if (response) return res.status(500).send({ msg: "Error occured" });
        return res.status(200).send({ msg: "File Uploaded" });
    },
};
