import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./Form.css";

export const Form = ({ setReload }) => {
    let history = useHistory();
    const name = useRef();
    const surname = useRef();
    const phone = useRef();
    const email = useRef();
    const address = useRef();
    const dateOfBirth = useRef();

    function back() {
        history.push("/employees");
    }

    function submitForm() {
        console.log([
            name.current.value,
            surname.current.value,
            phone.current.value,
            email.current.value,
            address.current.value,
            dateOfBirth.current.value,
        ]);

        fetch(
            `https://3000-steinium7-spaapiassessm-c1ty6vaaqql.ws-eu80.gitpod.io/api/create`,
            {
                method: "POST",
                body: JSON.stringify({
                    name: name.current.value,
                    surname: surname.current.value,
                    address: address.current.value,
                    phone: phone.current.value,
                    email: email.current.value,
                    dateOfBirth: dateOfBirth.current.value,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(async (response) => {
            //to change
            await response.json();
            // setEmployees(Object.values(data));
            setReload(true);
            history("/employees");
        });
    }

    return (
        <div>
            <div>
                <form onSubmit={(event) => event.preventDefault()}>
                    <label htmlFor="name">Name:</label>
                    <br />
                    <input type="text" ref={name} id="name" name="name"></input>
                    <br />
                    <label htmlFor="surname">Surname:</label>
                    <br />
                    <input
                        type="text"
                        id="surname"
                        ref={surname}
                        name="surname"
                    ></input>
                    <br />
                    <label htmlFor="address">Address:</label>
                    <br />
                    <input
                        type="text"
                        id="address"
                        ref={address}
                        name="address"
                    ></input>
                    <br />
                    <label htmlFor="phone">Phone:</label>
                    <br />
                    <input
                        type="text"
                        id="phone"
                        ref={phone}
                        name="phone"
                    ></input>
                    <br />
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        ref={email}
                        name="email"
                    ></input>
                    <br />
                    <label htmlFor="dob">Date of Birth:</label>
                    <br />
                    <input
                        type="date"
                        id="dob"
                        ref={dateOfBirth}
                        name="dob"
                    ></input>
                    <br />
                    <br />
                    <div className="button-container">
                        <button className="tosubmit" onClick={submitForm}>
                            Submit
                        </button>
                        <button className="button-back" onClick={back}>
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
