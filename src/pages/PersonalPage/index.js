import React, { useEffect, useState } from "react";
import Require from "../../utils/Require";
import { Link } from "react-router-dom";
import { GET_ARTICLE_LIST } from "../../utils/pathMap";
import { useParams } from "react-router-dom";
import randomMotto from "../../utils/randomMotto";
import PageNav from "../../components/PageNav";
import { GET_USER, LOGIN } from "../../utils/pathMap";

export default function Index(props) {
  const [articleList, setArticleList] = useState(undefined);
  const [nowPage, setNowPage] = useState(undefined);
  const [pageNum, setPageNum] = useState(undefined);
  const [maxPage, setMaxPage] = useState(0);
  useEffect(() => {
    const fetchLogin = async () => {
      // 已登录状态
      let res = await Require.get(GET_USER);
      if (res.data.data.code === 1) {
        //  登录成功
        return;
      }
      // 尝试无密码登录
      res = await Require.post(LOGIN);
      if (res.data.data.code === 1) {
        //  登录成功
        return;
      }
    };
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
            className="text-6xl duration-500 text-center text-gray-600 my-2 hover:text-purple-600 
						transform transition-all md:ml-14 capitalize tracking-wider font-Playball"
          >
            Nebular
          </div>
          {/* 座右铭 */}
          <div className="text-gray-400 text-sm font-kaiti -mt-4 md:ml-14">
            {randomMotto()}
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
            return <div className=""></div>;
          })}
        {/* 清除浮动带来的大卡片高度不够情况，顺便做一个翻页buttom */}
        <div className="clear-both float-right m-7">
          <PageNav maxPage={maxPage} nowPage={pageNum} type={"articleList"} />
        </div>
        {/*  */}
        <div className="clear-both"></div>
      </div>
    </>
  );
}
