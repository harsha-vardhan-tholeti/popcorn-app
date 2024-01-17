import React from "react";

function List({ children }) {
  return (
    <>
      <ul className="list">{children}</ul>
    </>
  );
}

export default List;
