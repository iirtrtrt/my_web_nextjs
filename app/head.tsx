import Script from "next/script";

export default function Head() {
  return (
    <>
      <title>TKINLV</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="This is from Taekyung Kim" />
      <link rel="icon" href="/favicon.ico" />
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-WRRVC7NXPP"
      ></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-WRRVC7NXPP');`}
      </Script>
    </>
  );
}
