import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useVisitor } from "../contexts/visitorContext";
import useGetVisitors from "./visitors/useGetVisitors";
import { useTranslation } from "react-i18next";

function useYup() {
   const { visitor } = useVisitor();
   const { queryGetVisitors, getVisitorByEmail } = useGetVisitors();
   const { t: common } = useTranslation("common");
   const { t } = useTranslation("firstVisit");

   const err = common("errors", { returnObjects: true });
   const firstNameTitle = t("firstNameTitle");
   const lastNameTitle = t("lastNameTitle");
   const phoneNumberTitle = t("phoneNumberTitle");
   const emailTitle = t("emailTitle");
   const companyNameTitle = t("companyNameTitle");
   const visitorTypeObj = t("visitorType", { returnObjects: true });
   const visitorTypeTitle = visitorTypeObj.Title;

   const phoneRegExp =
      /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

   const schema = yup.object().shape({
      firstName: yup
         .string(`${firstNameTitle} ${err.string}`)
         .required(`${firstNameTitle} ${err.required}`)
         .min(2, `${firstNameTitle} ${err.min.replace("{value}", "2")}`)
         .default(visitor.firstName),
      lastName: yup
         .string(`${lastNameTitle} ${err.string}`)
         .required(`${lastNameTitle} ${err.required}`)
         .min(2, `${lastNameTitle} ${err.min.replace("{value}", "2")}`)
         .default(visitor.lastName),
      phoneNumber: yup.lazy((value) =>
         !value
            ? yup.string().default(visitor.phoneNumber).nullable()
            : yup
                 .string()
                 .matches(phoneRegExp, `${phoneNumberTitle} ${err.invalid}`)
                 .default(visitor.phoneNumber)
      ),
      email: yup
         .string(`${emailTitle} ${err.string}`)
         .required(`${emailTitle} ${err.required}`)
         .email(`${emailTitle} ${err.invalid}`)
         .test(
            "email-exist",
            `${emailTitle} ${err.emailUsed}`,
            function (email) {
               if (queryGetVisitors.isSuccess) {
                  const visitorExist = getVisitorByEmail(email).length !== 0;
                  return !visitorExist;
               }
               return false;
            }
         )
         .default(visitor.email),
      companyName: yup
         .string(`${companyNameTitle} ${err.string}`)
         .required(`${companyNameTitle} ${err.required}`)
         .min(2, `${companyNameTitle} ${err.min.replace("{value}", "2")}`)
         .default(visitor.companyName),
      visitorType: yup
         .string(`${visitorTypeTitle} ${err.invalid}`)
         .required(`${visitorTypeTitle} ${err.required}`)
         .matches(
            /visitor|contractor|courier|other/,
            `${visitorTypeTitle} ${err.required}`
         )
         .default(visitor.visitorType),
   });

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      resolver: yupResolver(schema),
   });

   return {
      register,
      handleSubmit,
      errors,
      reset,
   };
}

export default useYup;
