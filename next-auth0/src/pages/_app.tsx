import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "../components/header";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>NextJs Auth0</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
