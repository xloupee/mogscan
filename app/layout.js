import "./globals.css";
import BackgroundAudio from "./components/background-audio";

export const metadata = {
  title: "mogscan",
  description: "MOG leaderboard dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BackgroundAudio />
        {children}
      </body>
    </html>
  );
}
