import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentNavbar from './StudentNavbar';

function StudentLayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - PUPQC' : 'PUPQC'}</title>
        <meta name="description" content="Created by PUPians" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />
      <div className="bg-gray-100">
        <StudentNavbar />

        <div className="max-w-screen">
          <div className="max-w-screen-xl items-center justify-between mx-auto ">
            <main className="mt-10 md:mt-0 px-4 md:px-8 pt-6 flex min-h-fit flex-col justify-between rounded-xl ">
              {children}
            </main>
          </div>
        </div>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* <>
          <div className="flex relative ">
      
            {activeMenu ? (
              <div className="w-72 fixed sidebar bg-white">
                <StudentSidebar />
              </div>
            ) : (
              <div className="w-0 ">
                <StudentSidebar />
              </div>
            )}

     
            <div
              className={` bg-main-bg min-h-screen w-full ${
                activeMenu ? 'md:ml-72 ' : 'flex-2'
              }`}
            >
              <div className="fixed md:static bg-main-bg  navbar w-full">
                <StudentNavbar />
              </div>
              <main className="mt-10 md:mt-0 px-4 md:px-8 pt-6 flex min-h-screen flex-col justify-between rounded-xl">
                {children}
              </main>
              <div className="flex justify-between align-middle p-2 md:mx-6 relative"></div>
            </div>
          </div>
        </> */}
        </div>
        <div className="max-w-screen bg-white py-10 ">
          <footer className="max-w-screen-xl items-center justify-between mx-auto px-12 ">
            <h1 className="text-secondary text-h5 mb-2">Contact Information</h1>
            <div className="flex">
              <div className="w-4/12">
                <h5 className="text-p font-semibold">Email: </h5>
                <p className="text-p">quezoncity@pup.edu.ph</p>
              </div>
              <div className="w-4/12">
                <h5 className="text-p font-semibold">Postal Mail: </h5>
                <p className="text-p">PUP Quezon City Branch</p>
                <p className="text-p">Don Fabian St., Commonwealth</p>
                <p className="text-p">Quezon City Philippines</p>
              </div>
              <div className="w-4/12">
                <h5 className="text-p font-semibold">Telephone: </h5>
                <p className="text-p">(632) 8952-7818</p>
                <p className="text-p">(632) 8287-8204</p>
              </div>
            </div>
          </footer>{' '}
        </div>
      </div>
    </>
  );
}

export default StudentLayout;
