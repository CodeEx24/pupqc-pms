import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Processing from '../../Processing';

function TabsContentStudentManagement({
  assessment,
  assessmentItem,
  setShowPerformanceModal,
  studentId,
  classSubjectId,
  criteriaOverall,
  refetchStudentClass,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isProcessing, setIsProcessing] = useState(false);

  const submitScores = async (data) => {
    const values = Object.values(data).map(Number);
    // Update the scores of students in backend

    try {
      setIsProcessing(true);
      const result = await axios.post(
        `/api/student/performance/update/${classSubjectId}/${studentId}`,
        { assessment, values }
      );
      toast.success(result.data.message);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refetchStudentClass();
        setShowPerformanceModal(false);
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while updating student performance.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const assessmentInputElement = assessmentItem.map((item, index) => {
    const fieldName = `${assessment}${index}`; // Field name for error messages
    return (
      <div
        key={`${studentId}${classSubjectId}${fieldName}${index}`}
        className="p-3"
      >
        <p className="text-black z-99 w-full font-semibold">
          {assessment.toUpperCase().replace('_', ' ')} {index + 1}:{' '}
          <span className="font-normal">
            */ {criteriaOverall[assessment][index]}
          </span>
        </p>
        <input
          type="number"
          className="bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none block p-2 w-[28]"
          defaultValue={item}
          id={fieldName}
          {...register(fieldName, {
            pattern: {
              value: /^[0-9]*$/, // Regular expression to match numbers only
              message: 'Please enter a valid number',
            },
            required: 'This field is required',
            max: {
              value: criteriaOverall[assessment][index],
              message: `Maximum value is ${criteriaOverall[assessment][index]}`,
            },
            min: {
              value: 0,
              message: `Minimum value is 0`,
            },
          })}
        />
        {errors[fieldName] && (
          <div className="text-red-600 text-start text-sm mt-2 ml-1">
            <span> {errors[fieldName].message}</span>
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <form className="h-full" onSubmit={handleSubmit(submitScores)}>
        <div className="grid grid-cols-6">{assessmentInputElement}</div>

        <div className="flex justify-end align-bottom h-1/6 mt-4 p-6">
          {/* <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              await setTabDirectiveElement(null);
              setShowPerformanceModal(false);
              await setTabDirectiveElement(null);
            }}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button> */}
          <button
            type="submit"
            // onClick={() => {
            //   console.log('HELLO');
            // }}
            className="bg-sky-500 text-white rounded-md px-4 py-2"
          >
            Submit
          </button>
        </div>
      </form>
      {isProcessing && <Processing text="Processing the Score" />}
    </div>
  );
}

export default TabsContentStudentManagement;
