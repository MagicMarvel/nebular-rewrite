import React, { useState, useContext } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Require from "../../utils/Require";
import { UPLOAD_PHOTO } from "../../utils/pathMap";
import { ToastContext } from "../../App";
import SubmitButton from "../SubmitButton";

// 必须传入username，用于获取当前头像
export default function Demo(props) {
    // 这个 image可以直接装入src
    const [image, setImage] = useState(
        `http://www.sankuyan.cn/user/${props.username}/ProfilePhoto.jpg`
    );
    // 切出来后的图片数据？
    const [cropData, setCropData] = useState("#");
    // 一个切割者实例？这个cropper可以调用一个方法（cropper.getCroppedCanvas().toDataURL()），然后得到当前切出来的数据
    const [cropper, setCropper] = useState(undefined);
    // 图片的二进制形式
    const [cropBlob, setCropBlob] = useState(undefined);

    const toastController = useContext(ToastContext);

    // 上传图片到 corpper的 src里的函数
    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    // 将图片真正切出来放入CropData
    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
            cropper.getCroppedCanvas().toBlob((blob) => {
                setCropBlob(blob);
            });
        }
    };

    const handlePhotoUpload = async () => {
        if (cropBlob === undefined) {
            toastController({
                mes: "请点击左边的处理按钮，得到最终头像效果图",
                timeout: 1500,
            });
            return;
        }
        let data = new FormData();
        data.append("file", cropBlob);
        const res = await Require.post(UPLOAD_PHOTO, data);
        if (res.data.code === 1) {
            console.log(res);
            toastController({ mes: "图片上传成功，请刷新页面", timeout: 1500 });
            setTimeout(() => {
                props.close();
            }, 1500);
        } else {
            toastController({
                mes: "图片上传失败，若多次出现该信息，请联系管理员",
                timeout: 2000,
            });
        }
    };

    return (
        <div
            className="flex justify-center items-center w-11/12 lg:w-4/5 mx-auto mt-3 bg-white shadow-lg rounded-xl p-3 bg-opacity-90"
            style={{
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
            }}
        >
            <div className="w-full lg:w-4/5">
                <div style={{ width: "100%" }}>
                    <div className="flex justify-between items-center my-2">
                        <input type="file" onChange={onChange} />
                        <div
                            className="inline-block cursor-pointer transform transition-all hover:rotate-90 duration-200"
                            onClick={props.close}
                        >
                            <svg
                                className="inline"
                                t="1631543331435"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="2168"
                                width="28"
                                height="28"
                            >
                                <path
                                    d="M571.01312 523.776l311.3472-311.35232c15.7184-15.71328 15.7184-41.6256 0-57.344l-1.69472-1.69984c-15.7184-15.71328-41.6256-15.71328-57.34912 0l-311.3472 311.77728-311.35232-311.77728c-15.7184-15.71328-41.63072-15.71328-57.344 0l-1.69984 1.69984a40.0128 40.0128 0 0 0 0 57.344L452.92544 523.776l-311.35232 311.35744c-15.71328 15.71328-15.71328 41.63072 0 57.33888l1.69984 1.69984c15.71328 15.7184 41.6256 15.7184 57.344 0l311.35232-311.35232 311.3472 311.35232c15.72352 15.7184 41.63072 15.7184 57.34912 0l1.69472-1.69984c15.7184-15.70816 15.7184-41.6256 0-57.33888l-311.3472-311.35744z"
                                    p-id="2169"
                                    fill="#000000"
                                ></path>
                            </svg>
                        </div>
                    </div>

                    {/* 切割器 */}
                    <Cropper
                        className="border rounded border-blue-300 my-2"
                        style={{ height: 400, width: "100%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                        guides={true}
                    />
                </div>
                <div className="flex justify-around flex-row flex-wrap">
                    <div className="box box-border w-72 p-3 rounded border border-blue-300 m-1 flex-shrink-0">
                        <div
                            className="img-preview w-full overflow-hidden"
                            style={{ height: "288px" }}
                        />
                        <div className=" flex text-base justify-center items-center text-gray-500 font-kaiti">
                            预览
                        </div>
                    </div>
                    <div className="flex-shrink-0 border box-border border-blue-300 rounded w-72 m-1 inline-block p-3">
                        {cropData !== "#" ? (
                            <img
                                className="rounded-full border border-blue-100 h-56 w-56 p-1"
                                src={cropData}
                                alt="未切割"
                            />
                        ) : (
                            <div style={{ height: "288px" }}></div>
                        )}
                        <div className=" flex text-base justify-center items-center text-gray-500 font-kaiti">
                            最终效果
                        </div>
                    </div>
                </div>
                <div className="flex justify-center p-2">
                    <SubmitButton
                        style={{ margin: "0.325rem" }}
                        onClick={getCropData}
                        render={() => {
                            return <div className="p-1">处理</div>;
                        }}
                    />
                    <SubmitButton
                        style={{ margin: "0.325rem" }}
                        onClick={handlePhotoUpload}
                        render={() => <div className="p-1">上传</div>}
                    ></SubmitButton>
                </div>
            </div>
        </div>
    );
}
