import React, { useRef } from "react";
import HomePopUpCard from "../HomePopUpCard";
import Require from "../../utils/Require";
import { LOGIN } from "../../utils/pathMap";
import { useHistory } from "react-router-dom";

export default function Index(props) {
  let history = useHistory();
  const usrInput = useRef(null);
  const passwordInput = useRef(null);

  const login = async () => {
    const res = await Require.post(LOGIN, {
      username: usrInput.current.value,
      password: passwordInput.current.value,
    });
    console.log("LOGIN");
    console.log(res);
    if (res.data.code === 1) {
      history.goBack();
      return true;
    } else {
      return false;
    }
  };

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
