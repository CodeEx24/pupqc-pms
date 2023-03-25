import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - PUPQC' : 'PUPQC'}</title>
        <meta name="description" content="Created by PUPians" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header className="text-gray-600 body-font shadow-md">
          {/* <Navbar /> */}
          {/* <Sidebar /> */}
        </header>

        <main className="container m-auto flex px-5 mt-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright ©2023 JBShop</p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
