import { GoogleAnalytics } from "nextjs-google-analytics";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId={"G-WRRVC7NXPP"} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
