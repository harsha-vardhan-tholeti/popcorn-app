import React from "react";

function StaticButton({ isOpen, setIsOpen }) {
  const handleOpen = () => {
    setIsOpen((open) => !open);
  };
  return (
    <>
      <button className="btn-toggle" onClick={handleOpen}>
        {isOpen ? "–" : "+"}
      </button>
    </>
  );
}

export default StaticButton;
