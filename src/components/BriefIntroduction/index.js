import Card from "../HomePopUpCard";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Container = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ExpandLine = styled.div`
  max-width: ${(props) => (props.expand === true ? "100%" : "0")};
  margin-left: auto;
  margin-right: auto;
`;

export default function BriefIntroduction(props) {
  const [leaderList, setLeaderList] = useState(undefined);

  const [expand, setExpand] = useState(false);

  // 展开动画
  useEffect(() => {
    setTimeout(() => {
      setExpand(true);
    }, 100);
  }, []);

  // 将存好的成员数据一步一步倒入state中
  useEffect(() => {
    const previousLeader = [
      {
        name: "LUEVE",
        label: "16级会长",
        connection: "724818484@qq.com",
        photo: "https://avatars.githubusercontent.com/u/26224427?v=4",
        work: "客户端搬砖，腾讯光子",
        saying: "",
      },
      {
        name: "jpswing",
        label: "16级成员",
        connection: "abzmglqyp@gmail.com",
        photo: "https://avatars.githubusercontent.com/u/41479689?v=4",
        work: "web后端搬砖，ide皮毛，leetcode中国",
        saying: "",
      },
      {
        name: "梁小顺",
        label: "16级成员",
        connection: "qianlanql@qq.com",
        photo: "https://avatars.githubusercontent.com/u/24711906?v=4",
        work: "前端皮毛，iOS皮毛，python bash node.js 三脚本皮毛，字节跳动",
        saying: "",
      },
      {
        name: "Luuukas",
        label: "17级会长",
        connection: "2258332934@qq.com",
        photo: "https://avatars.githubusercontent.com/u/31563351?v=4",
        work: "IOS开发，字节跳动",
        saying: "",
      },
      {
        name: "赵迪",
        label: "18级会长",
        connection: "752654212@qq.com",
        photo: "https://avatars.githubusercontent.com/u/54883978?v=4",
        work: "天美游戏客户端",
        saying: "",
      },

      {
        name: "WalterJ",
        label: "18级成员",
        connection: "walterj726@gmail.com",
        photo: "https://avatars.githubusercontent.com/u/44672740?v=4",
        work: "精通CNN的拼写，留学",
        saying: "",
      },
      {
        name: "MagicMarvel",
        label: "19级成员",
        connection: "magicmarvel@163.com",
        saying: "有哪位好兄弟愿意接手这个网站。。。。",
        photo: "https://avatars.githubusercontent.com/u/68428577?v=4",
        work: "Web前端毛皮都无，Nodejs 毛皮都无",
      },
      {
        name: "Louise",
        label: "19级成员",
        connection: "1052912442@qq.com",
        saying: "",
        photo: "https://z3.ax1x.com/2021/11/30/o1AIqU.md.jpg",
        work: "三维建模皮毛都无、图形学皮毛都无",
      },
    ];
    const clock = setInterval(() => {
      setLeaderList((a) => {
        let renderSize;
        if (a === undefined) renderSize = 1;
        else
          renderSize =
            a.length + 1 <= previousLeader.length
              ? a.length + 1
              : previousLeader.length;
        return previousLeader.slice(0, renderSize);
      });
    }, 150);
    return () => clearInterval(clock);
  }, []);

  return (
    <Card title="简介" handleClose={props.handleClose}>
      汕头大学-ACM-博客问答站
      <div
        className="md:mx-4 border-white transition-all duration-1000 my-5"
        style={{ height: "30rem" }}
      >
        {/* 成员列表上下的线 */}
        <ExpandLine
          className="border-t-2 transition-all duration-500 my-1"
          expand={expand}
        ></ExpandLine>
        <Container
          className="h-96 overflow-y-scroll overflow-x-scroll transition-all duration-75 md:px-4"
          style={{ height: "30rem" }}
        >
          <TransitionGroup>
            {leaderList !== undefined &&
              leaderList.map((item) => (
                <CSSTransition
                  key={item.name}
                  timeout={200}
                  classNames="Slide2"
                >
                  <div className="border-b md:w-3/4">
                    <div className="flex justify-start min-w-max md:my-6 ">
                      {/* 头像 */}
                      <div className="rounded-full  w-20 h-20 mx-6 flex-shrink-0 overflow-hidden mt-5">
                        <img src={item.photo} alt="userPhoto" />
                      </div>
                      {/* 个人信息 */}
                      <div className="flex-grow px-3 ">
                        {/* 成员名字 */}
                        <div className="text-xl font-semibold font-SourceSansPro mb-3">
                          {item.name}
                        </div>
                        {/* 成员在社团的职位 */}
                        <div className="text-base font-medium font-SourceSansPro my-2">
                          {/* 职位svg */}
                          <svg
                            className="inline mr-3"
                            t="1638113533850"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2288"
                            width="16"
                            height="16"
                          >
                            <path
                              d="M629.824 256H394.176a32 32 0 0 1-31.232-25.152l-42.176-192A32 32 0 0 1 352 0h320a32.128 32.128 0 0 1 31.296 38.912l-42.176 192A32.192 32.192 0 0 1 629.824 256z m-209.92-64h184.128l28.096-128H391.808l28.096 128zM512 1024a32.192 32.192 0 0 1-23.616-10.368l-224-244.416a32.128 32.128 0 0 1-7.68-28.352l85.568-395.584A32 32 0 0 1 373.568 320h276.864a32 32 0 0 1 31.232 25.28l85.568 395.584a31.808 31.808 0 0 1-7.68 28.352l-224 244.416A31.936 31.936 0 0 1 512 1024z m-189.248-285.888L512 944.64l189.248-206.528L624.64 384H399.36l-76.608 354.112z"
                              p-id="2289"
                              fill="#f9fcf5"
                            ></path>
                          </svg>
                          <span>{item.label}</span>
                        </div>
                        {/* 主要研究方向 */}
                        <div className="text-base font-medium font-SourceSansPro my-2">
                          <svg
                            t="1638153828946"
                            className="inline mr-3"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="5486"
                            width="14"
                            height="14"
                          >
                            <path
                              d="M514.837943 597.343086c-22.7328 0-51.141486-11.410286-68.1984-28.4672a94.237257 94.237257 0 0 1-28.437943-68.256915c0-28.437943 11.381029-45.494857 28.437943-62.581028a103.687314 103.687314 0 0 1 136.426057 0c34.084571 34.143086 34.084571 96.724114 0 136.543086-22.762057 11.381029-45.494857 22.762057-68.227657 22.762057z m0-130.8672c-11.351771 0-17.056914 5.705143-28.408686 11.410285a43.476114 43.476114 0 0 0-11.381028 28.437943c0 11.351771 5.675886 17.056914 11.381028 28.437943 5.675886 5.675886 17.056914 11.381029 28.408686 11.381029 11.381029 0 17.056914-5.705143 28.437943-11.410286 17.027657-17.056914 17.027657-39.789714 0-51.2-11.381029-11.351771-22.762057-17.056914-28.437943-17.056914z"
                              fill="#e6e6e6"
                              p-id="5487"
                            ></path>
                            <path
                              d="M844.536686 1001.237943c-136.426057 0-341.050514-119.456914-528.647315-312.875886-113.693257-119.486171-204.624457-250.324114-255.7952-369.810286C14.628571 193.448229 14.628571 96.753371 65.828571 39.848229c107.988114-102.4 386.516114 17.056914 630.930286 278.762057 250.119314 256 358.107429 540.437943 250.119314 642.837943-22.7328 28.437943-56.846629 39.818971-102.312228 39.818971zM173.787429 62.610286c-28.408686 0-51.170743 5.675886-68.1984 22.762057-34.113829 34.113829-28.437943 108.075886 11.351771 210.475886C162.4064 409.6 247.690971 529.056914 361.354971 648.543086c238.738286 250.294857 483.181714 341.313829 551.380115 273.056914 73.903543-68.256914-17.056914-318.581029-250.090057-563.2C475.048229 164.981029 281.746286 62.581029 173.787429 62.581029z"
                              fill="#e6e6e6"
                              p-id="5488"
                            ></path>
                            <path
                              d="M173.787429 1001.237943c-45.4656 0-79.579429-11.381029-107.988115-39.789714-56.846629-51.2-56.846629-153.6-5.705143-278.791315 51.170743-113.781029 142.101943-244.589714 255.7952-364.075885C566.008686 62.581029 838.831543-62.610286 946.848914 39.789714c56.846629 51.2 56.846629 153.6 5.675886 278.762057-51.141486 119.456914-136.426057 250.294857-255.7952 369.781029-113.664 119.456914-244.414171 216.181029-358.107429 267.381029-56.846629 28.437943-113.664 45.494857-164.834742 45.494857zM844.536686 62.610286c-108.017371 0-301.2608 102.4-488.8576 295.818971-107.988114 113.781029-198.948571 238.943086-244.414172 352.724114-39.789714 102.4-45.4656 176.3328-11.381028 216.151772 34.113829 34.143086 113.693257 28.4672 210.3296-17.056914 107.988114-51.2 227.357257-142.218971 341.050514-256 107.988114-113.781029 198.948571-238.943086 244.414171-352.694858 39.789714-102.4 45.494857-176.362057 11.381029-216.210285-11.381029-17.056914-34.113829-22.7328-62.522514-22.7328z"
                              fill="#e6e6e6"
                              p-id="5489"
                            ></path>
                          </svg>
                          {item?.work}
                        </div>
                        {/* 成员联系方式 */}
                        <div className="text-base font-medium font-SourceSansPro mt-2 text-gray-200">
                          <svg
                            t="1638114457960"
                            className="inline mr-3"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="3171"
                            width="15"
                            height="15"
                          >
                            <path
                              d="M953.437043 74.621715l-4.031877-4.031877a242.744566 242.744566 0 0 0-342.325516 0L388.974329 288.759157a242.744566 242.744566 0 0 0 0 342.261518l4.031877 4.031877c7.807761 7.871759 16.127506 14.911543 24.767241 21.439343l79.805556-79.805556a130.683998 130.683998 0 0 1-26.1112-20.095385l-4.031876-4.031876a131.195982 131.195982 0 0 1 0-185.402322L685.477249 149.115433a131.195982 131.195982 0 0 1 185.402322 0l4.031877 4.031877a131.25998 131.25998 0 0 1 0 185.402322L776.290468 437.106614a338.549632 338.549632 0 0 1 24.511249 132.347946l152.635326-152.571327a242.744566 242.744566 0 0 0 0-342.325516zM631.078915 388.916089a240.056648 240.056648 0 0 0-24.703243-21.439343L526.506118 447.3463c9.279716 5.503831 18.111445 12.159628 26.1112 20.095385l4.031876 4.031876a131.195982 131.195982 0 0 1 0 185.402322L338.607872 874.853208a131.195982 131.195982 0 0 1-185.402322 0l-4.031877-4.031877a131.25998 131.25998 0 0 1 0-185.402322L247.794653 586.862027a338.549632 338.549632 0 0 1-24.511249-132.347946L70.648078 607.02141a242.744566 242.744566 0 0 0 0 342.325516l4.031877 4.031877a242.808564 242.808564 0 0 0 342.325516 0l218.105321-218.105321a242.744566 242.744566 0 0 0 0-342.325516l-4.031877-4.031877z"
                              fill="#fdfefb"
                              p-id="3172"
                            ></path>
                          </svg>
                          <a
                            className="hover:text-blue-200 cursor-pointer transition-all "
                            href={`mailto:${item?.connection}`}
                          >
                            {item.connection}
                          </a>
                        </div>
                        <p className="text-sm p-2 break-all w-72">
                          {item?.saying}
                        </p>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </Container>
        {/* 成员列表上下的线 */}
        <ExpandLine
          className="border-b-2 transition-all duration-500 my-1"
          expand={expand}
        ></ExpandLine>
      </div>
    </Card>
  );
}
