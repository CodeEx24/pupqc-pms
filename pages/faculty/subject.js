import React from 'react';
import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchAllSubject } from '../../components/hooks/FacultySubject/fetch';
import { toast } from 'react-toastify';
import SubjectList from '../../components/faculty/grid/SubjectList';
import { addSubjectData } from '../../components/hooks/FacultySubject/addData';
import { useMemo } from 'react';

function SubjectScreen() {
  //  Get the subject code and the subject name
  const {
    data: subjects,
    isLoading,
    refetch: refetchSubject,
  } = useQuery(['subject'], fetchAllSubject, { refetchOnWindowFocus: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addSubjectMutation = useMutation(addSubjectData);
  const onSubmit = async (data) => {
    try {
      await addSubjectMutation.mutateAsync(data);
      refetchSubject();
      toast.success('Subject added successfully');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const SubjectListMemoized = useMemo(
    () => <SubjectList subjects={subjects} />,
    [subjects]
  );

  return (
    <FacultyLayout title="Subject Setup">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Subject Lists</h1>

        <p className="mb-3 text-black-600">
          <span className="font-semibold"> NOTES:</span> Subject Code must be in
          the format: 4 letters - 3 numbers e.g. ITCS-231
        </p>

        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className=" gap-3 md:mb-3 md:flex ">
                <div className="mb-3 md:w-1/2 md:mb-0">
                  <input
                    type="text"
                    placeholder="Subject Code"
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
                <div className="mb-3 md:w-1/2 md:mb-0">
                  <input
                    type="text"
                    placeholder="Subject Name"
                    id="name"
                    // onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg   outline-none block p-2.5 ${
                      errors.name
                        ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                    }`}
                    {...register('name', {
                      required: true,
                      maxLength: 200,
                    })}
                  />
                </div>
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  placeholder="Subject Description"
                  id="description"
                  rows={4}
                  // onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg    outline-none block p-2.5 ${
                    errors.description
                      ? 'border-red-600/[.55]  focus:ring-red-500 focus:border-red-500 '
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                  }`}
                  {...register('description', {
                    required: true,
                    maxLength: 200,
                  })}
                />
              </div>
              <div className="w-full">
                <input type="submit" className="btn-primary" />
              </div>
            </form>
            <div className="mt-6">
              {isLoading ? 'Loading...' : SubjectListMemoized}
            </div>
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
}

SubjectScreen.auth = {
  role: 'faculty',
};

export default SubjectScreen;
