import React from 'react';

import { useForm } from 'react-hook-form';

function CriteriaPopup({ amount }) {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  const assessmentInputs = Array.from({ length: amount }, (_, index) => {
    const fieldName = `critName${index}`;
    const fieldPercentage = `critPercentage${index}`;
    const fieldAmount = `critSubfieldAmount${index}`;

    return (
      <div key={index} className="p-3 flex flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-4/12">
          <p className="text-black z-99 w-full font-semibold">
            Name {index + 1}:
          </p>
          <input
            type="text"
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none block p-2 w-full"
            id={fieldName}
            {...register(fieldName, {
              required: true,
            })}
          />
        </div>
        <div className="w-full lg:w-4/12">
          <p className="text-black z-99 w-full font-semibold">
            Percentage {index + 1}:
          </p>
          <input
            type="number"
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none block p-2 w-full"
            id={fieldPercentage}
            {...register(fieldPercentage, {
              required: true,
            })}
          />
        </div>
        <div className="w-full lg:w-4/12">
          <p className="text-black z-99 w-full font-semibold">
            Assessment Amount {index + 1}:
          </p>
          <input
            type="number"
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none block p-2 w-full"
            id={fieldAmount}
            {...register(fieldAmount, {
              required: true,
              maxLength: 10,
              pattern: /^[A-Z]{4}-\d{3}$/,
            })}
          />
        </div>
      </div>
    );
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-sky-500 font-bold text-3xl">Criteria Details</h1>
      <p>Example Name: Lecture, Labaratory</p>
      {assessmentInputs}
      <div className="w-full flex lg:pr-12">
        <input
          type="submit"
          className="bg-sky-400 text-white rounded-md py-2 w-full lg:w-4/12 m-3"
        />
      </div>
    </form>
  );
}

export default CriteriaPopup;
