import axios from "axios";
import { useMutation } from "react-query";

export const putVisit = (visitToUpdate) =>
   axios
      .put(
         `${process.env.REACT_APP_API_URL}visits/${visitToUpdate.id}`,
         visitToUpdate
      )
      .then((res) => res.data);

export default function usePutVisit() {
   const mutationUpdateVisit = useMutation(putVisit);

   async function updateVisit(visitToUpdate) {
      await mutationUpdateVisit.mutateAsync(visitToUpdate);
   }

   return { mutationUpdateVisit, updateVisit };
}
