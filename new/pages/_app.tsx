import CookieConsetPopup from '@/comps/cookieConsent'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  const [showCookieConsent, setShowCookieConsent] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("cookiesAccepted") !== "true") {
      setShowCookieConsent(true)
    }
  }, [])

  return (
    <>
      <GoogleAnalytics trackPageViews />
      {/* {showCookieConsent && <CookieConsetPopup setShow={setShowCookieConsent} />} */}
      <Component {...pageProps} />
    </>
  )
}
