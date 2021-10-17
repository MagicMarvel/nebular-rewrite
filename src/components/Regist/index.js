import React, { useRef, useState, useContext } from "react";
import HomePopUpCard from "../HomePopUpCard";
import Require from "../../utils/Require";
import { REGISTER } from "../../utils/pathMap";
import { useHistory } from "react-router-dom";
import { ToastContext } from "../../App";

export default function Index(props) {
  const UsrName = useRef(null);
  const Password = useRef(null);
  const Telephone = useRef(null);
  const Email = useRef(null);
  const history = useHistory();
  const [toastShow, setToastShow] = useState(false);
  const [toastMes, setToastMes] = useState(undefined);
  const toastController = useContext(ToastContext);

  const regist = () => {
    setToastShow(false);
    const fetch = async () => {
      const res = await Require.post(REGISTER, {
        username: UsrName.current.value,
        tel: Telephone.current.value,
        mail: Email.current.value,
        password: Password.current.value,
      });
      console.log(res);
      if (res.data.code === 1) {
        toastController({ mes: "注册成功", timeout: 1000 });
        setTimeout(() => {
          history.goBack();
        }, 1000);
      } else {
        toastController({
          mes: "注册失败，若反复遇到该错误，请联系管理员",
          timeout: 3000,
        });
      }
    };
    fetch();
  };

  return (
    <HomePopUpCard smallCard handleClose={props.handleClose} title="注册">
      <div className="p-3">
        <lable htmlFor="usrName" className="w-20 inline-block">
          用户名：
        </lable>
        <input
          type="text"
          name="usrName"
          ref={UsrName}
          placeholder="登录的用户名"
          className="w-48 lg:w-64 text-black placeholder-gray-400"
        />
      </div>
      <div className="p-3">
        <lable htmlFor="password" className="w-20 inline-block">
          密码：
        </lable>
        <input
          type="password"
          name="password"
          ref={Password}
          className="w-48 lg:w-64 text-black"
        />
      </div>
      <div className="p-3">
        <lable htmlFor="telephone" className="w-20 inline-block">
          电话：
        </lable>
        <input
          type="tel"
          name="telephone"
          ref={Telephone}
          className="w-48 lg:w-64 text-black"
        />
      </div>
      <div className="p-3">
        <lable htmlFor="email" className="w-20 inline-block">
          邮箱：
        </lable>
        <input
          type="text"
          name="email"
          ref={Email}
          className="w-48 lg:w-64 text-black"
        />
      </div>
      <div className="p-3">
        <button
          className="w-1/2 text-center mx-auto my-0 block bg-blue-500 h-8 shadow-sm
         text-sm font-medium rounded-sm text-white mb-2"
          onClick={regist}
        >
          注册
        </button>
      </div>
    </HomePopUpCard>
  );
}
