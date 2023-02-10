import "@/styles/globals.css";
import localFont from "@next/font/local";
import clsx from "classnames";

const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={clsx(sfPro.variable)}>
      <Component {...pageProps} />
    </main>
  );
}
