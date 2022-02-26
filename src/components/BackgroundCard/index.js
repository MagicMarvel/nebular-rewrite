import React from "react";
import { Link } from "react-router-dom";
import randomMotto from "../../utils/randomMotto";

export default function index(props) {
  return (
    <div>
      {/* 背景 */}
      <div className="bg-sky h-screen w-screen bg-center fixed inset-0 -z-10 bg-cover" />
      {/* 白色大卡片 */}
      <div
        className="bg-gray-200 bg-opacity-80 p-10 rounded-none md:rounded-3xl md:w-11/12 md:mx-auto md:my-10 shadow-2xl"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        }}
      >
        {/* 博客标题副标题导航栏 */}
        <div className="flex flex-col items-center justify-between h-48 md:items-start">
          {/* flex浮动控制用 */}
          <div></div>
          {/* 博客名 */}
          <Link
            className="text-6xl font-Playball text-center text-gray-600 my-2 hover:text-purple-600 
          transform transition-all md:ml-14 select-none"
            to="/"
          >
            Nebula
          </Link>
          {/* 座右铭 */}
          <div className="text-gray-400 text-sm font-kaiti -mt-4 md:ml-14 select-none">
            {randomMotto()}
          </div>
          {/* 导航栏 */}
          <div className="flex items-center justify-center w-full border-t border-b border-gray-300 h-12 md:justify-between">
            <ul className="flex justify-between mx-4 font-kaiti w-5/6 text-gray-600 md:w-3/5 md:ml-10">
              <Link
                to="/personalPage"
                className="hover:text-purple-600 transform transition-all"
              >
                个人
              </Link>
              <Link
                to="/articleList/1"
                className="hover:text-purple-600 transform transition-all"
              >
                文章
              </Link>
              <Link
                to="/QAList/1"
                className="hover:text-purple-600 transform transition-all"
              >
                问答
              </Link>
              <a
                href="http://119.91.84.186"
                className="hover:text-purple-600 transform transition-all"
              >
                SOJ
              </a>
            </ul>
            {/* TODO：添加网站信息 */}
            {/* 网站信息，点击量之类的 */}
            <div
              className="hidden md:mx-6 md:text-gray-600 md:font-kaiti md:text-xs md:inline-block 
                      md:translate-y-3 md:transform"
            ></div>
          </div>
        </div>
        {props.children}
        <div
          className="flex justify-center items-center h-7 text-gray-400 
         text-xs md:text-sm mt-5 flex-col md:flex-row"
        >
          <a className="mx-2" href="https://beian.miit.gov.cn/">
            粤ICP备2021079778号
          </a>
          <a className="mx-2" href="https://beian.miit.gov.cn/">
            粤ICP备2021079778号-1
          </a>
          <span className="mx-2">@CopyRight STU-ACM </span>
        </div>
      </div>
    </div>
  );
}
