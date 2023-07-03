import React, { useState } from 'react';
import CriteriaPopup2 from './CriteriaPopup2';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MdOutlineCancel } from 'react-icons/md';

function CriteriaPopup1({
  amount,
  code,
  setShowFirstModal,
  reset,
  refetchCriteriaList,
}) {
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    // formState: { errors: errors2 },
  } = useForm();

  // console.log(code);

  const [criteriaDetails, setCriteriaDetails] = useState({});

  const [showModal2, setShowModal2] = useState(false);

  const submitFirst = (data) => {
    const criteriaCount = Object.keys(data).length / 3;

    const criteriaNames = [];
    const percentageDetails = [];
    const amountDetails = [];

    Array.from({ length: criteriaCount }, (_, index) => {
      const critName = data[`critName${index}`];
      const critPercentage = parseFloat(data[`critPercentage${index}`]) / 100;
      const critAmount = parseFloat(data[`critSubfieldAmount${index}`]);

      criteriaNames.push(critName);
      percentageDetails.push(critPercentage);
      amountDetails.push(critAmount);
    });

    const uniqueNames = new Set(criteriaNames);
    if (uniqueNames.size !== criteriaNames.length) {
      // Duplicates found
      toast.error('Criteria name must be unique.');
      return;
    }

    const accumulatedValue = percentageDetails.reduce(
      (accumulator, percent) => {
        const accumulated = Number(accumulator) + Number(percent * 100);
        return accumulated;
      },
      0
    );

    if (accumulatedValue !== 100) {
      toast.error('The accumulated percentage must be exactly 100');
      return;
    }

    setCriteriaDetails({
      criteria: [...criteriaNames],
      percentage: [...percentageDetails],
      amount: [...amountDetails],
    });

    setShowModal2(true);
  };

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
            {...register2(fieldName, {
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
            {...register2(fieldPercentage, {
              required: true,
            })}
          />
        </div>
        <div className="w-full lg:w-4/12">
          <p className="text-black z-99 w-full font-semibold">
            Subfield Amount {index + 1}:
          </p>
          <input
            type="number"
            className="bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none block p-2 w-full"
            id={fieldAmount}
            {...register2(fieldAmount, {
              required: true,
              // maxLength: 10,
              // pattern: /^[A-Z]{4}-\d{3}$/,
            })}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <form onSubmit={handleSubmit2(submitFirst)}>
        <h1 className="text-sky-500 font-bold text-3xl">Criteria Details</h1>
        <p>Example Name: Lecture, Labaratory</p>
        {assessmentInputs}

        <button
          type="submit"
          className="bg-sky-400 text-white rounded-md py-2 w-full lg:w-4/12 m-3"
        >
          Submit
        </button>
      </form>
      {showModal2 && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-10 m-8 h-1/2 w-full md:w-10/12 lg:w-8/12 overflow-y-auto">
            <button
              className="float-right text-2xl"
              onClick={() => setShowModal2(false)}
            >
              <MdOutlineCancel />
            </button>
            <CriteriaPopup2
              criteriaDetails={criteriaDetails}
              code={code}
              setShowModal2={setShowModal2}
              setShowFirstModal={setShowFirstModal}
              reset={reset}
              refetchCriteriaList={refetchCriteriaList}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CriteriaPopup1;
