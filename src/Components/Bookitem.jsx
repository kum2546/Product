import React from "react";

const Bookitem = ({ id, Name = "No Data" }) => {
  return (
    <li>
      {id} : {Name}
    </li>
  );
};

export default Bookitem;
