module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      kaiti: ["kaiti"],
    },
    extend: {
      backgroundImage: (theme) => ({
        sky: "url('https://z3.ax1x.com/2021/09/10/hvsPXQ.png')",
        guitar: "url('https://z3.ax1x.com/2021/09/10/hv6YQO.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
