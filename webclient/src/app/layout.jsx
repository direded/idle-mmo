import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WsContextProvider, { WsContext } from '@/context/WsContext'

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Idle Story",
	description: "Contact @direded in discord for more info",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<WsContextProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					{children}
				</body>
			</WsContextProvider>
    </html>
  );
}
