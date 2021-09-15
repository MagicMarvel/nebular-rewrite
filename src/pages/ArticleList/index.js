import React, { useEffect, useState } from "react";
import Require from "../../utils/Require";
import { Link } from "react-router-dom";
import { GET_ARTICLE_LIST } from "../../utils/pathMap";

export default function Index(props) {
  const [articleList, setArticleList] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const res = await Require.get(GET_ARTICLE_LIST, {
        params: {
          page: 1,
          size: 5,
        },
      });
      setArticleList(res.data.data.detail);
    };
    fetchData();
  }, []);
  return (
    <>
      {/* 背景 */}
      <div className="bg-sky h-screen w-screen bg-center fixed inset-0 -z-10" />
      {/* 白色大卡片 */}
      <div className="bg-gray-200 bg-opacity-80 p-10 rounded-3xl md:w-11/12 md:mx-auto md:my-10">
        {/* 博客标题副标题导航栏 */}
        <div className="flex flex-col items-center justify-between h-48 md:items-start">
          {/* flex浮动控制用 */}
          <div></div>
          {/* 博客名 */}
          <div
            className="text-5xl font-kaiti text-center text-gray-600 my-2 hover:text-purple-600 
            transform transition-all md:ml-14"
          >
            小怪兽
          </div>
          {/* 座右铭 */}
          <div className="text-gray-400 text-sm font-kaiti -mt-4 md:ml-14">
            啊手动阀打发
          </div>
          {/* 导航栏 */}
          <div className="flex items-center justify-center w-full border-t border-b border-gray-300 h-12 md:justify-between">
            <ul className="flex justify-between mx-4 font-kaiti w-5/6 text-gray-600 md:w-3/5 md:ml-10">
              <Link
                to="#"
                className="hover:text-purple-600 transform transition-all"
              >
                首页
              </Link>
              <Link
                to="#"
                className="hover:text-purple-600 transform transition-all"
              >
                个人
              </Link>
              <Link
                to="#"
                className="hover:text-purple-600 transform transition-all"
              >
                文章
              </Link>
              <Link
                to="#"
                className="hover:text-purple-600 transform transition-all"
              >
                问答
              </Link>
            </ul>
            {/* 网站信息，点击量之类的 */}
            <ul
              className="hidden md:mx-6 md:text-gray-600 md:font-kaiti md:text-xs md:inline-block 
            md:translate-y-3 md:transform"
            >
              <li className="inline ">
                点击量<span>?</span>
              </li>
              <li className="inline ">
                运行时间<span>?</span>
              </li>
            </ul>
          </div>
        </div>
        {articleList !== undefined &&
          articleList.map((item) => {
            return (
              // 单个的文章卡片，包括了左边的文章summary和右侧的用户
              <div className="">
                {/* 左侧的文章summary */}
                <div
                  key={item.articleId}
                  className="border-b border-gray-600 border-dotted pb-2 lg:w-4/5 lg:float-left "
                >
                  {/* 文章名 */}
                  <div
                    className="mt-6 mb-3 pl-5 py-1 bg-gray-300 bg-opacity-10 font-kaiti text-xl 
                text-purple-900 font-medium text-opacity-75 border-l-3 border-indigo-700 
                  "
                  >
                    <div className="transform hover:translate-x-8 hover:text-red-500 duration-500 cursor-pointer">
                      {item.title}
                    </div>
                  </div>
                  {/* 文章 summary */}
                  <div className="font-kaiti lg:float-left">
                    <div className="text-gray-600 select-none">
                      {item.summary}
                      <Link to="#" className="text-purple-900 ml-2">
                        阅读更多....
                      </Link>
                    </div>
                    {/* 作者 发布时间 */}
                    <div className="mt-2 float-right">
                      <span className="text-gray-400">
                        posted @ {item.date}
                      </span>
                      <Link to="#" className="text-gray-400 ml-2">
                        {item.author}
                      </Link>
                    </div>
                  </div>
                  {/* 清除发布时间和作者右浮动 */}
                  <div className="clear-both"></div>
                </div>
                {/* 显示用户的小框框 */}
                <div
                  className="hidden lg:inline-block lg:border lg:border-gray-600 lg:w-32 lg:h-32
                  lg:float-right lg:mt-16"
                ></div>
                {/* 清除用户卡片的右浮动 */}
                <div className="clear-both"></div>
              </div>
            );
          })}
        {/* 清除浮动带来的大卡片高度不够情况，顺便做一个翻页buttom */}
        <div className="clear-both float-right m-7">Next</div>
        {/*  */}
        <div className="clear-both"></div>
      </div>
    </>
  );
}