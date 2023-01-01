import { useRef } from "react";
import { useHistory } from "react-router-dom";

const FileUploader = () => {
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
                    history.push("/employees");
                }
                throw new Error("Error uploading file");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="file">Select a file:</label>
            <input type="file" ref={fileInput} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUploader;
