import React, { useState, useEffect, useContext } from "react";
import Require from "../../utils/Require";
import { LOGOUT } from "../../utils/pathMap";
import { ToastContext } from "../../App";
import { useHistory } from "react-router-dom";

export default function Index() {
  const history = useHistory();
  const toastController = useContext(ToastContext);
  const logout = async () => {
    const res = await Require.post(LOGOUT);
    console.log(res);
    if (res.data.code === 1) {
      toastController({ mes: "注销成功", timeout: 2000 });
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  };
  return (
    <div className="flex-grow min-h-screen flex flex-col justify-around items-center">
      <div className="w-full md:w-60 h-20 rounded text-center border">
        <div
          className="h-full flex justify-center items-center text-2xl font-bold bg-white bg-opacity-25
        hover:bg-opacity-70 transition-all duration-150 select-none hover:text-red-700 cursor-pointer"
          onClick={logout}
        >
          我要注销！！！！
        </div>
        <div className="text-red-500 font-kaiti">
          这将清除您的cookie和登录状态
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
