import Script from "next/script";

export function AdsenseScript() {
  return (
    <Script
      async
      id="snapmod-adsense"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6044278578685946"
      crossOrigin="anonymous"
    />
  );
}
