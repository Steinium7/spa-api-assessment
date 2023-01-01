import { useRef } from "react";
import { useHistory } from "react-router-dom";

const FileUploader = () => {
    const fileInput = useRef(null);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        const file = fileInput.current.files[0];

        const formData = new FormData();
        formData.append("file", file);

        // console.log(formData)

        fetch(
            "https://3000-steinium7-spaapiassessm-c1ty6vaaqql.ws-eu80.gitpod.io/api/uploads",
            {
                method: "POST",
                body: formData,
            }
        )
            .then((response) => {
                if (response.ok) {
                    history.push("/employees");
                }
                throw new Error("Error uploading file");
            })
            //   .then((data) => {
            //     // Navigate to a new page here
            //     history.push('/success');
            //   })
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
