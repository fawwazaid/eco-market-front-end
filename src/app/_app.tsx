// src/app/_app.tsx
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Cloudinary Upload Widget Script */}
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          async
          defer
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
