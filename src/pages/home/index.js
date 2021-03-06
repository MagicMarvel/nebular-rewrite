import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import BriefIntroduction from "../../components/BriefIntroduction";
import Login from "../../components/Login";
import Regist from "../../components/Regist";
import Contact from "../../components/Contact";
import { ToastContext } from "../../App";
import Require from "../../utils/Require";
import { GET_USER, LOGIN, getUsrPhoto } from "../../utils/pathMap";
import axios from "axios";

// 为了复用逻辑，把按钮的样式和逻辑全部提取出来了
const LiBtm = (props) => {
    return (
        <Link
            to={props.linkTo}
            className="h-12 w-full border rounded-sm flex items-center justify-center 
      hover:bg-white hover:bg-opacity-5 transition-all duration-300"
            onClick={() => {
                props.handleClick(false);
                props.handleChoiceChange(props.choice);
            }}
        >
            <p className="text-white text-center text-sm px-7 inline-block w-full sm:w-32">
                {props.children}
            </p>
        </Link>
    );
};

// 逻辑有点乱，要改
export default function Index(props) {
    // 记录是否渲染Main，这个变量是为了制作启动网页的时候的淡入效果
    const [showMain, setShowMain] = useState(false);
    useEffect(() => {
        setShowMain(true);
    }, [showMain]);

    const toastController = useContext(ToastContext);

    const [mainDisplay, setMainDisplay] = useState(true);
    const [choice, setChoice] = useState("");
    const { routerChoice } = useParams();
    const [photoBlob, setPhotoBlob] = useState(undefined);
    const [usrInformation, setUsrInformation] = useState(undefined);

    useEffect(() => {
        if (routerChoice === "login") {
            setChoice("login");
            setMainDisplay(false);
        }
        if (routerChoice === "regist") {
            setChoice("regist");
            setMainDisplay(false);
        }
        if (routerChoice === "index") {
            setChoice("");
            setMainDisplay(true);
        }
    }, [routerChoice]);

    // 尝试登录
    useEffect(() => {
        const fetchLogin = async () => {
            // 判断是否是已登录状态
            try {
                const res = await Require.get(GET_USER);
                if (res.data.code === 1) {
                    //  登录成功
                    console.log("session登录成功");
                    if (mainDisplay === true)
                        toastController({
                            mes: `欢迎回来 ${res.data.data.username}`,
                            timeout: 1500,
                        });
                    setUsrInformation(res.data.data);
                } else {
                    // 这里不应该能进来，因为获取不到当前用户应该是403,403axios报异常
                }
            } catch (e) {
                // 尝试无密码登录
                const res = await Require.post(LOGIN);
                if (res.data.code === 1) {
                    //  登录成功
                    console.log("无密码登录成功");
                    const res = await Require.get(GET_USER);
                    setUsrInformation(res.data.data);
                    if (mainDisplay === true)
                        toastController({
                            mes: `欢迎回来 ${res.data.data.username}`,
                            timeout: 1500,
                        });
                } else {
                }
            }
        };
        fetchLogin();
    }, [toastController, mainDisplay]);

    // 获取头像
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    getUsrPhoto(usrInformation.username),
                    {
                        responseType: "blob",
                    }
                );
                setPhotoBlob(URL.createObjectURL(res.data));
            } catch (e) {
                // 没有图片的话会跳转到这里，跳转至此不需要有额外的
            }
        };
        if (usrInformation?.username !== undefined) fetchData();
    }, [usrInformation?.username]);

    return (
        <div>
            {/* 小女孩吉他背景图片 */}
            <div
                id="homeBackGround"
                className="bg-guitar bg-cover bg-center h-screen w-full"
            >
                {/* 背景图片上面的蒙层 */}
                <div className="bg-gray-900 bg-opacity-80 h-screen">
                    {/* 正式内容 */}
                    <SwitchTransition>
                        <CSSTransition
                            key={mainDisplay === true ? "display" : "indisplay"}
                            classNames="FadeInOut"
                            timeout={200}
                        >
                            {/* 如果需要显示main，则显示，否则显示按了四个按钮的界面，这之间的切换通过react-transition-group做 */}
                            {mainDisplay === true ? (
                                <div className="flex flex-col justify-between items-center h-full">
                                    <div className="text-6xl text-white"></div>
                                    {/* 用于撑flex最上部 */}
                                    <div></div>
                                    {/* container */}
                                    <div className="flex flex-col items-center">
                                        {/* logo */}
                                        <div
                                            className="w-16 h-16 sm:w-20 sm:h-20 border rounded-full hover:-rotate-6
                    transition-all transform duration-300"
                                        >
                                            {/* 有头像显示头像 */}
                                            {usrInformation !== undefined &&
                                            photoBlob !== undefined ? (
                                                <Link
                                                    to="/personalPage"
                                                    className="cursor-pointer"
                                                >
                                                    <img
                                                        className="rounded-full"
                                                        src={photoBlob}
                                                        alt="头像"
                                                    />
                                                </Link>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="h-14 border-l"></div>
                                        {/* 用户信息，Main部分 */}
                                        <div
                                            className={`border-b border-t overflow-hidden box-border transition-all duration-1000 ${
                                                showMain === false
                                                    ? "h-0 p-0"
                                                    : "h-auto p-10"
                                            }`}
                                        >
                                            {usrInformation === undefined ? (
                                                <div>
                                                    <div className="text-4xl font-semibold text-white leading-snug mb-2 text-center tracking-wider">
                                                        Nebular
                                                    </div>
                                                    <div className="text-sm text-white text-center tracking-wide">
                                                        致一路热爱的你
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-gray-100 text-xl">
                                                    <span className="">
                                                        用户：
                                                    </span>
                                                    <code className="bg-gray-900 bg-opacity-60 px-3 rounded">
                                                        {
                                                            usrInformation.username
                                                        }
                                                    </code>
                                                    <span className="">
                                                        ，欢迎回来
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {/* 按钮 */}
                                        <div className="h-14 relative border-l"></div>
                                        <div className="max-w-min ">
                                            {/* 判断是否登录了，登陆了给一套按钮，没登陆给另一套 */}
                                            {usrInformation === undefined ? (
                                                <div className="flex flex-col items-center max-w-full min-w-min w-40 sm:flex-row">
                                                    <LiBtm
                                                        linkTo="#"
                                                        choice="brief-introduction"
                                                        handleChoiceChange={
                                                            setChoice
                                                        }
                                                        handleClick={
                                                            setMainDisplay
                                                        }
                                                    >
                                                        简介
                                                    </LiBtm>
                                                    <LiBtm
                                                        linkTo="/home/login"
                                                        choice="login"
                                                        handleChoiceChange={
                                                            setChoice
                                                        }
                                                        handleClick={
                                                            setMainDisplay
                                                        }
                                                    >
                                                        登录
                                                    </LiBtm>
                                                    <LiBtm
                                                        linkTo="/home/regist"
                                                        choice="regist"
                                                        handleChoiceChange={
                                                            setChoice
                                                        }
                                                        handleClick={
                                                            setMainDisplay
                                                        }
                                                    >
                                                        注册
                                                    </LiBtm>
                                                    <a
                                                        className="h-12 w-full border rounded-sm flex items-center justify-center 
                          hover:bg-white hover:bg-opacity-5 transition-all duration-300"
                                                        href="http://119.91.84.186/"
                                                    >
                                                        <p className="text-white text-center text-sm px-7 inline-block w-full sm:w-32">
                                                            SOJ
                                                        </p>
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center max-w-full min-w-min w-40 sm:flex-row">
                                                    <Link
                                                        className="h-12 w-full border rounded-sm flex items-center justify-center 
                          hover:bg-white hover:bg-opacity-5 transition-all duration-300"
                                                        to="/articleList/1"
                                                    >
                                                        <p className="text-white text-center text-sm px-7 inline-block w-full sm:w-32">
                                                            文章
                                                        </p>
                                                    </Link>
                                                    <Link
                                                        className="h-12 w-full border rounded-sm flex items-center justify-center 
                          hover:bg-white hover:bg-opacity-5 transition-all duration-300"
                                                        to="/QAList/1"
                                                    >
                                                        <p className="text-white text-center text-sm px-7 inline-block w-full sm:w-32">
                                                            问答
                                                        </p>
                                                    </Link>
                                                    <Link
                                                        className="h-12 w-full border rounded-sm flex items-center justify-center 
                          hover:bg-white hover:bg-opacity-5 transition-all duration-300"
                                                        to="/personalPage"
                                                    >
                                                        <p className="text-white text-center text-sm px-7 inline-block w-full sm:w-32">
                                                            个人
                                                        </p>
                                                    </Link>
                                                    <LiBtm
                                                        linkTo="#"
                                                        choice="contact"
                                                        handleChoiceChange={
                                                            setChoice
                                                        }
                                                        handleClick={
                                                            setMainDisplay
                                                        }
                                                    >
                                                        联系
                                                    </LiBtm>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* footer */}
                                    <div className="text-gray-500 md:text-gray-400 text-xs  py-2 flex flex-col md:flex-row">
                                        <a
                                            className="mx-2"
                                            href="https://beian.miit.gov.cn/"
                                        >
                                            粤ICP备2021079778号
                                        </a>
                                        <a
                                            className="mx-2"
                                            href="https://beian.miit.gov.cn/"
                                        >
                                            粤ICP备2021079778号-1
                                        </a>
                                        <span className="mx-2">
                                            @CopyRight STU-ACM{" "}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                // 显示注册、登录、简介等信息
                                <div className="h-full">
                                    {choice === "brief-introduction" && (
                                        <BriefIntroduction
                                            handleClose={setMainDisplay}
                                        />
                                    )}
                                    {choice === "login" && (
                                        <Login handleClose={setMainDisplay} />
                                    )}
                                    {choice === "regist" && (
                                        <Regist handleClose={setMainDisplay} />
                                    )}
                                    {choice === "contact" && (
                                        <Contact handleClose={setMainDisplay} />
                                    )}
                                </div>
                            )}
                        </CSSTransition>
                    </SwitchTransition>
                </div>
            </div>
        </div>
    );
}
