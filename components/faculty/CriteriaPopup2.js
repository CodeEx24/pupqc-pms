import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { addCriteriaData } from '../hooks/Admin/addData';
import { useState } from 'react';
import Processing from '../Processing';

function CriteriaPopup2({
  criteriaDetails,
  code,
  setShowModal2,
  setShowFirstModal,
  reset,
  refetchCriteriaList,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  console.log(criteriaDetails);
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
  } = useForm();

  const addCriteriaMutation = useMutation(addCriteriaData);

  const submitLast = async (data) => {
    console.log('DATA IN SUBMIT: ', data);
    const errorItems = []; // Array to store item names with accumulated percentages not equal to 100

    // Check the criteriaName if unique to each

    const criteriaSubfieldNameList = [];
    criteriaDetails.criteria.forEach((item, index) => {
      Array.from(Array(criteriaDetails.amount[index]).keys()).forEach(
        (subFieldIndex) => {
          const subfieldName = `${item}Name${subFieldIndex}`;
          criteriaSubfieldNameList.push(data[subfieldName]);
        }
      );
    });

    const uniqueNames = new Set(criteriaSubfieldNameList);
    if (uniqueNames.size !== criteriaSubfieldNameList.length) {
      // Duplicates found
      toast.error('Subfield names must be unique.');
      return;
    }

    // Checking the criteria Percentage
    criteriaDetails.criteria.forEach((item, index) => {
      const accumulated = Array.from(
        Array(criteriaDetails.amount[index]).keys()
      ).reduce((total, subFieldIndex) => {
        const percentage = `${item}Percentage${subFieldIndex}`;
        return total + Number(data[percentage]);
      }, 0);

      if (accumulated !== 100) {
        errorItems.push(item); // Add item name to the errorItems array
      }
    });

    if (errorItems.length > 0) {
      const errorMessage = `The accumulated percentage must be 100 in ${errorItems.join(
        ', '
      )}`;
      toast.error(errorMessage);
      return;
    }

    const transformedData = {};

    criteriaDetails.criteria.forEach((item, index) => {
      const subfields = {};

      Array.from(Array(criteriaDetails.amount[index]).keys()).forEach(
        (subFieldIndex) => {
          const critName = `${item}Name${subFieldIndex}`;
          const weightage = `${data[`${item}Percentage${subFieldIndex}`]}`;
          const description = data[`${item}Description${subFieldIndex}`];

          subfields[data[critName]] = {
            weightage: Number(weightage / 100),
            description,
          };
        }
      );

      transformedData[item] = subfields;
    });

    const transformedDataMain = {
      ...transformedData,
      percentage: {},
    };

    criteriaDetails.criteria.forEach((item, index) => {
      transformedDataMain.percentage[item] = criteriaDetails.percentage[index];
    });

    console.log('transformedDataMain: ', transformedDataMain);
    try {
      setIsProcessing(true);
      const res = await addCriteriaMutation.mutateAsync({
        name: code,
        criteria: transformedDataMain,
      });
      setShowModal2(false);
      setShowFirstModal(false);
      reset();
      await refetchCriteriaList();
      toast.success(res.data.message);
      setIsProcessing(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.message);
      }
      setIsProcessing(false);
    }
  };

  const criteriaElement = criteriaDetails.criteria.map((item, index) => {
    const criteriaInputElement = Array.from(
      { length: criteriaDetails.amount[index] },
      (_, i) => {
        // Rest of your code for each iteration
        const subFieldName = `${item}Name${i}`;
        const subFieldPercentage = `${item}Percentage${i}`;
        const subFieldDescription = `${item}Description${i}`;

        return (
          <div key={i}>
            <div className="p-3 flex flex-col lg:flex-row flex-wrap ">
              <div className="w-full lg:w-6/12 pr-2">
                <p className="text-black z-99 w-full font-semibold">
                  Name {i + 1}:
                </p>
                <input
                  type="text"
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none block p-2 w-full "
                  id={subFieldName}
                  {...register3(subFieldName, {
                    required: 'This field is required',
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: 'Only letters are allowed',
                    },
                  })}
                />
              </div>
              <div className="w-full lg:w-6/12 pl-2">
                <p className="text-black z-99 w-full font-semibold">
                  Percentage {i + 1}:
                </p>
                <input
                  type="number"
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none block p-2 w-full"
                  id={subFieldPercentage}
                  {...register3(subFieldPercentage, {
                    required: 'This field is required',
                    max: { value: 100, message: 'Max value is 100' },
                    min: { value: 1, message: 'Minimum value is 1' },
                  })}
                  step="1"
                />
              </div>

              <div className="w-full lg:w-6/12 pr-2">
                {errors3[subFieldName] && (
                  <p className="text-sm font-poppins text-red-500 mt-2 ">
                    {errors3[subFieldName].message}
                  </p>
                )}
              </div>
              <div className="w-full lg:w-6/12 pl-2">
                {errors3[subFieldPercentage] && (
                  <p className="text-sm font-poppins text-red-500 mt-2 ">
                    {errors3[subFieldPercentage].message}
                  </p>
                )}
              </div>

              <div className="w-full lg:w-full">
                <p className="text-black z-99 w-full font-semibold">
                  Description {i + 1}:
                </p>
                <input
                  type="text"
                  className="bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none block p-2 w-full"
                  id={subFieldDescription}
                  {...register3(subFieldDescription, {
                    required: 'This field is required',
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: 'Only letters are allowed',
                    },
                  })}
                />
              </div>
              <div className="w-full lg:w-full">
                {errors3[subFieldDescription] && (
                  <p className="text-sm font-poppins text-red-500 mt-2 ">
                    {errors3[subFieldDescription].message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      }
    );

    const title = `${item} - ${criteriaDetails.percentage[index] * 100}%`;
    return (
      <div key={`${item}${index}`}>
        <h1 className="text-h6 mt-3">{title}</h1>
        {criteriaInputElement}
      </div>
    );
  });

  return (
    <form onSubmit={handleSubmit3(submitLast)}>
      <h1 className="text-sky-500 font-bold text-3xl">Criteria Subfield</h1>
      {criteriaElement}
      <button
        type="submit"
        className="bg-sky-400 text-white rounded-md py-2 w-full lg:w-4/12 m-3"
      >
        Submit
      </button>
      {isProcessing && <Processing text="Adding the Criteria" />}
    </form>
  );
}

export default CriteriaPopup2;
