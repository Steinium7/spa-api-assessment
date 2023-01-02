import "./App.css";
import { EmployeeList } from "./components/EmployeeList";
import { Form } from "./components/Form";
import FileUploader from "./components/FileUploader";
import EmployeeDetails from "./components/EmployeeDetails";
import { Protected } from "./components/Protected";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    const [employees, setEmployees] = useState([]);
    const [reload, setReload] = useState(false);
    const [fileState, setFileState] = useState(false)

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
                        <FileUploader setReload={setReload} setFileState={setFileState}/>
                    </Route>
                    <Route exact path="/employees">
                        <Protected fileState={fileState}>
                        <EmployeeList
                            employees={employees}
                            setEmployees={setEmployees}
                            reload={reload}
                            setReload={setReload}
                        />
                        </Protected>

                    </Route>
                    <Route exact path="/add">
                    <Protected fileState={fileState}>
                        <Form setReload={setReload} />
                    </Protected>
                    </Route>
                    <Route exact path="/employee/:id">
                        <Protected fileState={fileState}>
                            <EmployeeDetails props={employees} />
                        </Protected>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
