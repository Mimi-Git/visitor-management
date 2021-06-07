import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const DateTime = () => {
   const { i18n } = useTranslation("home");
   var [date, setDate] = useState(new Date());
   const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
   };

   useEffect(() => {
      var timer = setInterval(() => setDate(new Date()), 1000);
      return function cleanup() {
         clearInterval(timer);
      };
   });

   return (
      <div className="date-time">
         <h1 className="h1">
            {date.toLocaleTimeString([], {
               hour: "2-digit",
               minute: "2-digit",
            })}
         </h1>
         <span className="date">
            {date.toLocaleDateString(i18n.language, options)}
         </span>
      </div>
   );
};

export default DateTime;
