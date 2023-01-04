const fs = require("fs");

function readFile() {
    let data = fs.readFileSync("./uploads/employees.txt", "utf8");
    return data.split("\n");
}

function formatData(data: string[]) {
    interface IObjectKeys {
        [key: string]: string[];
    }
    let main: IObjectKeys = {};

    for (let entry of data) {
        let employee = entry.split(",");
        main[employee[0]] = employee.slice(0, 3);
        main[employee[0]].push(employee[5]);
        main[employee[0]].push(employee[3].slice(1,-1))
        main[employee[0]].push(employee[4])
        main[employee[0]].push(employee[6].slice(0, -1))
    }

    return main;
}

function filterby(data: string[], parameter: string) {
    const filterValues = data.filter((a: string) => {
        let splitData: string = a.split(",")[5];
        return splitData.includes(parameter);
    });

    return filterValues;
}

//couldn't get the sorting to work properly
function sortby(data: string[], by: "name" | "surname" | string) {
    let param: number = by == "name" ? 1 : 2;
    data.sort((a, b) => {
        return a.split(",")[param].localeCompare(b.split(",")[param]);
    });
    return data;
}

interface queryParams {
    [key: string]: string;
}

module.exports = {
    getEmployees: (params: queryParams) => {
        try {
            let data = readFile();
            interface IObjectKeys {
                [key: string]: string[];
            }

            let main: IObjectKeys = {};

            let mainData: string[] = [];
            let page: number = 1;

            if (params.hasOwnProperty("page")) page = parseInt(params["page"]);
            mainData = mainData.length != 0 ? mainData : data;
            if (params.hasOwnProperty("filter")) {
                mainData = filterby(data, params["filter"]);
            }
            if (params.hasOwnProperty("sort")) {
                mainData = sortby(mainData, params["sort"]);
            }

            //Pagination
            let numOfPages: string = `${Math.ceil(mainData.length / 10)}`;
            mainData = mainData.slice(page * 10 - 10, page * 10);
            main = formatData(mainData);
            main["numOfPages"] = [numOfPages];

            return main;
        } catch (err) {
            return err;
        }
    },

    getOneEmployee: (parameter: string) => {
        let data = readFile();
        interface IObjectKeys {
            [key: string]: string[];
        }

        let main: IObjectKeys = {};
        try {
            let employee = data[parseInt(parameter) - 1].split(",");

            main = {
                id: employee[0],
                name: employee[1],
                surname: employee[2],
                address: employee[3].slice(3, -3),
                phone: employee[4],
                email: employee[5],
                dateOfBirth: employee[6].slice(0, -1),
            };
        } catch (error) {
            return error;
        }

        return main;
    },

    createEmployee: (data: Object) => {
        let number = readFile().length;

        let dataNew = Object.values(data);
        data = dataNew.map(function (a: string) {
            return a.replace('"', "");
        });

        let entry = `\n${number + 1},${data}`;

        fs.appendFile("./uploads/employees.txt", entry, (err: any) => {
            if (err) return 0;
            return 1;
        });
    },
    fileUpload: (file: any) => {
        const myFile = file;

        myFile.mv(`${__dirname}/../uploads/employees.txt`, function (err: any) {
            if (err) {
                return 0;
            }

            return 1;
        });
    },
};
