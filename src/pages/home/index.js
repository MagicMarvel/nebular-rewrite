import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LiBtm = (props) => {
  return (
    <Link
      to={`${props.linkTo}`}
      className="h-12 w-full border rounded-sm flex items-center justify-center 
      hover:bg-white hover:bg-opacity-5 transition-all duration-300"
      onClick={() => props.handleClick(false)}
    >
      <p className="text-white text-center text-sm px-7 inline-block w-full sm:w-32">
        {props.children}
      </p>
    </Link>
  );
};

export default function Index(props) {
  // 记录是否渲染Main，这个变量是为了制作启动网页的时候的淡入效果
  const [showMain, setshowMain] = useState(false);
  const [mainDisplay, setMainDisplay] = useState(true);
  useEffect(() => {
    setshowMain(true);
  }, [showMain]);

  // 窗口过大的时候通过设置html的fontsize调整页面整体缩放
  useEffect(() => {
    if (
      parseInt(
        window.getComputedStyle(document.getElementById("homeBackGround"), null)
          .width
      ) > 1600
    ) {
      document.getElementsByTagName("html")[0].style.fontSize = "20px";
    }
  });
  return (
    <>
      {/* 小女孩吉他背景图片 */}
      <div
        id="homeBackGround"
        className="bg-guitar bg-cover bg-center h-screen w-full"
      >
        {/* 背景图片上面的蒙层 */}
        <div className="bg-gray-900 bg-opacity-80 h-screen p-3">
          {/* 正式内容 */}
          {mainDisplay === true ? (
            <div className="flex flex-col justify-between items-center h-full">
              {/* 用于撑flex最上部 */}
              <div></div>
              {/* container */}
              <div className="flex flex-col items-center ">
                {/* logo */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border "></div>
                <div className="h-14 border-l"></div>
                {/* 用户信息，Main部分 */}
                <div
                  className={`border-b border-t overflow-hidden box-border transition-all duration-1000 ${
                    showMain === false ? "h-0 p-0" : "h-auto p-10"
                  }`}
                >
                  <div className="text-4xl font-semibold text-white leading-snug mb-2 text-center tracking-wider">
                    Nebular
                  </div>
                  <div className="text-sm text-white text-center tracking-wide">
                    致一路热爱的你
                  </div>
                </div>
                {/* 按钮 */}
                <div className="h-14 relative border-l"></div>
                <div className="max-w-min ">
                  <div className="flex flex-col items-center max-w-full min-w-min w-40 sm:flex-row">
                    <LiBtm linkTo="#" handleClick={setMainDisplay}>
                      简介
                    </LiBtm>
                    <LiBtm linkTo="#" handleClick={setMainDisplay}>
                      登录
                    </LiBtm>
                    <LiBtm linkTo="#" handleClick={setMainDisplay}>
                      注册
                    </LiBtm>
                    <LiBtm linkTo="#" handleClick={setMainDisplay}>
                      联系
                    </LiBtm>
                  </div>
                </div>
              </div>
              {/* footer */}
              <div className="text-white text-xs sm:text-base">
                @2021 MagicMarvel
              </div>
            </div>
          ) : (
            <div>HelloWorld</div>
          )}
        </div>
      </div>
    </>
  );
}
