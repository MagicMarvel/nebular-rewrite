import React, { useRef, useContext } from "react";
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
    const toastController = useContext(ToastContext);

    const regist = () => {
        const fetch = async () => {
            const res = await Require.post(REGISTER, {
                username: UsrName.current.value,
                tel: Telephone.current.value,
                mail: Email.current.value,
                password: Password.current.value,
            });

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
        console.log(
            /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
                Email.current.value
            )
        );
        console.log(
            /^([1][3,4,5,6,7,8,9])\d{9}$/.test(Telephone.current.value)
        );
        if (
            UsrName.current.value.length >= 4 &&
            /^([1][3,4,5,6,7,8,9])\d{9}$/.test(Telephone.current.value) &&
            /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
                Email.current.value
            ) &&
            Password.current.value.length >= 6
        )
            fetch();
        else
            toastController({
                mes: "请检查：username是否大于等于4位、密码是否大于等于6位、电子邮件电话号码是否合法",
                timeout: 3000,
            });
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
                    className="w-48 lg:w-64 text-gray-800 placeholder-gray-400"
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
                    className="w-48 lg:w-64 text-gray-800"
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
                    className="w-48 lg:w-64 text-gray-800"
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
                    className="w-48 lg:w-64 text-gray-800"
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
