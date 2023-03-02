export default function Head() {
  return (
    <>
      <title>TKINLV</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="This is a Taekyung Kim's web" />
      <link rel="icon" href="/favicon.ico" />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-38LSCTYW08"
      ></script>
      <script>
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-38LSCTYW08');`}
      </script>
    </>
  );
}
