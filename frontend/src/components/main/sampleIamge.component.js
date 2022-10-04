import React from "react";

export default function SampleImage({ onClick }) {
  return (
    <div>
      Sample Images
      <img alt="apple.jpg" src="./apple.jpg" onClick={onClick} />
      <img alt="tree.jpg" src="./tree.jpg" onClick={onClick} />
    </div>
  );
}
