import React from 'react';

function styling() {
  return (
    <div>
      <h1 className="text-8xl font-poppins font-bold text-sky-500">
        Hello World
      </h1>
      <h2 className="text-7xl font-poppins font-bold text-sky-500">
        Hello World
      </h2>
      <h3 className="text-6xl font-poppins font-bold text-sky-500">
        Hello World
      </h3>
      <h4 className="text-5xl font-poppins font-bold text-sky-500">
        Hello World
      </h4>
      <h5 className="text-4xl font-poppins font-bold text-sky-500">
        Hello World
      </h5>
      <h6 className="text-3xl font-poppins font-bold text-sky-500">
        Hello World
      </h6>
      <hr className="p-5" />
      <p className="font-bold font-poppins">Hello World</p>
      <p className="font-semibold font-poppins">Hello World</p>
      <p className="font-poppins">Hello World</p>
      <hr className="p-5" />
      <p className="font-poppins text-lg">Hello World LG</p>
      <p className="text-base">Hello World BASE</p>
      <p className="text-sm font-poppins">Hello World SM</p>
      <hr className="p-5" />
      <p className="text-md font-poppins w-5/12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div className="flex p-5 gap-5">
        <button className="btn-primary hover:bg-opacity-60 smooth-transition mt-3 ">
          Hello World
        </button>
        <button className="btn-secondary hover:bg-opacity-60 smooth-transition mt-3 ">
          Hello World
        </button>
        <button className="btn-update hover:bg-opacity-60 smooth-transition mt-3 ">
          Hello World
        </button>
      </div>
    </div>
  );
}

export default styling;
