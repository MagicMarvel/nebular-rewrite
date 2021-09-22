import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Require from "../../utils/Require";
import { GET_ARTICLE_BY_ID } from "../../utils/pathMap";
import MarkdownParse from "../../components/MarkdownParse";

export default function Index(props) {
  const [articleInformation, setArticleInformation] = useState(undefined);
  const { articleId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await Require.get(GET_ARTICLE_BY_ID, {
        params: {
          articleId: articleId,
        },
      });
      console.log("fetch!!");
      console.log(res.data.data);
      setArticleInformation(res.data.data);
    };
    fetchData();
  }, [articleId]);
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
        {/* 文章显示，包括了题目和内容，这里的relative是为了markdown那个toc的定位 */}
        {articleInformation !== undefined && (
          <div>
            <div
              className="mt-5 mb-2 border-l-3 border-blue-500 font-kaiti text-xl text-purple-500
            font-bold py-2 pl-3"
            >
              <div className="transform hover:translate-x-8 hover:text-red-500 duration-500 cursor-pointer">
                {articleInformation.title}
              </div>
            </div>
            <MarkdownParse
              markdown={articleInformation.content}
            ></MarkdownParse>
          </div>
        )}
        {/*  */}
        <div className="clear-both"></div>
      </div>
    </>
  );
}
