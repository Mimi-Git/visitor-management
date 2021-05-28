import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";

export default function useRestoreData() {
   const [modal, setModal] = useState(false);

   const mutation = useMutation(
      () =>
         axios
            .delete(`${process.env.REACT_APP_API_URL}restoredatas`)
            .then((res) => res.data),
      {}
   );

   const onRestore = async () => {
      await mutation.mutateAsync();
   };

   const toggle = () => {
      setModal(!modal);
      setTimeout(mutation.reset, 1000);
   };

   return {
      modal,
      toggle,
      onRestore,
      mutation,
   };
}
