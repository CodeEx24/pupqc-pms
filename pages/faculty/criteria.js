import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import CriteriaPopup from '../../components/faculty/CriteriaPopup';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';

import { useForm } from 'react-hook-form';
import { fetchcriteria } from '@/components/hooks/FacultySubject/fetch';
import CriteriaList from '@/components/faculty/grid/CriteriaList';

function CriteriaScreen() {
  const { data: criteria, isLoading } = useQuery(['criteria'], fetchcriteria, {
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.name);
    // setFirstStateModal(true);
  };

  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Criteria</h1>
        <div className="flex flex-col items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
              <div className="w-2/6">
                <input
                  type="text"
                  placeholder="Criteria Code"
                  id="code"
                  // onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  {...register('code', {
                    required: 'Please enter a code for criteria',
                    pattern: {
                      value: /^CRIT-\d{3}$/,
                      message:
                        'Code must be in the format CRIT-123 (4Letters-3Numbers)',
                    },
                  })}
                />
                {errors.code && (
                  <div className="text-red-600 text-start text-sm mt-2 ml-1">
                    {errors.code.message}
                  </div>
                )}
              </div>
              <div className="w-2/6">
                <input
                  type="number"
                  placeholder="Amount of Criteria"
                  id="amount"
                  max={9}
                  min={1}
                  // onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                  {...register('amount', {
                    required: 'Please enter amount of criteria',
                    max: {
                      value: 9,
                      message: 'Maximum value is only 9',
                    },
                    min: {
                      value: 1,
                      message: 'Maximum value is only 5',
                    },
                    pattern: {
                      value: /^\d+$/, // regular expression for non-decimal numeric values
                      message: 'Invalid numeric value',
                    },
                    maxLength: {
                      value: 1,
                      message: 'Invalid numeric value',
                    },
                  })}
                />
                {errors.amount && (
                  <div className="text-red-600 text-start text-sm mt-2 ml-1">
                    {errors.amount.message}
                  </div>
                )}
              </div>
              <div className="w-2/6">
                <input type="submit" className="btn-primary" />
              </div>
            </form>
          </div>

          <div className="mb-6 w-full">
            {isLoading ? 'Loading...' : <CriteriaList criteria={criteria} />}
          </div>
        </div>
      </div>
      <div className="h-screen flex my-auto mx-auto shadow-2xl">
        {/* MODAL FIRST POP-UP */}
        {/* {firstStateModal && <CriteriaPopup amount={amount} />} */}
      </div>
    </FacultyLayout>
  );
}

CriteriaScreen.auth = {
  role: 'faculty',
};

export default CriteriaScreen;
