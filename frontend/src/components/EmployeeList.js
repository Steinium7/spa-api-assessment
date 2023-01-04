import { useEffect, useRef } from "react";
import { useState } from "react";
import { Footer } from "./Footer";


export const EmployeeList = ({
    employees,
    setEmployees,
    reload,
    setReload,
}) => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");
    let filterSearchWord = useRef(null);
    const radioName = useRef();
    const radioSurname = useRef();
    const radioNone = useRef();

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


    useEffect(() => {
        filterSearchWord.current.value = filter;

        if (sort === "name") {
            radioName.current.checked = true;
        } else if (sort === "surname") {
            radioSurname.current.checked = true;
        } else {
            radioNone.current.checked = true;
        }       
    }, [filter, sort]);

    function handleRadioChange(event) {
        const radio = event.target;
        setSort(radio.value === "none" ? "" : radio.value);
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control mb-3 mt-3 mx-auto w-25"
                    ref={filterSearchWord}
                    id="exampleFormControlInput1"
                    onChange={() =>
                        filterSearch(filterSearchWord.current.value)
                    }
                    placeholder="Filter..."
                />
                <div
                    className="btn-group mb-4 mt-4 w-25"
                    role="group"
                    aria-label="Basic radio toggle button group"
                >
                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio1"
                        value="name"
                        ref={radioName}
                        onChange={handleRadioChange}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">
                        Sort by Name
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio2"
                        value="surname"
                        ref={radioSurname}
                        onChange={handleRadioChange}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">
                        Sort by Surname
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio3"
                        value="none"
                        ref={radioNone}
                        onChange={handleRadioChange}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio3">
                        None
                    </label>
                </div>
            </div>

            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date Of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.slice(0, employees.length - 1).map((one) => {
                        return (
                            <tr key={one[0]}>
                                <th scope="row">
                                    {one[0]}
                                </th>
                                <td>{one[1]}</td>
                                <td>{one[2]}</td>
                                <td>{one[3]}</td>
                                <td>{one[4]}</td>
                                <td>{one[5]}</td>
                                <td>{one[6]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Footer
                employees={employees}
                setPage={setPage}
                page={page}
            />
        </div>
    );
};
