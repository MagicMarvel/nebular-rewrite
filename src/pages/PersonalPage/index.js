import React, { useEffect, useState } from "react";
import Require from "../../utils/Require";
import { Link } from "react-router-dom";
import { GET_ARTICLE_LIST } from "../../utils/pathMap";
import { useParams } from "react-router-dom";
import randomMotto from "../../utils/randomMotto";
import PageNav from "../../components/PageNav";
import { GET_USER, LOGIN } from "../../utils/pathMap";
import styled from "styled-components";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const SideBar = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: ${(props) => {
    return props.showSideBar === false ? "0" : "14rem";
  }};
  border-left: ${(props) => {
    return props.showSideBar === false
      ? "0px"
      : "1px rgba(101, 86, 161, 0.5) solid";
  }};
  transition: all 0.4s;
`;

const SideBarItem = styled.div`
  margin-left: 1rem;
  overflow: hidden;
  color: rgb(73, 122, 81);
  text-overflow: clip;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  &::before {
    display: ${(props) => (props.show === true ? "block" : "none")};
    content: "";
    opacity: 100%;
    position: absolute;
    left: 0;
    ${(props) => {
      if (props.id === props.choice)
        return "background-color: rgb(92, 172, 106);";
    }}
    transform: translate(-50%, 20%);
    width: 1.1rem;
    height: 1.1rem;
    border: 1px black solid;
    border-radius: 50%;
    transition: all 0.4s;
  }
  &:hover::before {
    background-color: rgb(92, 172, 106);
  }
`;

export default function Index(props) {
  const [articleList, setArticleList] = useState(undefined);
  const [nowPage, setNowPage] = useState(undefined);
  const [pageNum, setPageNum] = useState(undefined);
  const [maxPage, setMaxPage] = useState(0);
  const [usrInformation, setUsrInformation] = useState(undefined);
  const [showSideBar, setShowSideBar] = useState(false);
  const [sideBarChoice, setSideBarChoice] = useState("article");

  // 检查是否登录
  useEffect(() => {
    const fetchLogin = async () => {
      // 判断是否是已登录状态
      try {
        const res = await Require.get(GET_USER);
        console.log(res);
        if (res.data.code === 1) {
          //  登录成功
          console.log("session login success");
          setUsrInformation(res.data.data);
          return;
        } else {
          // 这里不应该能进来，因为获取不到当前用户应该是403
        }
      } catch (e) {
        console.log(e);
        // 尝试无密码登录
        const res = await Require.post(LOGIN);
        if (res.data.code === 1) {
          //  登录成功
          console.log("password login success");
          return;
        } else {
          console.log("password login fail");
        }
      }
    };
    fetchLogin();
  }, []);

  useEffect(() => {
    switch (sideBarChoice) {
      case "article":
        console.log("article");
        break;
      case "QA":
        console.log("QA");
        break;
      case "information":
        console.log("information");
        break;
      case "logout":
        console.log("logout");
        break;
      default:
        console.log("personalPage got a default case，this is a wrong");
    }
  }, [sideBarChoice]);

  return (
    <>
      {/* 背景 */}
      <div className="bg-sky h-screen w-screen bg-center fixed inset-0 -z-10" />
      {/* 白色大卡片 */}
      <div className="relative bg-gray-200 bg-opacity-80 p-10 rounded-3xl md:w-11/12 md:mx-auto md:my-10">
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
        {/* 主体部分 */}
        {/* sticky的选择展示栏，定位用，正方形 */}
        <div className="fixed mt-4 top-0 left-14 lg:left-auto lg:top-4 lg:sticky z-20">
          {/* 圆形，用于hover变色 */}
          <div
            onClick={() => {
              setShowSideBar(() => {
                return !showSideBar;
              });
            }}
            className="inline-block rounded-full p-1 hover:bg-gray-400 transition-all duration-100"
          >
            {/* 更多图标的SVG */}
            <svg
              className="fill-current text-gray-800 lg:text-pink-400"
              t="1633522259949"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2110"
              width="32"
              height="32"
            >
              <path
                d="M138.5 261.4h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5zM887.5 470.4h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5zM887.5 760.4h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5z"
                p-id="2111"
                fill="#bfbfbf"
              ></path>
            </svg>
          </div>
        </div>
        {/* 侧边栏 */}
        <SideBar
          showSideBar={showSideBar}
          className="lg:hidden bg-opacity-50 ml-1 fixed top-0 h-screen z-10
            flex flex-col justify-around"
        >
          <div className=""></div>
          <SideBarItem
            id={"article"}
            choice={sideBarChoice}
            show={showSideBar}
            onClick={() => setSideBarChoice("article")}
          >
            我的文章
          </SideBarItem>
          <SideBarItem
            id={"QA"}
            choice={sideBarChoice}
            show={showSideBar}
            onClick={() => setSideBarChoice("QA")}
          >
            我的提问
          </SideBarItem>
          <SideBarItem
            id={"information"}
            choice={sideBarChoice}
            show={showSideBar}
            onClick={() => setSideBarChoice("information")}
          >
            修改个人信息
          </SideBarItem>
          <SideBarItem
            id={"logout"}
            choice={sideBarChoice}
            show={showSideBar}
            onClick={() => setSideBarChoice("logout")}
          >
            注销
          </SideBarItem>
          <div className=""></div>
        </SideBar>
        <div className="relative flex flex-row justify-between">
          {/* 侧边栏 */}
          <SideBar
            showSideBar={showSideBar}
            className=" bg-opacity-50 ml-1 hidden lg:sticky top-16 h-screen 
            lg:flex flex-col  justify-around"
          >
            <div className=""></div>
            <SideBarItem
              id={"article"}
              choice={sideBarChoice}
              show={showSideBar}
              onClick={() => setSideBarChoice("article")}
            >
              我的文章
            </SideBarItem>
            <SideBarItem
              id={"QA"}
              choice={sideBarChoice}
              show={showSideBar}
              onClick={() => setSideBarChoice("QA")}
            >
              我的提问
            </SideBarItem>
            <SideBarItem
              id={"information"}
              choice={sideBarChoice}
              show={showSideBar}
              onClick={() => setSideBarChoice("information")}
            >
              修改个人信息
            </SideBarItem>
            <SideBarItem
              id={"logout"}
              choice={sideBarChoice}
              show={showSideBar}
              onClick={() => setSideBarChoice("logout")}
            >
              注销
            </SideBarItem>
            <div className=""></div>
          </SideBar>
          {/* 内容 */}
          <SwitchTransition>
            <CSSTransition key={sideBarChoice} classNames="Slide" timeout={200}>
              <div className="bg-red-600 h-screen w-full">
                {/* 右边的主栏 */}
                <div className=""></div>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </>
  );
}
