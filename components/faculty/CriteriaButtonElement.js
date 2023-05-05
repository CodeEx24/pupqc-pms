import React, { useState } from 'react';
import { updateCriteriaOverallScores } from '../hooks/FacultySubject/updateData';

import { useForm } from 'react-hook-form';

function CriteriaButtonElement({ criteriaOverallList, classSubject_id }) {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();

  const criteriaAssessment = Object?.keys(
    criteriaOverallList?.data.criteria_overall
  );

  const criteriaAssessmentFormatted = criteriaAssessment.map((item) => {
    const words = item.split('_'); // split the string into an array of words
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }); // capitalize the first letter of each word
    return capitalizedWords.join(' '); // join the words back into a string with a space between them
  });

  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState('');

  const [length, setLength] = useState(0);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearErrors('number');
  };

  const handleSubmitOverallScore = (data) => {
    console.log('INPUT BVALUE: ', data.number);
    const inputValue = data.number;
    updateCriteriaOverallScores({
      classSubject_id,
      item,
      inputValue,
      length,
    });
    setValue('number', null);
    handleCloseModal();
  };

  const handleCriteriaClick = (item) => {
    const keyItem = item.toLowerCase().replace(' ', '_');

    setItem(item);
    setLength(criteriaOverallList.data.criteria_overall[keyItem].length + 1);
    handleOpenModal();
  };

  const addCriteriaElement = criteriaAssessmentFormatted.map((assessment) => {
    return (
      <button
        key={assessment}
        className="text-white bg-sky-500 w-40 py-2  rounded-md"
        onClick={() => handleCriteriaClick(assessment)}
      >
        Add {`${assessment}`}
      </button>
    );
  });

  return (
    <div className="flex flex-wrap items-end gap-5">
      {addCriteriaElement}
      {showModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-6">
            <h2 className="text-lg font-medium mb-2">
              Enter overall scores for {item} {length}:
            </h2>
            <form onSubmit={handleSubmit(handleSubmitOverallScore)}>
              <input
                type="number"
                id="number"
                className={`border text-black bg-gray-50 outline-none rounded-md p-2 w-full ${
                  errors.number
                    ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                }`}
                min={0}
                {...register('number', { required: true })}
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-4 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-500 text-white rounded-md px-4 py-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CriteriaButtonElement;
