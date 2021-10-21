import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Require from "../../utils/Require";
import {
  GET_QUESTION_BY_ID,
  GET_ANSWER_BY_QUESTIONID,
  GET_ANSWER_BY_ANSWERID,
  GET_USER,
} from "../../utils/pathMap";
import MarkdownParse from "../../components/MarkdownParse";
import UserCard from "../../components/UserCard";
import SubmitButton from "../../components/SubmitButton";
import MarkdownEditorForAnswer from "../../components/MarkdownEditor/MarkdownEditorForAnswer";
import { CSSTransition } from "react-transition-group";
import BackgroundCard from "../../components/BackgroundCard";
import { ToastContext } from "../../App";

function AnswerRender(props) {
  const [answer, setAnswer] = useState(undefined);
  useEffect(() => {
    const fetch = async () => {
      const res = await Require.get(GET_ANSWER_BY_ANSWERID, {
        params: {
          answerId: props.answerId,
        },
      });
      console.log("answer");
      console.log(res.data.data);
      setAnswer(res.data.data);
    };
    fetch();
  }, [props.answerId]);
  return (
    <div>
      {answer !== undefined && (
        <div className="flex border-t-2 border-dotted border-blue-300 w-full justify-between">
          <div className=" my-1 mr-3 md:mr-8 p-1 flex-grow  mb-5">
            <MarkdownParse noTOC h1NoLine markdown={answer.content} />
            <div className="float-right text-gray-400 text-base font-kaiti mt-3">
              <span className="mr-2">answer at {answer.date}</span>
              <span className="">by {answer.username}</span>
            </div>
          </div>
          <div className=" hidden my-1 md:block">
            <UserCard uid={answer.uid} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Index(props) {
  const [questionImformation, setQuestionImformation] = useState(undefined);
  const [answerList, setAnswerList] = useState(undefined);
  const { questionId } = useParams();
  const toastController = useContext(ToastContext);
  const [showEditor, setShowEditor] = useState(false);
  const history = useHistory();
  //   get question details
  useEffect(() => {
    const fetchData = async () => {
      const res = await Require.get(GET_QUESTION_BY_ID, {
        params: {
          questionId: questionId,
        },
      });
      console.log("question");
      console.log(res);
      if (res.data.code === 1) setQuestionImformation(res.data.data);
      else
        setQuestionImformation({
          title: "提问不存在",
          content: "提问不存在，若你认为这是一个错误，请向管理员联系",
        });
    };
    fetchData();
  }, [questionId]);

  // get answerList
  useEffect(() => {
    const fetchDate = async () => {
      const res = await Require.get(GET_ANSWER_BY_QUESTIONID, {
        params: {
          questionId: questionId,
          size: 99,
          page: 1,
        },
      });
      console.log("answer list");
      console.log(res);
      setAnswerList(res.data.data.detail);
    };
    fetchDate();
  }, [questionId, showEditor]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleAnswerSumbitBtm = () => {
    Require.get(GET_USER)
      .then((res) => {
        if (res.data.code === 1) setShowEditor(true);
      })
      .catch((res) => {
        toastController({
          mes: "您还未登录，一秒后跳转到登录页面",
          timeout: 1000,
        });
        setTimeout(() => {
          history.push("/home/login");
        }, 1000);
      });
  };

  return (
    <BackgroundCard>
      {/* 文章显示，包括了题目和内容，这里的relative是为了markdown那个toc的定位 */}
      {questionImformation !== undefined && (
        <div>
          <div
            className="mt-5 mb-2 border-l-3 border-blue-500 font-kaiti text-xl text-purple-500
            font-bold py-2 pl-3"
          >
            <div className="transform hover:translate-x-8 hover:text-red-500 duration-500 cursor-pointer">
              {questionImformation !== undefined && questionImformation.title}
            </div>
          </div>
          <div className="w-full mb-10 mt-6">
            <div
              className="text-purple-500 font-Playball text-xl hover:text-red-500 transition-all 
        select-none mb-2"
            >
              The Question:
            </div>
            <MarkdownParse
              noTOC
              h1NoLine
              markdown={questionImformation.content}
            ></MarkdownParse>
          </div>
        </div>
      )}
      <div
        className="text-purple-500 font-Playball text-xl hover:text-red-500 transition-all 
        select-none mb-2"
      >
        All Answer:
      </div>
      {/* 渲染答案 */}
      {answerList !== undefined &&
        answerList.map((item) => {
          return (
            <AnswerRender
              key={item.answerId}
              answerId={item.answerId}
            ></AnswerRender>
          );
        })}
      {/* 发布回答按钮 */}
      <div className=" relative w-full flex justify-end p-5 pr-20 ">
        <CSSTransition
          in={showEditor}
          classNames="FadeInOut"
          timeout={200}
          unmountOnExit
        >
          <MarkdownEditorForAnswer
            title="发布回答"
            questionId={questionImformation?.questionId}
            close={() => setShowEditor(false)}
          />
        </CSSTransition>
        <div onClick={handleAnswerSumbitBtm}>
          <SubmitButton
            render={() => {
              return "回答";
            }}
          />
        </div>
      </div>
      {/* 向上翻页按钮 */}
      <div
        className="fixed right-2 bottom-8 md:right-16 md:animate-bounce cursor-pointer"
        onClick={scrollToTop}
      >
        <svg
          t="1632401792928"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2400"
          width="50"
          height="50"
        >
          <path
            d="M554.666667 268.8v601.6h-85.333334V268.8L337.066667 401.066667 277.333333 341.333333 512 106.666667 746.666667 341.333333l-59.733334 59.733334L554.666667 268.8z"
            fill="#8a8a8a"
            p-id="2401"
          ></path>
        </svg>
      </div>
    </BackgroundCard>
  );
}
