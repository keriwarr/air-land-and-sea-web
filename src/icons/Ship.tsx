import React from "react";

const Ship: React.FC<React.SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512pt"
      height="512pt"
      viewBox="0 -78 512 512"
      {...props}
    >
      <path d="M462.977 326.336l48-128H352v-96H205.664v-64h-85.332V0h-30v102.336H37v117.332H.79l26.663 106.668H0v30h512v-30zm-404.598 0L39.21 249.668h273.328l32-21.332h123.149l-12.75 34H384v30h59.688l-12.75 34zm8.621-194h255v74.969l-18.543 12.363H67zm108.664-64v34h-55.332v-34zm0 0"></path>
      <path d="M245.5 161h30v30h-30zm0 0M179.5 161h30v30h-30zm0 0M113.5 161h30v30h-30zm0 0"></path>
    </svg>
  );
}

export default Ship;
