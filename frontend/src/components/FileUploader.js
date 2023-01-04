import { useRef } from "react";
import { useHistory } from "react-router-dom";

const FileUploader = ({ setReload, setFileState }) => {
    const fileInput = useRef(null);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        const file = fileInput.current.files[0];
        if (!file) {
            alert("file not sent");
            return 0;
        }

        const formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:4000/api/uploads", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    setReload(true);
                    setFileState(true);
                    history.push("/employees");
                }else{
                throw new Error("Error uploading file");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container-fluid container-sm d-flex">
            
            <div className="input-group mt-5">
                <input
                    type="file"
                    htmlFor="file"
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    ref={fileInput}
                />
                <button
                    className="btn btn-outline-primary"
                    type="button"
                    id="inputGroupFileAddon04"
                    onClick={handleSubmit}
                >
                    Button
                </button>
            </div>
        </div>
    );
};

export default FileUploader;
