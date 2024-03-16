module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        "view6": "635px"
      },
      height: {
        "messaging": "32rem",
      },
      inset: {
        "13/20": "65%",
        "8/9": "88.8%",
        "-3/20": "-17%",
        "-1/10": "-10%",
        "-1/6": "-16.6%",
      },
      transitionProperty: {
        "height": "height"
      },
      lineHeight: {
        "16": "4rem",
      },
      width: {
        "paymentmethod": "17.5rem",
      },
      maxHeight: {
        "contacts": "22.5rem",
        "popup": "41rem"
      },
      maxWidth: {
        "mac": "90rem",
        "dashboardtip": "22.5rem",
        "dashboardtip-p": "18.75rem",
        "btn": "12rem",
        "numbers-table": "62rem",
        "paymentmethods": "48.75rem",
        "message": "12.5rem"
      },
      letterSpacing: {
        tighter: "-.05rem",
        tight: "-.025rem",
        normal: "0",
        wide: ".025rem",
        wider: ".05rem",
        widest: ".1rem",
      },
      fontSize: {
        "1.75base": "1.75rem",
      },
      colors: {
        gray: {
          dotBg: "#ACADAD",
          footer: "#F3F3F3",
          DEFAULT: "#686868",
        },
        blue: {
          DEFAULT: "#5685FF",
        },
        orange: {
          DEFAULT: "#F29161",
        },
        red: {
          DEFAULT: "#EB7676",
        },
        green: {
          DEFAULT: "#68E0B7",
        },
      },
      borderRadius: {
        "5xl": "2.5rem",
        "2.5xl": "1.25rem",
      },
    },
    fontFamily: {
      sans: ["Eudoxus Sans", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
