import React from 'react';

function Card({ title, value, words, image, additionalClassName }) {
  return (
    <div className={`w-full lg:w-4/12 md:w-6/12 flex ${additionalClassName}`}>
      <div className="bg-white  rounded-tl-xl rounded-bl-xl md:w-1/2 w-full p-8 pt-9 ">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-p md:text-h5 font-bold">{title}</p>
            <p className="text-p md:text-2xl text-gray-600">{value}</p>
          </div>
        </div>
        <div className="my-6">
          <p className="text-p md:text-p text-black">{words}</p>
        </div>
      </div>
      <div
        className={`bg-white  rounded-tr-xl rounded-br-xl  md:w-1/2 w-full p-8 pt-9 ${image} bg-no-repeat bg-cover bg-center shadow-md `}
      ></div>
    </div>
  );
}

export default Card;
