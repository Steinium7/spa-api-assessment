import "./App.css";
import { EmployeeList } from "./components/EmployeeList";
import { Form } from "./components/Form";
import FileUploader from "./components/FileUploader";
import EmployeeDetails from "./components/EmployeeDetails";
import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");
    const [reload, setReload] = useState(false);

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

        fetch(`localhost:4000/api/all?${queryString}`, {
            method: "GET",
        }).then(async (response) => {
            let data = await response.json();
            setEmployees(Object.values(data));
        });
    }, [page, filter, sort, reload]);

    const filterSearch = (newfilter) => {
        setFilter(newfilter);
    };

    return (
        <Router>
            <div>
                <header className="App-header">
                    <center>
                        <h1>React App for Employees</h1>
                    </center>
                </header>
                <Switch>
                    <Route exact path="/">
                        <FileUploader />
                    </Route>
                    <Route exact path="/employees">
                        <EmployeeList
                            employees={employees}
                            setPage={setPage}
                            filterSearch={filterSearch}
                            setSort={setSort}
                            page={page}
                            filter={filter}
                            sort={sort}
                        />
                    </Route>
                    <Route exact path="/add">
                        <Form setReload={setReload} />
                    </Route>
                    <Route exact path="/employee/:id">
                        <EmployeeDetails props={employees} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
