
export const Footer = ({
    employees,
    setPage,
    page,
}) => {

    const clickHandler = (one) => {
        setPage(parseInt(one));
    };


    return (
        <div className="d-flex justify-content-center ">
            <div
                className="btn-group "
                role="group"
                aria-label="Basic outlined example"
            >
                {employees[employees.length - 1] &&
                    [...Array(parseInt(employees[employees.length - 1])).keys()]
                        .map((one) => one + 1)
                        .map((one) => (
                            <button
                                key={one}
                                type="button"
                                className={page === one ? "btn btn-primary" : "btn btn-outline-primary"}
                                onClick={() => clickHandler(one)}
                            >
                                Page {one}
                            </button>
                        ))}
            </div>
        </div>
    );

};
