import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

function TabsContent({
  assessment,
  criteriaOverall,
  isGradeFinalized,
  handleAddCriteriaClick,
  handleDeleteCriteriaClick,
  handleEditCriteriaClick,
}) {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [position, setPosition] = useState(0);

  const handleShowEditCriteriaModal = (index) => {
    setPosition(index);
    setShowEditModal(true);
    // setPosition(index);
    // setShowDeleteModal(true);
  };

  const handleEditCriteriaModalClose = () => {
    clearErrors('number');
    setValue('number', null);
    setShowEditModal(false);
  };

  const handleShowDeleteModal = (index) => {
    setPosition(index);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    handleDeleteCriteriaClick(assessment, position);
  };

  const criteriaListElement = criteriaOverall?.map((item, index) => {
    return (
      <div
        className="flex justify-between gap-2 p-2   w-full md:w-1/2 lg:w-4/12"
        key={index}
      >
        <div className="bg-gray-50 w-full flex justify-between px-4 py-4 rounded-lg shadow-md">
          <div className="flex items-center gap-4 ">
            <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center">
              <p className="text-white font-bold text-p">{index + 1}</p>
            </div>
            <p className="text-p font-semibold">
              {assessment
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase())}
              {' - '}
              {criteriaOverall[index]}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className={`text-brand text-h5 ${
                isGradeFinalized && 'opacity-30'
              }`}
              disabled={isGradeFinalized}
              onClick={() => handleShowEditCriteriaModal(index)}
            >
              <FiEdit />
            </button>
            <button
              className={`text-secondary text-h5 ${
                isGradeFinalized && 'opacity-30'
              }`}
              disabled={isGradeFinalized}
              onClick={() => handleShowDeleteModal(index)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="p-3 border border-gray-50">
        <div className="p-3">
          <h3 className="text-gray-800 text-xl font-bold mb-3">
            {assessment.toUpperCase().replace(/_/g, ' ')}
          </h3>
          {isGradeFinalized && (
            <p className="text-p text-secondary">
              You cannot perform any actions on this as the grade has already
              been finalized.
            </p>
          )}

          <div className="flex flex-wrap">
            {criteriaListElement.length ? (
              criteriaListElement
            ) : (
              <p className="text-lg text-gray-800">NO RECORDS</p>
            )}
          </div>
          <div className="flex gap-5 mt-3">
            {!isGradeFinalized && (
              <>
                <button
                  className="btn-primary px-3 ml-2"
                  onClick={() => handleAddCriteriaClick(assessment)}
                >
                  ADD {assessment.toUpperCase().replace(/_/g, ' ')}
                </button>
                {/* <button
                  className="btn-secondary px-3"
                  onClick={() => handleDeleteCriteriaClick(assessment)}
                >
                  DELETE LAST {assessment.toUpperCase().replace(/_/g, ' ')}
                </button> */}
              </>
            )}
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-6">
            <h2 className="text-lg font-medium mb-2">
              Are you sure you want to delete the item?
            </h2>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteModalClose()}
                className="bg-red-500 text-white rounded-md px-4 py-2"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-6">
            <h2 className="text-lg font-medium mb-2">
              Enter overall scores for{' '}
              {assessment
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase())}{' '}
              #{position + 1}:
            </h2>
            <form
              onSubmit={handleSubmit((data) =>
                handleEditCriteriaClick(assessment, data.number, position)
              )}
            >
              <p className="text-p font-medium mb-2 break-words">
                <span className="font-semibold text-gray-800">Notes:</span>{' '}
                Editing the values of this will reset the scores of all students
                in{' '}
                <span className="text-primary">
                  {assessment
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}{' '}
                  #{position + 1}{' '}
                </span>
                to 0.
              </p>
              <input
                type="number"
                id="number"
                className={`border text-black bg-gray-50 outline-none rounded-md p-2 w-full ${
                  errors.number
                    ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                }`}
                {...register('number', {
                  required: 'Overall score is required',
                  min: {
                    value: 0,
                    message: 'Minimum value must be 0', // Update the minimum value message here
                  },
                })}
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.number.message}
                </p>
              )}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => handleEditCriteriaModalClose()}
                  className="mr-4 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary rounded-md px-4 py-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TabsContent;
