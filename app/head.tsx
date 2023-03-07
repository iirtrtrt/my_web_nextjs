import Script from "next/script";

export default function Head() {
  return (
    <>
      <title>TKINLV</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="This is from Taekyung Kim" />
      <meta property="image" content="/preview-tkinlv.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
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
