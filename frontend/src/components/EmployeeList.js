import EmployeeCard from "./EmployeeCard";
import { useEffect } from "react";
import { useState } from "react";
import { Footer } from "./Footer";

export const EmployeeList = ({
    employees,
    setEmployees,
    reload,
    setReload
}) => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");

    const filterSearch = (newfilter) => {
        setFilter(newfilter);
    };


    useEffect(() => {
        setReload(false);
        let queryParams = Object.entries({
            page: page,
            filter: filter,
            sort: sort,
        })
            .filter(([key, val]) => val !== undefined && val !== "")
            .reduce(
                (obj, [key, val]) => Object.assign(obj, { [key]: val }),
                {}
            );

        const queryString = Object.keys(queryParams)
            .map((key) => key + "=" + queryParams[key])
            .join("&");

        fetch(`http://localhost:4000/api/all?${queryString}`, {
            method: "GET",
        }).then(async (response) => {
            let data = await response.json();
            setEmployees(Object.values(data));
        });
    }, [page, filter, sort, reload, setEmployees, setReload]);




    return (
        <div>
            <div className="list-container">
                <center>
                    {employees.slice(0, employees.length - 1).map((one) => {
                        return <EmployeeCard key={one[0]} props={one} />;
                    })}
                </center>
            </div>
            <Footer
                employees={employees}
                setPage={setPage}
                filterSearch={filterSearch}
                setSort={setSort}
                page={page}
                filter={filter}
                sort={sort}
            />
        </div>
    );
};
