import React, { useState } from "react";
import {
   Dropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18next from "i18next";

const FrFlag = ({ width = 21, height = 16 }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      width={width}
      height={height}
   >
      <g>
         <path fill="#fff" d="M0 0h640v480H0z" />
         <path fill="#00267f" d="M0 0h213.3v480H0z" />
         <path fill="#f31830" d="M426.7 0H640v480H426.7z" />
      </g>
   </svg>
);

const GbFlag = ({ width = 21, height = 16 }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      id="flag-icon-css-gb"
      viewBox="0 0 640 480"
      width={width}
      height={height}
   >
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
         fill="#FFF"
         d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
      />
      <path
         fill="#C8102E"
         d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
      />
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
   </svg>
);

const languages = [
   {
      code: "fr",
      name: "Français",
      country_code: "fr",
      flag_icon: <FrFlag />,
   },
   {
      code: "en",
      name: "English",
      country_code: "gb",
      flag_icon: <GbFlag />,
   },
];

export const Languages = (props) => {
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const toggle = () => setDropdownOpen((prevState) => !prevState);

   return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
         <DropdownToggle color="primary" size="lg">
            <FontAwesomeIcon icon={["fas", "globe"]} />
         </DropdownToggle>
         <DropdownMenu>
            {languages.map(({ code, name, country_code, flag_icon }) => (
               <DropdownItem
                  disabled={i18next.language === code}
                  key={country_code}
                  onClick={() => {
                     i18next.changeLanguage(code);
                  }}
               >
                  <span className="mx-2">{flag_icon}</span>
                  {name}
               </DropdownItem>
            ))}
         </DropdownMenu>
      </Dropdown>
   );
};
