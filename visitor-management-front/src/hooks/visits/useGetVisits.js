import axios from "axios";
import { useQuery } from "react-query";

export const fetchVisits = () =>
   axios.get(`${process.env.REACT_APP_API_URL}visits/`).then((res) => res.data);

export default function useGetVisits() {
   const queryGetVisits = useQuery("visits", () => fetchVisits());

   const getCurrentVisitByVisitor = (visitorId) => {
      return queryGetVisits.data.filter(
         (v) => v.visitorId === visitorId && v.departureTime === v.arrivalTime
      );
   };

   return { queryGetVisits, getCurrentVisitByVisitor };
}
