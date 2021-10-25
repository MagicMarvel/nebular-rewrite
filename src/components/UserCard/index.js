import React, { useEffect, useState } from "react";
import Require from "../../utils/Require";
import axios from "axios";
import { GET_USER_BY_ID, getUsrPhoto } from "../../utils/pathMap";

// 传入uid，(因为需要其他的信息，只传入username是不行的)
export default function Index(props) {
    const [usrInformation, setUsrInformation] = useState(undefined);
    const [photoBlob, setPhotoBlob] = useState(undefined);

    // 根据uid获取用户信息
    useEffect(() => {
        const fetch = async () => {
            const res = await Require.get(GET_USER_BY_ID, {
                params: {
                    uid: props.uid,
                },
            });
            setUsrInformation(res.data.data);
        };
        fetch();
    }, [props.uid]);

    // 获取头像
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    getUsrPhoto(usrInformation.username),
                    {
                        responseType: "blob",
                    }
                );
                setPhotoBlob(URL.createObjectURL(res.data));
            } catch (e) {
                // 没有图片的话会跳转到这里，跳转至此不需要有额外的
            }
        };
        if (usrInformation?.username !== undefined) fetchData();
    }, [usrInformation?.username]);

    return (
        <div
            className="inline-block border-blue-400 my-1 rounded-lg p-2 bg-blue-50 bg-opacity-50 shadow-xl 
    transition-all transform  hover:shadow-2xl cursor-pointer select-none group w-40"
        >
            {usrInformation !== undefined && (
                <div>
                    {/* 卡片自由增加减少高度 */}
                    <div className="flex flex-col  items-center justify-between h-52 transition-all">
                        <div className="border-l flex-grow border-blue-300"></div>
                        {/* 给头像变圆，加旋转 */}
                        <div
                            className="my-1 rounded-full overflow-hidden flex-grow-0 flex-shrink-0 transition-all transform
             group-hover:rotate-45 duration-300"
                        >
                            {photoBlob === undefined ? (
                                <svg
                                    className="p-5 border rounded-full"
                                    t="1633165446285"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="2157"
                                    width="5rem"
                                    height="5rem"
                                >
                                    <path
                                        d="M501.937582 545.097053c147.891962 0 268.231366-118.534055 268.223274-264.288929 0-145.746783-120.330301-264.28994-268.222263-264.28994-147.890951 0-268.221252 118.584625-268.221252 264.28994C233.71633 426.520519 354.046631 545.097053 501.937582 545.097053zM612.471463 570.546911 411.497184 570.546911c-186.760063 0-338.664249 149.569875-338.664249 333.472733l0 19.794109c0 96.139636 149.47278 96.139636 338.664249 96.139636l200.974278 0c181.747565 0 338.694591 0 338.694591-96.139636l0-19.794109C951.164031 720.158252 799.235571 570.546911 612.471463 570.546911z"
                                        p-id="2158"
                                        fill="#707070"
                                    ></path>
                                </svg>
                            ) : (
                                <img
                                    src={photoBlob}
                                    className="h-20 w-20"
                                    alt="用户头像"
                                />
                            )}
                        </div>
                        <div className="border-l flex-grow border-blue-300"></div>
                        <div className="transition-all duration-1000 h-0 overflow-hidden group-hover:h-16 ">
                            <div className="text-gray-800">
                                {usrInformation.nickname}
                            </div>
                            <div className="text-xs text-gray-500 font-kaiti">
                                {usrInformation.mail}
                            </div>
                            <p className="text-xs text-gray-500 max-w-xs">
                                {usrInformation.motto}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
