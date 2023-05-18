import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import CriteriaPopup from '../../components/faculty/CriteriaPopup';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';

import { useForm } from 'react-hook-form';
import { fetchcriteria } from '@/components/hooks/FacultySubject/fetch';
import CriteriaList from '@/components/faculty/grid/CriteriaList';
import { useState } from 'react';
import CriteriaPopup from '../../components/faculty/CriteriaPopup';

function CriteriaScreen() {
  const [showFirstModal, setShowFirstModal] = useState(false);
  // const [showSecondModal, setShowSecondModal] = useState(false);

  const [criteriaObject, setCriteriaObject] = useState({
    criteria_code: '',
    amount: 0,
  });

  const { data: criteria, isLoading } = useQuery(['criteria'], fetchcriteria, {
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setCriteriaObject({ criteria_code: data.code, amount: data.amount });
    setShowFirstModal(true);
  };

  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Criteria</h1>
        <p className="mb-3 text-black-600">
          <span className="font-semibold"> NOTES:</span> Criteria Code must be
          in the format: 4 letters - 3 numbers e.g. CRIT-001
        </p>

        <div className="flex flex-col items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
              <div className="w-2/6">
                <input
                  type="text"
                  placeholder="Criteria Code (CRIT-001)"
                  id="code"
                  // onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg   outline-none block p-2.5 ${
                    errors.code
                      ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                  }`}
                  {...register('code', {
                    required: true,
                    maxLength: 10,
                    pattern: /^[A-Z]{4}-\d{3}$/,
                  })}
                />
              </div>
              <div className="w-2/6">
                <input
                  type="number"
                  placeholder="Criteria Amount"
                  id="amount"
                  max={9}
                  min={1}
                  // onChange={(e) => setAmount(e.target.value)}
                  className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg   outline-none block p-2.5 ${
                    errors.amount
                      ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                  }`}
                  {...register('amount', {
                    required: true,
                  })}
                />
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

      {/* MODAL FIRST POP-UP */}
      {showFirstModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-10 m-8 h-1/2 w-full md:w-10/12 lg:w-6/12 overflow-y-auto">
            <CriteriaPopup amount={criteriaObject.amount} />
          </div>
        </div>
      )}
    </FacultyLayout>
  );
}

CriteriaScreen.auth = {
  role: 'faculty',
};

export default CriteriaScreen;
