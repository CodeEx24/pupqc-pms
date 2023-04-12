import FacultyLayout from '@/components/faculty/FacultyLayout';
// import { useState } from 'react';
// import CriteriaPopup from '../../components/faculty/CriteriaPopup';
// import withStudentAuth from '@/utils/authentication/withStudentAuth';

import { useForm } from 'react-hook-form';

function CriteriaScreen() {
  // const [amount, setAmount] = useState(1);
  // const [name, setName] = useState('');
  // const [firstStateModal, setFirstStateModal] = useState(false); //Should be in stata management

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
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
              <div className="w-2/6">
                <input
                  type="text"
                  placeholder="Criteria Name"
                  id="name"
                  // onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  {...register('name', {
                    required: 'Please enter a name of criteria',
                    maxLength: 20,
                  })}
                />
                {errors.name && (
                  <div className="text-red-600 text-start text-sm mt-2">
                    {errors.name.message}
                  </div>
                )}
              </div>
              <div className="w-2/6">
                <input
                  type="number"
                  placeholder="Amount of Criteria"
                  id="amount"
                  max={5}
                  min={1}
                  // onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                  {...register('amount', {
                    required: 'Please enter amount of criteria',
                    max: {
                      value: 5,
                      message: 'Maximum value is only 5',
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
                  <div className="text-red-600 text-start text-sm mt-2">
                    {errors.amount.message}
                  </div>
                )}
              </div>
              <div className="w-2/6">
                <input type="submit" className="btn-primary" />
              </div>
            </form>
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
