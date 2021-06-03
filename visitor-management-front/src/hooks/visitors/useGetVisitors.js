import axios from "axios";
import { useQuery } from "react-query";

export const fetchVisitors = () =>
   axios
      .get(`${process.env.REACT_APP_API_URL}visitors/`)
      .then((res) => res.data);

export default function useGetVisitors() {
   const queryGetVisitors = useQuery("visitors", () => fetchVisitors());

   const getVisitorByEmail = (email) => {
      return queryGetVisitors.data.filter(
         (v) => v.email.toLowerCase() === email.toLowerCase()
      );
   };

   return { queryGetVisitors, getVisitorByEmail };
}
