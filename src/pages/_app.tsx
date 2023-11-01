import MainTemplate from '@/layout/mainTemplate'
import "@/layout/style.all.css"
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';
import Login from './login.html';
import NoData from '@/componen/NoData';
import React from 'react';
import { session } from '@/utils/config';
import router from 'next/router';
export default function App({ Component, pageProps }: AppProps) {
  const url: string[] | [] = typeof window != "undefined" ? window.location.pathname.split("/") : ["", ""]
  const [template, setTemplate] = useState<string>("");
  useEffect(() => {

    if (url[1] == "login.html") {
      setTemplate("login.html");
    }
    else {

      if (window.localStorage.getItem(session) == null) {
        setTemplate("");
        router.push("/login.html");

      }
      else

        setTemplate("admin");
    }


  }, [url])
  interface c {
    template: string,
  }
  const Template: React.FC<c> = ({ template }) => {
    if (template == "") {
      return <>
        <NextNProgress />
        Loading...
      </>
    }
    else {
      if (template == "login.html") {
        return <>
          <NextNProgress />
          <Login />
        </>
      }
      else {
        return <MainTemplate >
          <NextNProgress />
          <Component {...pageProps} />
        </MainTemplate >

      }

    }

  }
  return <Template template={template} />
}

