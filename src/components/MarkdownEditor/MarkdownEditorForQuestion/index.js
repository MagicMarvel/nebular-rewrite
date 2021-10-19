import React, { useState, useRef, useContext } from "react";
import MarkdownParse from "../../MarkdownParse";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Require from "../../../utils/Require";
import { UPLOAD_IMAGE, POST_NEW_QUESTION } from "../../../utils/pathMap";
import { ToastContext } from "../../../App";

// TODO:添加修改文章的功能
/**
 *
 * @param {object} props 需要传入组件标题title，传入关闭该组件要用的函数close
 * @returns none
 */
export default function Index(props) {
  const [markdownInput, setMarkdownInput] = useState(props.markdownInput || "");
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [imageFileName, setImageFileName] = useState("");
  const markdownInputArea = useRef(null);
  const [title, setTitle] = useState(props.inputTitle || "");
  const toastController = useContext(ToastContext);

  const handleInput = (event) => {
    setMarkdownInput(event.target.value);
  };

  // 处理图片上传的点击事件
  const handlePhotoUpload = async (event) => {
    // 如果图片上传成功
    if (event.target.files.length !== 0) {
      const file = event.target.files[0];
      setImageFileName(file.name || "");

      // 拼接成form放入请求参数中
      let param = new FormData();
      param.append("file", file, file.name);
      const res = await Require.post(UPLOAD_IMAGE, param, undefined);
      if (res.data.code === 1) {
        // 获取光标初始索引
        let insert = markdownInputArea.current.selectionStart;

        // 拼接字符串的形式来得到需要的内容
        setMarkdownInput(
          markdownInputArea.current.value.substr(0, insert) +
            `![](${res.data.data})` +
            markdownInputArea.current.value.substr(insert)
        );
        toastController({ mes: "图片上传成功", timeout: 500 });
      } else toastController({ mes: "图片上传失败", timeout: 2000 });
    } else {
      toastController({ mes: "图片上传失败", timeout: 2000 });
    }
  };

  // 处理提问上传的点击事件
  const handleSubmit = () => {
    const fetchData = async () => {
      const res = await Require.post(POST_NEW_QUESTION, {
        title: title,
        content: markdownInput,
      });
      if (res.data.code === 1) {
        toastController({ timeout: 2000, mes: "问题发布成功，请刷新" });
        setTimeout(() => {
          props.close();
        }, 2000);
      } else
        toastController({
          timeout: 3000,
          mes: "问题发布失败，若反复遇到该问题，请联系管理员",
        });
    };
    if (markdownInput.length <= 5)
      toastController({ timeout: 1500, mes: "内容太短啦，至少5个字符哦" });
    else fetchData();
  };

  return (
    <div className="absolute z-40 top-0 left-0 min-w-full max-w-full min-h-screen text-gray-700 py-6">
      <div className=" w-11/12 mx-auto rounded-2xl py-3 bg-white shadow-2xl transition-all">
        {/* 组件标题和关闭按钮 */}
        <div className="flex justify-between border-b m-3 px-2 p-1 text-xl font-medium font-sans items-center">
          <div className="">提问发布页面</div>
          <svg
            className="cursor-pointer"
            onClick={() => {
              props.close(false);
            }}
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
              fill="#000000"
            ></path>
          </svg>
        </div>

        {/* 文章标题输入框+图片上传按钮+切换渲染按钮 */}
        <div className="flex justify-between mx-5 items-center flex-wrap content-center ">
          {/* 文章标题框 */}
          <div className="flex justify-between ">
            <label className="mx-2 text-sm md:mx-4 md:text-base ">
              问题标题:
            </label>
            <input
              className="border w-60 md:w-96 rounded flex-grow focus:border-blue-300 focus:ring-1 outline-none transition-all duration-200"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            ></input>
          </div>
          {/* 图片上传按钮 */}
          <div className="w-44 mx-2 pl-1 relative">
            {/* 图片上传的SVG */}
            <svg
              className="inline"
              t="1634129097563"
              viewBox="0 0 1029 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2419"
              width="32"
              height="32"
            >
              <path
                d="M661.23 1003.042H119.672c-64.034 0-116.053-51.883-116.053-115.712V115.917C3.618 52.224 55.638 0.068 119.671 0.068H893.27c63.898 0 115.985 52.02 115.985 115.849v539.99c0 21.23-17.34 38.775-38.707 38.775s-38.912-17.34-38.912-38.776v-539.99c0-21.23-17.34-38.638-38.57-38.638H119.67c-21.299 0-38.912 17.408-38.912 38.639v771.14c0 21.231 17.613 38.639 38.912 38.639h541.492c21.162 0 38.707 17.203 38.707 38.639 0.068 21.3-17.545 38.707-38.64 38.707z"
                fill="#707070"
                p-id="2420"
              ></path>
              <path
                d="M42.325 771.755c-9.762 0-19.729-4.028-27.238-11.606-14.95-14.95-14.95-39.458 0-54.408l192.785-192.034c35.157-35.158 89.156-44.169 133.803-21.777L551.39 596.65c14.814 7.578 32.768 4.643 44.373-7.167l347.614-346.317c14.95-15.019 39.458-15.019 54.682 0 15.223 14.882 15.087 39.39 0 54.545l-347.75 346.317c-35.09 35.089-88.816 43.759-133.667 21.367L306.86 561.084c-14.95-7.578-32.7-4.506-44.374 7.168L69.7 760.012c-7.51 7.578-17.34 11.743-27.375 11.743zM351.71 385.775c-63.898 0-116.053-51.746-116.053-115.712 0-63.898 51.882-115.712 116.053-115.712 63.76 0 116.053 51.883 116.053 115.712 0 63.898-52.36 115.712-116.053 115.712z m0-154.146c-21.163 0-38.776 17.271-38.776 38.502 0 21.368 17.477 38.64 38.776 38.64 21.163 0 38.639-17.272 38.639-38.64 0-21.23-17.34-38.502-38.64-38.502zM834.833 1024c-21.367 0-38.844-17.203-38.844-38.775V753.869c0-21.095 17.204-38.64 38.844-38.64 21.163 0 38.776 17.34 38.776 38.64v231.356c-0.069 21.572-17.545 38.775-38.776 38.775z"
                fill="#707070"
                p-id="2421"
              ></path>
              <path
                d="M989.389 868.284c-9.49 0-18.978-3.345-26.76-10.377l-127.864-120.15-128.478 120.15c-15.36 14.404-39.8 13.858-54.409-1.57-14.677-15.633-13.994-39.868 1.707-54.682L788.89 674.611c11.127-13.721 27.58-21.436 45.533-21.436 17.818 0 34.27 7.988 45.261 21.436l135.441 127.044c15.702 14.814 16.52 38.912 1.775 54.682-6.758 7.782-17.066 11.947-27.511 11.947z"
                fill="#707070"
                p-id="2422"
              ></path>
            </svg>
            <div className="inline-block overflow-visible w-32 text-sm">
              {imageFileName}
            </div>
            <input
              type="file"
              className="absolute top-0 left-0 appearance-none border-none w-44 text-sm opacity-0"
              onChange={handlePhotoUpload}
            />
          </div>
          {/* 切换按钮 */}
          <div
            className="flex items-center m-2"
            onClick={() => {
              setShowMarkdown(() => {
                return !showMarkdown;
              });
            }}
          >
            {/* 写作图标 */}
            <svg
              t="1634050227711"
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2113"
              width="32"
              height="32"
            >
              <path
                d="M541.866667 238.933333l243.2 243.2L413.866667 853.333333H170.666667v-243.2l371.2-371.2z m0 59.733334L213.333333 631.466667V810.666667h179.2l328.533334-328.533334L541.866667 298.666667z m72.533333-128L853.333333 413.866667l-29.866666 29.866666-243.2-243.2 34.133333-29.866666z"
                fill="#2e7593"
                p-id="2114"
              ></path>
            </svg>
            <button
              role="switch"
              aria-checked="false"
              className="inline-flex items-center p-0.5 rounded-full w-14 h-7
         focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white
          focus-visible:ring-gray-500 focus:outline-none transition-all"
              style={{
                backgroundColor: `${
                  showMarkdown === false ? "rgb(17, 24, 39)" : "#5349a5"
                }`,
              }}
            >
              <span
                className={`flex-grow-0 flex-shrink-0 ${
                  showMarkdown === true ? "flex-grow" : ""
                } transition-all`}
              ></span>
              <span className="bg-white rounded-full w-6 h-6"></span>
            </button>
            {/* 渲染图标 */}
            <svg
              t="1634050284006"
              className=""
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3497"
              width="32"
              height="32"
            >
              <path
                d="M778.24 849.92v-138.30144a20.48 20.48 0 1 1 40.96 0V870.4a20.48 20.48 0 0 1-20.48 20.48H225.28a20.48 20.48 0 0 1-20.48-20.48v-716.8a20.48 20.48 0 0 1 20.48-20.48h573.44a20.48 20.48 0 0 1 20.48 20.48v366.12096a20.48 20.48 0 0 1-40.96 0V174.08H245.76v675.84h532.48zM348.16 368.64a20.48 20.48 0 0 1 0-40.96h286.72a20.48 20.48 0 0 1 0 40.96H348.16z m0 143.36a20.48 20.48 0 0 1 0-40.96h286.72a20.48 20.48 0 0 1 0 40.96H348.16z m0 153.6a20.48 20.48 0 0 1 0-40.96h163.84a20.48 20.48 0 0 1 0 40.96h-163.84z m456.58112-86.28224a20.48 20.48 0 1 1 26.43968 31.27296l-159.06816 134.49216a20.48 20.48 0 0 1-28.99968-2.58048l-71.22944-86.09792a20.48 20.48 0 0 1 31.5392-26.112l58.0608 70.144 143.2576-121.11872z"
                fill="#2cbfac"
                p-id="3498"
              ></path>
            </svg>
          </div>
        </div>
        <SwitchTransition>
          <CSSTransition
            key={showMarkdown}
            classNames="SlideX"
            timeout={100}
            type="in-out"
          >
            <div className="p-1.5">
              {/* 控制显示输入区域还是渲染区域 */}
              {showMarkdown === false ? (
                <div className="relative block max-w-full ">
                  {/* 这个div是占位但隐藏的，用于撑大父dpre */}
                  <p
                    className=" p-3 break-all max-w-full whitespace-pre-wrap	"
                    style={{ minHeight: "75vh", width: "1000px" }}
                  >
                    {markdownInput}
                  </p>
                  {/* 绝对定位+h-full实现自动增长的text area */}
                  <textarea
                    ref={markdownInputArea}
                    className="absolute top-0 left-0 w-full h-full overflow-hidden border border-gray-400 p-3 inline-block break-all  
                       text-gray-800 rounded transition-all duration-200 outline-none focus:border-blue-300 focus:ring-1 resize-none"
                    minLength="30"
                    type="text"
                    placeholder="可以输入markdown代码哦~"
                    value={markdownInput}
                    onChange={handleInput}
                  ></textarea>
                </div>
              ) : (
                <div className="">
                  <div
                    className=" border-blue-300 rounded bg-sky bg-center bg-fixed"
                    style={{ minHeight: "75vh" }}
                  >
                    <div
                      className="bg-white h-full bg-opacity-80 p-1 select-none"
                      style={{ minHeight: "75vh" }}
                    >
                      <MarkdownParse
                        markdown={
                          markdownInput === "" ? "还没有输入呢" : markdownInput
                        }
                      />
                    </div>
                  </div>
                  {/* 提交按钮 */}
                  <div className="flex justify-end items-center text-gray-300">
                    <button
                      className="cursor-pointer border border-solid px-4 py-1 m-3 rounded text-base md:text-lg bg-blue-100
                      bg-opacity-70 shadow text-gray-400 hover:bg-blue-200 hover:text-purple-600 hover:shadow-md
                       transform transition-all font-medium "
                      title="你的最终效果将会和目前看到的效果相同"
                      onClick={handleSubmit}
                    >
                      提交
                    </button>
                  </div>
                </div>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}
