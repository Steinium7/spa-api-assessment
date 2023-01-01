import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./Footer.css";

export const Footer = ({
    employees,
    setPage,
    filterSearch,
    setSort,
    page,
    filter,
    sort,
}) => {
    let filterSearchWord = useRef(null);
    const radioName = useRef();
    const radioSurname = useRef();
    const radioNone = useRef();
    let history = useHistory();

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

    const clickHandler = (one) => {
        setPage(parseInt(one));
    };

    const clearFilter = () => {
        filterSearch("");
        filterSearchWord.current.value = "";
    };

    function handleRadioChange(event) {
        const radio = event.target;
        setSort(radio.value === "none" ? "" : radio.value);
    }

    function openForm() {
        history.push("/add");
    }

    const styles = {
        main: {
            backgroundColor: "#EEEE",
        },
        norm: {},
    };

    return (
        <div className="search-container">
            <div className="search-neighbour">
                <button className="clear-filter" onClick={clearFilter}>
                    Clear Filter
                </button>
                <form className="search-form">
                    <input
                        type="text"
                        placeholder="Search..."
                        ref={filterSearchWord}
                        className="search-input"
                        onChange={() =>
                            filterSearch(filterSearchWord.current.value)
                        }
                    />
                </form>
                <button className="create" onClick={openForm}>
                    Add Employee
                </button>
            </div>

            <div className="checkboxes">
                <label className="checkbox-label">
                    <input
                        type="radio"
                        value="name"
                        name="sorting"
                        className="checkbox"
                        ref={radioName}
                        onChange={handleRadioChange}
                    />
                    Sort by Name
                </label>
                <label className="checkbox-label">
                    <input
                        type="radio"
                        value="surname"
                        name="sorting"
                        className="checkbox"
                        ref={radioSurname}
                        onChange={handleRadioChange}
                    />
                    Sort by Surname
                </label>
                <label className="checkbox-label">
                    <input
                        type="radio"
                        value="none"
                        name="sorting"
                        className="checkbox"
                        ref={radioNone}
                        onChange={handleRadioChange}
                    />
                    None
                </label>
            </div>
            <div className="buttons">
                <div className="button-container">
                    {employees[employees.length - 1] &&
                        [
                            ...Array(
                                parseInt(employees[employees.length - 1])
                            ).keys(),
                        ]
                            .map((one) => one + 1)
                            .map((one) => (
                                <button
                                    key={one}
                                    className="button"
                                    style={
                                        page === one ? styles.main : styles.norm
                                    }
                                    onClick={() => clickHandler(one)}
                                >
                                    Page {one}
                                </button>
                            ))}
                </div>
            </div>
        </div>
    );
};
