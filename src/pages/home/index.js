import React from "react";
import styled from "styled-components";
import Require from "../../utils/Require";
import { GET_ARTICLE_BY_ID } from "../../utils/pathMap";
import ShowArticleBriefInformation from "../../components/ShowArticleBriefInformation";

class index extends React.Component {
  handleClick = async () => {
    const res = await Require.get(GET_ARTICLE_BY_ID, {
      params: {
        articleId: 57,
      },
    });
    console.log(res);
  };
  render() {
    return (
      <>
        {/* 最上面的首屏 */}
        <div className="bg-gray-900 w-full h-screen bg-opacity-90 relative">
          {/* 切换深色浅色模式的开关 */}
          <div className="absolute bg-black h-10 w-10 top-6 right-6"></div>
          {/* 首屏上居中的文字的盒子 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className=" text-5xl font-mono text-center">Nebular</div>
          </div>
          {/* 下箭头 */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce ">
            <svg
              t="1630765321110"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2285"
              width="48"
              height="48"
            >
              <path
                d="M979.0208 301.99808l-47.104-47.04768-419.98848 419.9424-419.89632-419.9424-47.0528 47.0528 419.89632 419.93728v0.00512l47.09888 47.104 47.04256-47.0528z"
                p-id="2286"
              ></path>
            </svg>
          </div>
        </div>

        {/* 近期新文章和writer排行 */}
        <div className="p-4">
          {/* 新文章 */}
          <div className="float-left w-2/3 break-words h-72">
            <div className="text-xl">近期新文</div>
            <ShowRecentArticle />
          </div>
          {/* writer排行 */}
          <div className="h-72 float-right w-1/3">
            <div className="text-xl">Top Writer</div>
          </div>
        </div>
        {/* 文章页脚 */}
        <div className="clear-both bg-gray-900 text-center h-32 text-3xl text-white leading-8">
          MagicMarvel
        </div>
      </>
    );
  }
}
export default index;
