import axios from "axios";
import { useQuery } from "react-query";

export const fetchVisitors = () =>
   axios
      .get(`${process.env.REACT_APP_API_URL}visitors/`)
      .then((res) => res.data);

export default function useGetVisitors() {
   const query = useQuery("visitors", () => fetchVisitors());

   const getVisitorByEmail = (email) => {
      return query.data.filter(
         (v) => v.email.toLowerCase() === email.toLowerCase()
      );
   };

   return { query, getVisitorByEmail };
}
