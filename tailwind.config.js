/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-apello", "border-apello", "text-apello",
    "bg-green", "border-green", "text-green",
    "bg-violet", "border-violet", "text-violet",
    "bg-fauxblack", "border-fauxblack", "text-fauxblack",
  ],
  theme: {
    extend: {
      backgroundImage: {
        holderad: "url(/apello_ad.png)",
        "mesh-gradient":
          "radial-gradient(at 20% 80%, rgba(108, 99, 255, 0.12) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(230, 150, 0, 0.08) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(50, 50, 70, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        dark: "rgba(0, 0, 0, 0.5) 0px 2px 10px 4px",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-sm": "0 4px 16px 0 rgba(0, 0, 0, 0.25)",
        glow: "0 0 20px rgba(108, 99, 255, 0.3)",
        "glow-apello": "0 0 20px rgba(230, 150, 0, 0.3)",
      },
      colors: {
        noir: "#1A1A1A",
        blanc: "#f2f2f2",
        rose: "#ff0032",
        bleu: "#92d8e0",
        orange: "#ff832b",
        violet: "#6C63FF",
        fauxblack: "#191617",
        fauxblack2: "#100d0e",
        green: "#3da17e",
        apello: "rgba(230, 150, 0, 1.0)",
        bwhite: "rgba(255, 255, 255, 0.2)",
        surface: {
          DEFAULT: "#100d0e",
          elevated: "#191617",
        },
        muted: "#85848b",
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)",
          hover: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        jura: ["Jura", "sans-serif"],
      },
      dropShadow: {
        apello: "1px 4px 0px rgba(230, 150, 0, 1.0)",
        "text-sm": "1px 1px 0px rgba(0, 0, 200, 0.90)",
        "text-md": "1px 2px 0px rgba(0, 0, 0, 0.90)",
        "text-lg": "1px 4px 0px rgba(108, 99, 255, 0.90)",
      },
      backdropBlur: {
        glass: "16px",
        "glass-heavy": "24px",
      },
      animation: {
        "bounce-slow": "bounce 5s ease-in-out infinite",
        "bounce-float": "floating 3s ease-in-out infinite",
        "slide-from-right": "slidefromright 0.25s ease-in-out",
        "slide-from-right-mobile":
          "slidefromrightmobile 0.25s ease-in-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        shimmer: "shimmer 2s infinite linear",
      },
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translatey(0)" },
          "50%": { transform: "translatey(3%)" },
        },
        slidefromright: {
          "0%": { right: "-196px" },
          "100%": { right: "0px" },
        },
        slidefromrightmobile: {
          "0%": { right: "-196px" },
          "100%": { right: "-24px" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      gridTemplateColumns: {
        mobile: "repeat(auto-fit,minmax(269px,350px))",
      },
      padding: {
        "1/2": "50%",
        full: "100%",
      },
      transitionDuration: {
        600: "600ms",
      },
    },
  },
  plugins: [],
};