import axios from "axios";
import { useMutation } from "react-query";

export const postVisit = (newVisit) =>
   axios
      .post(`${process.env.REACT_APP_API_URL}visits/`, newVisit)
      .then((res) => res.data);

export default function useCreateVisit() {
   const mutationCreateVisit = useMutation(postVisit);

   async function createVisit(newVisit) {
      await mutationCreateVisit.mutateAsync(newVisit);
   }

   return { mutationCreateVisit, createVisit };
}
