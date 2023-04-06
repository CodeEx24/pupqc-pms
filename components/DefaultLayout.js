import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DefaultLayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - PUPQC' : 'PUPQC'}</title>
        <meta name="description" content="Created by PUPians" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="bg-right bg-[url('/background/pup2.jpg')] bg-cover">
        <main className="container ">{children}</main>
      </div>
    </>
  );
}

export default DefaultLayout;
