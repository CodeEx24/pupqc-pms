import DefaultLayout from '@/components/DefaultLayout';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <DefaultLayout title="">
      <div className=" flex h-screen w-screen items-center px-6 py-20 md:px-28 lg:w-3/6 lg:pr-0">
        <div className=" bg-black bg-opacity-80 p-10  text-center rounded-lg ">
          {/* PUP Logo and Title */}
          <div>
            <Image
              src="/logo/puplogo.png"
              alt="PUPLogo"
              width={100}
              height={100}
              // Make the logo width responsive using Tailwind classes
              className="object-cover object-center rounded-lg mx-auto w-16 md:w-28 lg:w-32"
            />
            <h1 className="text-white font-poppins text-2xl font-extrabold mt-3 md:text-4xl md:mt-8">
              Welcome PUPian!
            </h1>
            <p className="text-white text-md font-poppins mt-3 mb-3 md:text-lg">
              Please click or tap your destination.
            </p>
          </div>

          <div className="">
            <Link href="/student">
              <button className="bg-sky-600 text-white w-full rounded-md py-2 mt-3">
                Student
              </button>
            </Link>
            <Link href="/faculty">
              <button className="bg-red-700 text-white w-full rounded-md py-2 mt-3 md:mt-4">
                Faculty
              </button>
            </Link>
          </div>
          <div>
            <p className="text-sm text-white mt-3">
              By using this service, you understood and agree to the PUP Online
              Services Terms of Use and Privacy Statement
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
