import axios from "axios";
import { useQuery } from "react-query";

const fetchEmployees = () =>
   axios
      .get(`${process.env.REACT_APP_API_URL}employees/`)
      .then((res) => res.data);

export default function useGetEmployees() {
   const queryGetEmployee = useQuery("employees", () => fetchEmployees());

   const getEmployeesByNames = (searchedEmployee) => {
      return queryGetEmployee.data.filter((employee) => {
         const fullName = `${employee.firstName} ${employee.lastName}`;
         return NormalizeString(fullName).includes(
            NormalizeString(searchedEmployee)
         );
      });
   };

   return { queryGetEmployee, getEmployeesByNames };
}

function NormalizeString(toNormalize) {
   return toNormalize
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
}
