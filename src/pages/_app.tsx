// pages/_app.tsx
import "../styles/globals.css"; // Make sure the path is correct
import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primeicons/primeicons.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  // Corrected this line
  return <Component {...pageProps} />;
}

export default MyApp;
