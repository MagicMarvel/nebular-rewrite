import React from "react";

export default function Index(props) {
    return (
        <div
            style={props.style}
            onClick={props.onClick}
            className=" h-9 px-auto rounded bg-gray-300 border border-gray-400 inline-flex items-center justify-center
        hover:text-indigo-600 hover:border-indigo-600 transition-all select-none cursor-pointer px-3"
        >
            {props.render()}
        </div>
    );
}
