import axios from "axios";
import { useQuery } from "react-query";

const fetchEmployees = () =>
   axios.get(`https://localhost:5001/api/employees/`).then((res) => res.data);

export default function useGetEmployees() {
   const query = useQuery("employees", () => fetchEmployees());

   const getEmployeesByNames = (searchedEmployee) => {
      return query.data.filter((employee) => {
         const fullName = `${employee.firstName} ${employee.lastName}`;
         return NormalizeString(fullName).includes(
            NormalizeString(searchedEmployee)
         );
      });
   };

   return { query, getEmployeesByNames };
}

function NormalizeString(toNormalize) {
   return toNormalize
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
}
