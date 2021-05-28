import axios from "axios";
import { useMutation } from "react-query";
import { useVisitor } from "../../contexts/visitorContext";

export const postVisitors = (newVisitor) =>
   axios
      .post(`${process.env.REACT_APP_API_URL}visitors/`, newVisitor)
      .then((res) => res.data);

export default function useCreateVisitor() {
   const mutation = useMutation(postVisitors);
   const { setVisitor } = useVisitor();

   // const onAddVisitor = (newVisitor) => {
   //    mutation.mutate(newVisitor, {
   //       onSuccess: (data) => {
   //          setVisitor(data);
   //       },
   //    });
   // };

   return { mutation, onAddVisitor };
}
