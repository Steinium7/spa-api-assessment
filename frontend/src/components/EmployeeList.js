import EmployeeCard from "./EmployeeCard";
import { Footer } from "./Footer";

export const EmployeeList = ({
    employees,
    setPage,
    filterSearch,
    setSort,
    page,
    filter,
    sort,
}) => {
    return (
        <div>
            <div className="list-container">
                <center>
                    {employees.slice(0, employees.length - 1).map((one) => {
                        return <EmployeeCard key={one[0]} props={one} />;
                    })}
                </center>
            </div>
            <Footer
                employees={employees}
                setPage={setPage}
                filterSearch={filterSearch}
                setSort={setSort}
                page={page}
                filter={filter}
                sort={sort}
            />
        </div>
    );
};
