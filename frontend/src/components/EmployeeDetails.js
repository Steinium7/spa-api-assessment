import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./EmployeeDetails.css";

function EmployeeDetails() {
    let { id } = useParams();
    const history = useHistory();
    const [data, setData] = useState({});

    const clickBack = () => {
        history.push("/employees");
        setData({});
    };

    useEffect(() => {
        fetch(
            `https://3000-steinium7-spaapiassessm-c1ty6vaaqql.ws-eu80.gitpod.io/api/employee/${id}`,
            {
                method: "GET",
            }
        ).then(async (response) => {
            let data = await response.json();
            setData(data);
        });
    }, [id]);

    if (data.id === undefined) {
        return (
            <center>
                <p>Loading . . . . .</p>
            </center>
        );
    }

    return (
        <div className="user-info">
            <h1>
                {data.name} {data.surname}
            </h1>
            <p>Email: {data.email}</p>
            <p>Phone: {data.phone}</p>
            <p>Address: {data.address}</p>
            <p>Date of birth: {data.dateOfBirth}</p>
            <button onClick={clickBack}>Back</button>
        </div>
    );
}

export default EmployeeDetails;
