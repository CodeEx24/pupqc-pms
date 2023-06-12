import React, { useState } from 'react';
import {
  updateAddItemCriteriaOverallScores,
  updateDeleteItemCriteriaOverallScoresDelete,
} from '../hooks/FacultySubject/updateData';

import { useForm } from 'react-hook-form';

import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from '@syncfusion/ej2-react-navigations';
import TabsContent from './tabs/TabsContent';
import { toast } from 'react-toastify';

function CriteriaButtonElement({
  criteriaOverallList,
  classSubject_id,
  isGradeFinalized,
}) {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();

  const criteriaAssessment = Object?.keys(
    criteriaOverallList?.data.criteriaOverallScores.criteria_overall
  );

  const criteriaAssessmentFormatted = criteriaAssessment.map((item) => {
    const words = item.split('_'); // split the string into an array of words
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }); // capitalize the first letter of each word
    return capitalizedWords.join(' '); // join the words back into a string with a space between them
  });

  const headerText = criteriaAssessmentFormatted.map((item) => {
    return {
      text: item,
    };
  });

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [item, setItem] = useState('');

  const [length, setLength] = useState(0);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearErrors('number');
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleSubmitOverallScore = async (data) => {
    console.log('INPUT BVALUE: ', data.number);
    console.log('ITEM IN SUBMIT: ', item);
    try {
      const inputValue = data.number;
      await updateAddItemCriteriaOverallScores({
        classSubject_id,
        item,
        inputValue,
        length,
      });
      // If success update the data in frontend manually
      criteriaOverallList.data.criteriaOverallScores.criteria_overall[item] = [
        ...criteriaOverallList.criteriaOverallScores.data.criteria_overall[
          item
        ],
        data.number,
      ];
      setValue('number', null);
      handleCloseModal();
      toast.success('Overall score item added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOverallScore = async () => {
    console.log('ITEM: ', item);
    console.log('length: ', length - 1);
    try {
      await updateDeleteItemCriteriaOverallScoresDelete({
        item,
        length,
        classSubject_id,
      });
      criteriaOverallList.data.criteriaOverallScores.criteria_overall[item] =
        criteriaOverallList.data.criteriaOverallScores.criteria_overall[
          item
        ].slice(0, -1);

      handleDeleteCloseModal();
      toast.success('Overall score item deleted successfully');
    } catch (error) {
      handleDeleteCloseModal();
      toast.error(error);
    }
  };

  const handleDeleteCriteriaClick = (item) => {
    const keyItem = item.toLowerCase().replace(' ', '_');
    setItem(item);
    setLength(
      criteriaOverallList.data.criteriaOverallScores.criteria_overall[keyItem]
        .length
    );
    // console.log('ITEM: ', item);
    // console.log('length: ', length);
    handleDeleteModal();
  };

  const handleAddCriteriaClick = (item) => {
    const keyItem = item.toLowerCase().replace(' ', '_');
    setItem(item);
    setLength(
      criteriaOverallList.data.criteriaOverallScores.criteria_overall[keyItem]
        .length + 1
    );
    console.log(item, length);
    handleOpenModal();
  };

  const tabItemDirectiveElement = criteriaAssessment.map((item, index) => {
    return (
      <TabItemDirective
        key={item}
        header={headerText[index]}
        // pass the item
        content={() => (
          <TabsContent
            assessment={item}
            criteriaOverall={
              criteriaOverallList.data.criteriaOverallScores.criteria_overall[
                item
              ]
            }
            handleAddCriteriaClick={handleAddCriteriaClick}
            handleDeleteCriteriaClick={handleDeleteCriteriaClick}
            isGradeFinalized={isGradeFinalized}
          />
        )}
      />
    );
  });

  return (
    <div className="flex flex-wrap items-end gap-5 mb-80">
      <TabComponent heightAdjustMode="Auto">
        <TabItemsDirective>{tabItemDirectiveElement}</TabItemsDirective>
      </TabComponent>

      {showModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-6">
            <h2 className="text-lg font-medium mb-2">
              Enter overall scores for {item.replace(/_/g, ' ')} #{length}:
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

      {showDeleteModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleSubmit(handleDeleteOverallScore)}>
            <div className="bg-white rounded-md p-6">
              <h2 className="text-lg font-medium mb-2">
                Are you sure you want to delete the last item?
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
                  type="submit"
                  className="bg-red-500 text-white rounded-md px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CriteriaButtonElement;
