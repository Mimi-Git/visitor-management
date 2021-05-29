import axios from "axios";
import { useMutation } from "react-query";
import { useVisitor } from "../../contexts/visitorContext";

export const postVisitor = (newVisitor) =>
   axios
      .post(`${process.env.REACT_APP_API_URL}visitors/`, newVisitor)
      .then((res) => res.data);

export default function useCreateVisitor() {
   const mutationCreateVisitor = useMutation(postVisitor);

   return { mutationCreateVisitor };
}
