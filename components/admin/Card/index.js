import React from 'react';

function Card({ title, value, words }) {
  return (
    <div className="bg-white  h-44 rounded-xl w-4/12 p-8 pt-9 bg-hero-pattern bg-no-repeat bg-contain bg-right">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-h5">{title}</p>
          <p className="text-2xl text-gray-600">{value}</p>
        </div>
      </div>
      <div className="my-6">
        <p className="text-p text-black">{words}</p>
      </div>
    </div>
  );
}

export default Card;
