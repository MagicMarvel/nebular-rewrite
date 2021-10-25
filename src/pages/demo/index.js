import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Require from "../../utils/Require";
import { UPLOAD_PHOTO } from "../../utils/pathMap";

// 必须传入username，用于获取当前头像
const Demo = (props) => {
    // 这个 image可以直接装入src
    const [image, setImage] = useState(
        `http://www.sankuyan.cn/user/${props.username}/ProfilePhoto.jpg`
    );
    // 切出来后的图片数据？
    const [cropData, setCropData] = useState("#");
    // 一个切割者实例？这个cropper可以调用一个方法（cropper.getCroppedCanvas().toDataURL()），然后得到当前切出来的数据
    const [cropper, setCropper] = useState();

    const [cropBlob, setCropBlob] = useState(undefined);

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
        console.log("uploading");
        console.log(cropBlob);
        let data = new FormData();
        data.append("file", cropBlob);
        const res = await Require.post(UPLOAD_PHOTO, data);
        console.log(res);
    };

    return (
        <div className="flex justify-center items-center w-4/5 mx-auto mt-3 bg-white bg-opacity-50 shadow rounded">
            <div className="w-4/5">
                <div style={{ width: "100%" }}>
                    <div className="flex justify-between">
                        <input type="file" onChange={onChange} />
                        <svg
                            className="inline-block"
                            onClick={() => {
                                props.close(false);
                            }}
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

                    {/* 切割器 */}
                    <Cropper
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
                <div>
                    <div
                        className="box"
                        style={{ width: "50%", float: "right" }}
                    >
                        <h1>切割后预览</h1>
                        <div
                            className="img-preview"
                            style={{
                                width: "100%",
                                float: "left",
                                height: "300px",
                                overflow: "hidden",
                            }}
                        />
                    </div>
                    <div
                        className="box"
                        style={{
                            width: "50%",
                            float: "right",
                            height: "300px",
                            display: "inline-block",
                            padding: "10px",
                            boxSizing: "border-box",
                        }}
                    >
                        <h1>
                            <span>头像效果</span>
                            <button
                                style={{ float: "right" }}
                                onClick={getCropData}
                            >
                                切割
                            </button>
                        </h1>
                        <img
                            className="rounded-full h-56 w-56"
                            src={cropData}
                            alt="cropped"
                        />
                    </div>
                </div>
                <br style={{ clear: "both" }} />
                <button className="float-right" onClick={handlePhotoUpload}>
                    上传
                </button>
            </div>
        </div>
    );
};

export default Demo;
