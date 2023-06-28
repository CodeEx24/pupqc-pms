import React, { useState } from 'react';
import {
  updateAddItemCriteriaOverallScores,
  updateCriteriaOverallScores,
  updateDeleteItemCriteriaOverallScores,
} from '../hooks/FacultySubject/updateData';

import { useForm } from 'react-hook-form';

import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from '@syncfusion/ej2-react-navigations';
import TabsContent from './tabs/TabsContent';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import Processing from '../Processing';

function CriteriaButtonElement({
  criteriaOverallList,
  classSubject_id,
  isGradeFinalized,
  refetchCriteriaOverallList,
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
    const words = item.split('_');
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  });

  const headerText = criteriaAssessmentFormatted.map((item) => {
    return {
      text: item,
    };
  });

  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [item, setItem] = useState('');
  const [length, setLength] = useState(0);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    clearErrors('number');
    setValue('number', null);
    setShowModal(false);
  };

  // For saving score (Connected to the next function)
  const handleAddCriteriaClick = (item) => {
    const keyItem = item.toLowerCase().replace(' ', '_');
    setItem(item);
    setLength(
      criteriaOverallList.data.criteriaOverallScores.criteria_overall[keyItem]
        .length + 1
    );

    handleOpenModal();
  };

  const handleSubmitOverallScore = async (data) => {
    try {
      setIsProcessing(true);
      handleCloseModal();

      const inputValue = data.number;
      await updateAddItemCriteriaOverallScores({
        classSubject_id,
        item,
        inputValue,
        length,
      });

      await refetchCriteriaOverallList(); // Refetch the criteriaOverallList
      setValue('number', null);
      toast.success('Overall score item added successfully');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refetchCriteriaOverallList(); // Refetch the criteriaOverallList
      }

      toast.error(error.response.data.message); // Show the error message in toast
    } finally {
      setIsProcessing(false);
    }
  };

  // Update clicker
  const updateCriteriaScoreMutation = useMutation(updateCriteriaOverallScores);
  const handleEditCriteriaClick = async (assessment, value, index) => {
    try {
      setIsProcessing(true);
      await updateCriteriaScoreMutation.mutateAsync({
        classSubject_id,
        assessment,
        value: Number(value),
        index,
      });

      await refetchCriteriaOverallList(); // Refetch the criteriaOverallList
      setValue('number', null);
      handleCloseModal();
      toast.success('Overall score item deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refetchCriteriaOverallList(); // Refetch the criteriaOverallList
      }
      toast.error(error.response.data.message); // Show the error message in toast
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteCriteriaMutation = useMutation(
    updateDeleteItemCriteriaOverallScores
  );

  const handleDeleteCriteriaClick = async (assessment, index) => {
    try {
      setIsProcessing(true);
      await deleteCriteriaMutation.mutateAsync({
        classSubject_id,
        assessment,
        index,
      });

      await refetchCriteriaOverallList(); // Refetch the criteriaOverallList
      setValue('number', null);
      handleCloseModal();
      toast.success('Overall score item deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refetchCriteriaOverallList(); // Refetch the criteriaOverallList
      }
      toast.error(error.response.data.message); // Show the error message in toast
    } finally {
      setIsProcessing(false);
    }
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
              criteriaOverallList?.data.criteriaOverallScores.criteria_overall[
                item
              ]
            }
            isGradeFinalized={isGradeFinalized}
            handleAddCriteriaClick={handleAddCriteriaClick}
            handleEditCriteriaClick={handleEditCriteriaClick}
            handleDeleteCriteriaClick={handleDeleteCriteriaClick}
            // handleDeleteCriteriaClick={handleDeleteCriteriaClick}
          />
        )}
      />
    );
  });

  return (
    <div className="flex flex-wrap items-end gap-5 ">
      <TabComponent heightAdjustMode="Content">
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

      {isProcessing && <Processing text={'Processing the Criteria'} />}
    </div>
  );
}

export default CriteriaButtonElement;
