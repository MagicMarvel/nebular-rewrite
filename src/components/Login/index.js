import React, { useRef, useEffect, useState, useContext } from "react";
import HomePopUpCard from "../HomePopUpCard";
import Require from "../../utils/Require";
import { LOGIN } from "../../utils/pathMap";
import { useHistory } from "react-router-dom";
import { ToastContext } from "../../App";

export default function Index(props) {
  let history = useHistory();
  const usrInput = useRef(null);
  const passwordInput = useRef(null);
  const [toastShow, setToastShow] = useState(false);
  const [toastMes, setToastMes] = useState("");
  const ToastController = useContext(ToastContext);

  // 用户点击登录
  const login = async () => {
    const res = await Require.post(LOGIN, {
      username: usrInput.current.value,
      password: passwordInput.current.value,
    });
    console.log("LOGIN");
    console.log(res);
    if (res.data.code === 1) {
      ToastController({ mes: "登录成功!跳转中至上一页......", timeout: 1000 });
      setTimeout(() => {
        history.goBack();
      }, 1000);
    } else {
      ToastController({ mes: "登录失败!请重试吧......", timeout: 1000 });
    }
  };

  // 尝试自动登录
  useEffect(() => {
    const fetch = async () => {
      const res = await Require.post(LOGIN);
      if (res.data.code === 1) {
        ToastController({ mes: "您已登录！一秒后返回", timeout: 1000 });
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    };
    fetch();
  }, [history, ToastController]);

  return (
    <HomePopUpCard smallCard handleClose={props.handleClose} title="登录">
      <div className="p-3">
        <label htmlFor="usrName" className="w-20 inline-block">
          用户名：
        </label>
        <input
          className=" w-48 lg:w-64 text-black"
          type="text"
          ref={usrInput}
        />
      </div>
      <div className="p-3">
        <label htmlFor="password" className="w-20 inline-block">
          密码：
        </label>
        <input
          className="w-48 lg:w-64 text-black"
          type="password"
          ref={passwordInput}
        />
      </div>
      <div className="p-3">
        <button
          className="w-1/2 text-center mx-auto my-0 block bg-blue-500 h-8 shadow-sm text-sm
         font-medium rounded-sm text-white mb-2"
          onClick={login}
        >
          登入
        </button>
      </div>
    </HomePopUpCard>
  );
}
