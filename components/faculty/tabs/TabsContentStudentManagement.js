import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function TabsContentStudentManagement({
  assessment,
  assessmentItem,
  setShowPerformanceModal,
  studentId,
  classSubjectId,
  criteriaOverall,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const assessmentInputElement = assessmentItem.map((item, index) => {
    const fieldName = `${assessment}${index}`; // Field name for error messages

    return (
      <div key={index} className="p-3">
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
            required: true,
            max: {
              value: criteriaOverall[assessment][index],
              message: `Maximum value is ${criteriaOverall[assessment][index]}`,
            },
          })}
        />
        {errors[fieldName] && (
          <div className="text-red-600 text-start text-sm mt-2 ml-1">
            {errors[fieldName].message}
          </div>
        )}
      </div>
    );
  });

  const submitScores = async (data) => {
    console.log('DATA SCORES: ', data);
    const values = Object.values(data).map(Number);

    console.log('VALUES', values);
    console.log('ASSESSMENT: ', assessment);
    console.log('STUDENT ID: ', studentId);
    console.log('CLASS SUBJECT ID: ', classSubjectId);

    // Update the scores of students in backend
    try {
      const result = await axios.post(
        `/api/student/performance/update/${classSubjectId}/${studentId}`,
        { assessment, values }
      );
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <form className="h-full" onSubmit={handleSubmit(submitScores)}>
        <div className="grid grid-cols-6">{assessmentInputElement}</div>

        <div className="flex justify-end align-bottom h-1/6 mt-4 p-6">
          <button
            type="button"
            onClick={() => setShowPerformanceModal(false)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => {
              console.log('HELLO');
            }}
            className="bg-sky-500 text-white rounded-md px-4 py-2"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default TabsContentStudentManagement;
