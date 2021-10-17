import React, { useState, useContext } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Require from "../../utils/Require";
import { UPLOAD_PHOTO } from "../../utils/pathMap";
import { ToastContext } from "../../App";

// 必须传入username，用于获取当前头像
export default function Demo(props) {
  // 这个 image可以直接装入src
  const [image, setImage] = useState(
    `http://www.sankuyan.cn/user/${props.username}/ProfilePhoto.jpg`
  );
  // 切出来后的图片数据？
  const [cropData, setCropData] = useState("#");
  // 一个切割者实例？这个cropper可以调用一个方法（cropper.getCroppedCanvas().toDataURL()），然后得到当前切出来的数据
  const [cropper, setCropper] = useState();
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
    console.log("uploading");
    console.log(cropBlob);
    let data = new FormData();
    data.append("file", cropBlob);
    const res = await Require.post(UPLOAD_PHOTO, data);
    if (res.data.code === 1) {
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
      className="flex justify-center items-center w-4/5 mx-auto mt-3 bg-white bg-opacity-90 shadow-lg rounded-xl
      p-3
    "
    >
      <div className="w-4/5">
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
        <div>
          <div className=" border border-blue-100 w-1/2 float-right h-80 inline-block p-3 box-border">
            <h1>
              <span>头像效果：</span>
              <button style={{ float: "right" }} onClick={getCropData}>
                切割
              </button>
            </h1>
            {cropData !== "#" && (
              <img
                className="rounded-full border border-blue-100 h-56 w-56 p-1"
                src={cropData}
                alt="未切割"
              />
            )}
          </div>
          <div className="box float-left w-1/2">
            <h1>预览：</h1>
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
        </div>
        <br style={{ clear: "both" }} />
        <button className="float-right" onClick={handlePhotoUpload}>
          上传
        </button>
      </div>
    </div>
  );
}
