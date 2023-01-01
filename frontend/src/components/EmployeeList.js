import EmployeeCard from "./EmployeeCard";
import { Footer } from "./Footer";
// import { useState } from "react";
// import { useEffect } from "react";

// function makeRequest(page = "", setEmployees, filter = "", sort = "") {
//     console.log(page);
//     let queryParams = {
//         filter: filter,
//         sort: sort,
//         page: page,
//     };
//     console.log(queryParams);
//     queryParams = Object.entries(queryParams)
//         .filter(([key, val]) => val !== undefined && val !== "")
//         .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
//     console.log(queryParams);
//     // fetch(`/myendpoint?${queryString}`)
//     //     .then(res => res.json())
//     //     .then(data => {
//     //         // do something with data
//     //     });

//     const queryString = Object.keys(queryParams)
//         .map((key) => key + "=" + queryParams[key])
//         .join("&");
//     console.log(queryString);

//     fetch(
//         `https://3000-steinium7-spaapi-8ycclcqfulf.ws-eu80.gitpod.io/api/all?${queryString}`,
//         {
//             method: "GET",
//         }
//     ).then(async (response) => {
//         let data = await response.json();
//         console.log(data);
//         setEmployees(Object.values(data));
//     });
// }

// return makeRequest;

export const EmployeeList = ({ employees, setPage, filterSearch, setSort }) => {
    return (
        <div>
            <div className="list-container">
                <center>
                    {employees.slice(0, employees.length - 1).map((one) => {
                        return <EmployeeCard key={one[0]} props={one} />;
                    })}
                </center>
            </div>
            {/* <div className="button-container">
                {employees[10] &&
                    [...Array(parseInt(employees[10])).keys()]
                        .map((one) => one + 1)
                        .map((one) => (
                            <button
                                key={one}
                                className="button"
                                onClick={() => clickHandler(one)}
                            >
                                Page {one}
                            </button>
                        ))}
            </div> */}
            <Footer
                employees={employees}
                setPage={setPage}
                filterSearch={filterSearch}
                setSort={setSort}
            />
        </div>
    );
};
