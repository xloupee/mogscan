import "./globals.css";
import BackgroundAudio from "./components/background-audio";
import CoinAddressBar from "./components/coin-address-bar";

export const metadata = {
  title: "mogscan",
  description: "MOG leaderboard dashboard",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CoinAddressBar />
        <BackgroundAudio />
        {children}
      </body>
    </html>
  );
}
