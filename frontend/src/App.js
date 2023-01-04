import { EmployeeList } from "./components/EmployeeList";
import { Form } from "./components/Form";
import FileUploader from "./components/FileUploader";
import { Protected } from "./components/Protected";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch,Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [employees, setEmployees] = useState([]);
    const [reload, setReload] = useState(false);
    const [fileState, setFileState] = useState(false);

    const styles= {
        
        display:"none"
    }


    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand " href="#">
                            <span className="navbar-brand mb-o h1">EMPLOYEE APP</span> 
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={ !fileState ? "nav navbar-right invisible": "nav navbar-right" }
                            id="navbarNavAltMarkup"
                        >
                            <div className="navbar-nav">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/employees"
                                >
                                    Home
                                </Link>
                                <Link className="nav-link" to="/add">
                                    Add
                                </Link>
                                <a
                                    className="nav-link disabled"
                                    href="#"
                                    tabIndex="-1"
                                    aria-disabled="true"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <FileUploader
                            setReload={setReload}
                            setFileState={setFileState}
                        />
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
                </Switch>
            </div>
        </Router>
    );
}

export default App;
