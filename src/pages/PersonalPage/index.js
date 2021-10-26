import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";
import { ToastContext } from "../../App";
import BackgroundCard from "../../components/BackgroundCard";
import MarkdownEditorForArticle from "../../components/MarkdownEditor/MarkdownEditorForArticle";
import MarkdownEditorForQuestion from "../../components/MarkdownEditor/MarkdownEditorForQuestion";
import PersonalInformation from "../../components/PersonalInformation";
import PersonalLogout from "../../components/PersonalLogout";
import PersonalShowQA from "../../components/PersonalShowQA";
import {
    DELETE_ARTICLEL_BY_ID,
    GET_ARTICLE_BY_CURRENCY_USER,
    GET_USER,
    LOGIN,
} from "../../utils/pathMap";
import Require from "../../utils/Require";
import MarkdownEditorForArticleModify from "../../components/MarkdownEditor/MarkdownEditorForArticleModify";

const SideBar = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: ${(props) => {
        return props.showSideBar === false ? "0" : "10rem";
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

function ArticleItem(props) {
    const [mouseOver, setMouseOver] = useState(false);
    const toastController = useContext(ToastContext);
    const handleDeleteArticle = async () => {
        const res = await Require.post(DELETE_ARTICLEL_BY_ID, {
            articleId: props.articleId,
        });
        if (res.data.code === 1) {
            toastController({ mes: "删除成功", timeout: 1500 });
            props.setReRender();
        } else
            toastController({
                mes: "删除失败，若你反复遇到该问题，请联系管理员",
                timeout: 3000,
            });
    };
    return (
        <div
            className="w-full h-52 border-solid border border-blue-200 my-4 rounded-lg 
         flex flex-col items-center justify-center transition-all duration-150
        bg-white bg-opacity-50 text-2xl font-serif hover:shadow-lg group"
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            <Link
                className="group-hover:-translate-y-2 group-hover:tracking-widest transform
         transition-all duration-150 tracking-wide select-none font-kaiti text-base lg:text-2xl text-center"
                to={`/article/${props.articleId}`}
            >
                {props.title}
            </Link>
            <CSSTransition classNames="Slide" timeout={100} in={mouseOver}>
                <div className="text-sm flex felx-row justify-center font-kaiti">
                    <div
                        className="mx-5 text-red-400 hover:text-blue-600 hover:text-opacity-70 transition-all duration-200 cursor-pointer 
          select-none"
                        onClick={() => {
                            props.setModifyArticleId(props.articleId);
                            props.setShowModifyEditor(true);
                        }}
                    >
                        修改
                    </div>
                    <div
                        className="mx-5 text-red-400 hover:text-blue-600 hover:text-opacity-70 transition-all duration-200 cursor-pointer
          select-none"
                        onClick={handleDeleteArticle}
                    >
                        删除
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

function ArticleList(props) {
    const [persionalArticleList, setPersionalArticleList] = useState(undefined);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(undefined);
    const pageRef = useRef(null);
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const res = await Require.get(GET_ARTICLE_BY_CURRENCY_USER, {
                params: {
                    page: page,
                    size: 4,
                },
            });
            if (res.data.code === 1) {
                setPersionalArticleList(res.data.data.detail);
                setMaxPage(res.data.data.size);
                pageRef.current.value = page;
            } else {
            }
        };
        if (reRender === false) fetch();
    }, [page, reRender]);

    // 接受上层组件的重新渲染命令，然后放入这层的state
    useEffect(() => {
        setReRender(props.reRender);
    }, [props.reRender]);

    return (
        <div className="min-h-screen flex-grow ml-8">
            {/* 添加文章 */}
            <div
                className="w-full h-52 border-dashed border-2 my-4 flex justify-center items-center group
       hover:bg-white hover:bg-opacity-50 hover:shadow-lg transition-all duration-200 rounded-lg cursor-pointer"
                onClick={props.showEditor}
            >
                <svg
                    t="1633573403433"
                    className="fill-current text-gray-600 group-hover:animate-pulse"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1957"
                    width="200"
                    height="200"
                >
                    <path
                        d="M512 512V170.666667h42.666667v341.333333h341.333333v42.666667h-341.333333v341.333333h-42.666667v-341.333333H170.666667v-42.666667h341.333333z"
                        p-id="1958"
                    ></path>
                </svg>
            </div>
            {persionalArticleList !== undefined && (
                <div className="">
                    {/* 列表渲染 */}
                    {persionalArticleList.map((item) => {
                        return (
                            <div key={item.articleId}>
                                <ArticleItem
                                    setModifyArticleId={
                                        props.setModifyArticleId
                                    }
                                    setShowModifyEditor={
                                        props.setShowModifyEditor
                                    }
                                    setReRender={() => {
                                        setReRender(true);
                                        setTimeout(() => {
                                            setReRender(false);
                                        }, 500);
                                    }}
                                    {...item}
                                />
                            </div>
                        );
                    })}
                    {/* 翻页按钮 */}
                    <div className="flex flex-row justify-end ">
                        {/* 上一页 */}
                        <div
                            className="border border-gray-600 w-8 h-6 mx-1 flex justify-center items-center rounded cursor-pointer
              bg-white bg-opacity-70 hover:shadow-xl hover:bg-blue-300 select-none 
              transition-all duration-150"
                            onClick={() => {
                                if (page - 1 >= 1)
                                    setPage(() => {
                                        return page - 1;
                                    });
                            }}
                        >
                            <div className="">{"<"}</div>
                        </div>
                        {/* 当前页 */}
                        <input
                            ref={pageRef}
                            className=" bg-opacity-0 w-6 h-6 flex justify-center items-center text-center"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    if (e.target.value <= maxPage)
                                        setPage(e.target.value);
                                }
                            }}
                        />
                        {/* 最大页 */}
                        <div className="  w-6 h-6  flex justify-center items-center">
                            /{maxPage}
                        </div>
                        {/* 下一页 */}
                        <div
                            className="border border-gray-600 w-8 h-6 mx-1 flex justify-center items-center rounded 
              cursor-pointer bg-white bg-opacity-70 hover:shadow-xl hover:bg-blue-300 select-none 
              transition-all duration-150"
                            onClick={() => {
                                if (page + 1 <= maxPage)
                                    setPage(() => {
                                        return page + 1;
                                    });
                            }}
                        >
                            <div className="">{">"}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Index(props) {
    const history = useHistory();
    const [articleReRender, setArticleReRender] = useState(false);
    const [usrInformation, setUsrInformation] = useState(undefined);
    const [showSideBar, setShowSideBar] = useState(false);
    const [articleId, setArticleId] = useState(undefined);
    const [sideBarChoice, setSideBarChoice] = useState("article");
    const [showMarkdownEditor, setShowMarkdownEditor] = useState(false);
    const toastController = useContext(ToastContext);
    const [QAReRender, setQARerender] = useState(false);
    const [showMarkdownEditorForQa, setShowMarkdownEditorForQa] =
        useState(false);
    const [showMarkdownModifyEditor, setShowMarkdownModifyEditor] =
        useState(false);

    // 检查是否登录
    useEffect(() => {
        const fetchLogin = async () => {
            // 判断是否是已登录状态
            try {
                const res = await Require.get(GET_USER);
                if (res.data.code === 1) {
                    //  登录成功
                    setUsrInformation(res.data.data);
                } else {
                    // 这里不应该能进来，因为获取不到当前用户应该是403,403axios报异常
                }
            } catch (e) {
                // 尝试无密码登录
                const res = await Require.post(LOGIN);
                if (res.data.code === 1) {
                    //  登录成功
                    const res = await Require.get(GET_USER);
                    setUsrInformation(res.data.data);
                } else {
                    toastController({
                        mes: "您还没有登录，一秒后跳转至登录界面",
                        timeout: 1000,
                    });
                    setTimeout(() => {
                        history.push("/home/login");
                    }, 1000);
                }
            }
        };
        fetchLogin();
    }, [history, toastController]);

    return (
        <>
            {/* 背景 */}
            <div className="bg-sky h-screen w-screen bg-center fixed inset-0 -z-10" />
            <CSSTransition
                in={showMarkdownEditor === true ? true : false}
                classNames="FadeInOut"
                timeout={200}
                unmountOnExit
            >
                <MarkdownEditorForArticle
                    close={(choice) => {
                        setShowMarkdownEditor(choice);
                        setArticleReRender(true);
                        setTimeout(() => {
                            setArticleReRender(false);
                        }, 500);
                    }}
                />
            </CSSTransition>

            <CSSTransition
                in={showMarkdownModifyEditor === true ? true : false}
                classNames="FadeInOut"
                timeout={200}
                unmountOnExit
            >
                <MarkdownEditorForArticleModify
                    close={(choice) => {
                        setShowMarkdownModifyEditor(choice);
                        // 通知组件重新渲染
                        setArticleReRender(true);
                        setTimeout(() => {
                            setArticleReRender(false);
                        }, 500);
                    }}
                    articleId={articleId}
                />
            </CSSTransition>

            <CSSTransition
                in={showMarkdownEditorForQa}
                classNames="FadeInOut"
                timeout={200}
                unmountOnExit
            >
                <MarkdownEditorForQuestion
                    close={() => {
                        setShowMarkdownEditorForQa(false);
                        setQARerender(true);
                        setTimeout(() => {
                            setQARerender(false);
                        }, 500);
                    }}
                />
            </CSSTransition>

            <BackgroundCard>
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
                                fill="#504186"
                            ></path>
                        </svg>
                    </div>
                </div>
                {/* 侧边栏，手机端 */}
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
                    {/* 侧边栏\桌面版侧边栏（sticky）*/}
                    <SideBar
                        showSideBar={showSideBar}
                        className=" bg-opacity-50 ml-1 hidden lg:sticky top-16 h-screen 
            lg:flex flex-col  justify-around"
                    >
                        <div></div>
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
                        <CSSTransition
                            key={sideBarChoice}
                            classNames="Slide"
                            timeout={200}
                        >
                            <div className="w-full">
                                {/* 渲染article部分 */}
                                {sideBarChoice === "article" && (
                                    <ArticleList
                                        setModifyArticleId={setArticleId}
                                        // 传递是否显示修改文章编辑器的函数
                                        setShowModifyEditor={
                                            setShowMarkdownModifyEditor
                                        }
                                        reRender={articleReRender}
                                        // 传递是否显示发布文章编辑器的函数
                                        showEditor={() => {
                                            setShowMarkdownEditor(true);
                                        }}
                                    />
                                )}
                                {sideBarChoice === "QA" && (
                                    <PersonalShowQA
                                        reRender={QAReRender}
                                        showEditorForQA={() => {
                                            setShowMarkdownEditorForQa(true);
                                        }}
                                    />
                                )}
                                {sideBarChoice === "logout" && (
                                    <PersonalLogout />
                                )}
                                {sideBarChoice === "information" && (
                                    <PersonalInformation
                                        usrInformation={usrInformation}
                                    />
                                )}
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                </div>
            </BackgroundCard>
        </>
    );
}
