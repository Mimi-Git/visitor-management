import axios from "axios";
import { useQuery } from "react-query";

export const fetchVisitorByEmail = (email) =>
   axios
      .get(
         `${
            process.env.REACT_APP_API_URL
         }visitors/getbyemail/${encodeURIComponent(email)}`
      )
      .then((res) => res.data);

export default function useGetVisitorByEmail(email) {
   let queryGetVisitorByEmail = useQuery(
      ["visitors", email],
      () => fetchVisitorByEmail(email),
      {
         enabled: false,
         retry: 2,
         cacheTime: 0,
      }
   );

   function getCurrentVisit() {
      return queryGetVisitorByEmail.data.visits.filter(
         (v) => v.arrivalTime === v.departureTime
      )[0];
   }

   return { queryGetVisitorByEmail, getCurrentVisit };
}
