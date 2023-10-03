import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Chonburi, Barlow_Condensed } from "next/font/google";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import QueryProvider from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

const barlow = Barlow_Condensed({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-barlow",
});

const chonburi = Chonburi({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-chonburi",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Byte Foods",
	description: "Order, Enjoy, Repeat",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={`${chonburi.variable} ${barlow.variable} ${inter.className} w-full mx-auto`}>
				<AuthProvider>
					<QueryProvider>
						<Navbar />
						{children}
						<Footer />
						<ToastContainer position='bottom-right' autoClose={3000} />
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
