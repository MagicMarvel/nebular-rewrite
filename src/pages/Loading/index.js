import React from "react";
import styled, { keyframes } from "styled-components";

const wave = keyframes`
    50%,70%{
        transform:scale(2.5);
    }
    80%,100%{
        opacity:0;
    }
`;

const Point = styled.div`
    height: 1rem;
    width: 1rem;
    margin: 0.7rem;
    background: ${(props) => props.color};
    user-select: none;
    border-radius: 50%;
    border: 0.1rem inherit solid;
    position: relative;
    &::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: inherit;
        animation: ${wave} 1s ease-out infinite;
        animation-delay: ${(props) => props.delay};
    }
`;

export default function index() {
    return (
        <div className="fixed flex flex-col justify-center items-center w-screen h-screen bg-gray-900 bg-opacity-90">
            <div className=" flex justify-center items-center">
                <Point delay="0s" color="#7ef9ff"></Point>
                <Point delay="0.2s" color="#89cff0"></Point>
                <Point delay="0.4s" color="#4682b4"></Point>
                <Point delay="0.6s" color="#0f52ba"></Point>
                <Point delay="0.8s" color="#000080"></Point>
            </div>
            {/* <div className="mt-2 font-kaiti" style={{ color: "#629bc7" }}>
                努力加载.....
            </div> */}
        </div>
    );
}
