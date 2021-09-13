import React from "react";

export default function Index(props) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      {/* 卡片 */}
      <div
        className={`bg-gray-900 bg-opacity-80 ${
          props.smallCard === undefined ? "w-10/12" : "max-w-max"
        } pt-11 px-5 pb-2 rounded-l relative`}
      >
        <div className="text-xl max-w-max border-b border-white text-white px-1 tracking-widest">
          {props.title}
        </div>
        {/* 给SVG上特效的div */}
        <div
          className="absolute left-full top-3 -ml-12 cursor-pointer"
          onClick={() => props.handleClose(true)}
        >
          <svg
            t="1631543331435"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2168"
            width="28"
            height="28"
          >
            <path
              d="M571.01312 523.776l311.3472-311.35232c15.7184-15.71328 15.7184-41.6256 0-57.344l-1.69472-1.69984c-15.7184-15.71328-41.6256-15.71328-57.34912 0l-311.3472 311.77728-311.35232-311.77728c-15.7184-15.71328-41.63072-15.71328-57.344 0l-1.69984 1.69984a40.0128 40.0128 0 0 0 0 57.344L452.92544 523.776l-311.35232 311.35744c-15.71328 15.71328-15.71328 41.63072 0 57.33888l1.69984 1.69984c15.71328 15.7184 41.6256 15.7184 57.344 0l311.35232-311.35232 311.3472 311.35232c15.72352 15.7184 41.63072 15.7184 57.34912 0l1.69472-1.69984c15.7184-15.70816 15.7184-41.6256 0-57.33888l-311.3472-311.35744z"
              p-id="2169"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div className="text-white py-3 px-1">{props.children}</div>
      </div>
    </div>
  );
}
