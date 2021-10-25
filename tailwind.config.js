module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ["ui-sans-serif", "system-ui"],
            serif: ["ui-serif", "Georgia"],
            mono: ["ui-monospace", "SFMono-Regular"],
            kaiti: ["kaiti"],
            JetBrains: ["JetBrains Mono"],
            Playball: ["Playball"],
        },
        borderWidth: {
            DEFAULT: "1px",
            0: "0",
            2: "2px",
            3: "3px",
            4: "4px",
            6: "6px",
            8: "8px",
        },
        extend: {
            zIndex: {
                "-10": "-10",
            },
            colors: {
                // 用于 markdown TOC 颜色渲染，背景部分
                toc: "#384348",
                // 用于 markdown TOC 颜色渲染，文字部分
                "toc-text": "#c3cee3",
            },
            padding: {
                "1/2": "1/2",
                "1/4": "1/4",
                "3/4": "3/4",
            },
            borderColor: (theme) => ({
                ...theme("colors"),
                DEFAULT: theme("colors.gray.500", "currentColor"),
            }),
            backgroundImage: (theme) => ({
                sky: "url('https://z3.ax1x.com/2021/09/10/hvsPXQ.png')",
                guitar: "url('https://z3.ax1x.com/2021/09/10/hv6YQO.png')",
            }),
        },
    },
    variants: {
        extend: {
            // 启用变体
            textColor: ["visited"],
            translate: ["active", "group-hover"],
            letterSpacing: ["group-hover"],
            width: ["group-hover"],
            height: ["group-hover"],
            animation: ["hover", "group-hover"],
            ringWidth: ["hover"],
            rotate: ["group-hover"],
            display: ["group-hover"],
        },
    },
    // 插件系统，用于引入其他的css样式
    plugins: [],
};
