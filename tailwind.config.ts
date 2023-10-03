import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],

	theme: {
		extend: {
			colors: {
				accent: "#006400",
				sec: "#d8f3dc",
				pry: "#f4fff5",
			},
			screens: {
				sm: "520px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
			},

			fontFamily: {
				inter: ["var(--font-inter)"],
				barlow: ["var(--font-barlow)"],
				chonburi: ["var(--font-chonburi)"],
			},
		},
	},
	plugins: [],
};
export default config;
