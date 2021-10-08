import React, { useState, useEffect } from "react";
import Require from "../../utils/Require";
import { LOGOUT } from "../../utils/pathMap";
import Toast from "../../components/Toast";
import { useHistory } from "react-router-dom";

export default function Index() {
  const [toastShow, setToastShow] = useState(false);
  const [mes, setMes] = useState("");
  const history = useHistory();
  const logout = async () => {
    const res = await Require.post(LOGOUT);
    console.log(res);
    if (res.data.code === 1) {
      setMes("注销成功");
      setToastShow(true);

      setTimeout(() => {
        history.push("/");
      }, 2000);
      setToastShow(false);
    }
  };
  return (
    <div className="flex-grow min-h-screen flex flex-col justify-around items-center">
      <Toast mes={mes} show={toastShow} />
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
