import "./EmployeeCard.css";
import { useHistory } from "react-router-dom";

const EmployeeCard = ({ props }) => {
    const history = useHistory();
    const onClickCard = () => {
        let path = `employee/${props[0]}`;
        history.push(path);
    };

    return (
        <div
            className="container"
            // key={props[0]}
            onClick={onClickCard}
        >
            <div className="word">
                {props[1]}, {props[2]}
            </div>
        </div>
    );
};

EmployeeCard.defaultProps = ["New", "User"];

export default EmployeeCard;
