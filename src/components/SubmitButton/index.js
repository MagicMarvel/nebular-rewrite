import React from "react";

export default function Index(props) {
  return (
    <div
      className=" h-9 mx-auto rounded bg-gray-300 border border-gray-400 inline-flex items-center justify-center
        hover:text-indigo-600 hover:border-indigo-600 transition-all select-none cursor-pointer"
    >
      {props.render()}
    </div>
  );
}
