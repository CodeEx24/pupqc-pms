import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import FacultyLayout from '@/components/faculty/FacultyLayout';

import { useMutation, useQuery } from '@tanstack/react-query';
import { addSubjectData } from '../../components/hooks/FacultySubject/addSubjectData';
import {
  fetchClassYear,
  fetchCriteria,
  fetchSubjectClass,
} from '../../components/hooks/FacultySubject/fetch';
import ClassSubjectList from '../../components/faculty/ClassSubjectList';

function SubjectSetupScreen() {
  // Getting userID
  const { data: session } = useSession();
  const userId = session?.user?._id;

  // Fetching userID with
  const {
    data: subjects,
    refetch: refetchSubject,
    isLoading,
  } = useQuery(['subject', userId], fetchSubjectClass);

  const currentYear = new Date().getFullYear();
  const { data: classYears } = useQuery(['class', currentYear], () =>
    fetchClassYear(currentYear)
  );

  const classYearElements = useMemo(() => {
    return classYears?.data.map((year) => (
      <option key={year.id} value={year.id}>
        {year.name}
      </option>
    ));
  }, [classYears]);

  const { data: criteria } = useQuery({
    queryKey: ['criteria'],
    queryFn: fetchCriteria,
  });
  const criteriaElements = useMemo(() => {
    return criteria?.data.map((criterion) => (
      <option key={criterion.id} value={criterion.id}>
        {criterion.name}
      </option>
    ));
  }, [criteria]);

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
      toast.error(error.message);
    }
  };

  return (
    <FacultyLayout title="Subject Setup">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Subject Setup</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
              <div className=" gap-3 md:mb-3 md:flex ">
                <div className="mb-3 md:w-1/2 md:mb-0">
                  <input
                    type="text"
                    placeholder="Subject Name"
                    id="name"
                    // onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${
                      errors.name ? 'border-red-300  ' : 'border-gray-300 '
                    }`}
                    {...register('name', {
                      required: true,
                      maxLength: 50,
                    })}
                  />
                </div>
                <div className="mb-3 md:w-1/2 md:mb-0">
                  <input
                    type="text"
                    placeholder="Subject Description"
                    id="description"
                    // onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${
                      errors.description
                        ? 'border-red-300  '
                        : 'border-gray-300 '
                    }`}
                    {...register('description', {
                      required: true,
                      maxLength: 200,
                    })}
                  />
                </div>
              </div>
              <div className="md:flex gap-3 mb-3 ">
                <div className="w-full mb-3 md:w-2/6 md:mb-0">
                  <select
                    className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${
                      errors.semester ? 'border-red-300  ' : 'border-gray-300 '
                    }`}
                    id="semester"
                    {...register('semester', {
                      required: true,
                    })}
                  >
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">Summer</option>
                  </select>
                </div>
                <div className="w-full mb-3 md:w-2/6 md:mb-0">
                  <select
                    className={`w-full bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 ${
                      errors.class_id ? 'border-red-300  ' : 'border-gray-300 '
                    }`}
                    id="class_id"
                    defaultValue=""
                    {...register('class_id', {
                      required: true,
                    })}
                  >
                    <option disabled value="">
                      Select Class
                    </option>
                    {classYearElements}
                  </select>
                </div>
                <div className="w-full mb-3 md:w-2/6 md:mb-0">
                  <select
                    className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 ${
                      errors.criteria_id
                        ? 'border-red-300  '
                        : 'border-gray-300 '
                    }`}
                    id="criteria_id"
                    defaultValue=""
                    {...register('criteria_id', {
                      required: true,
                    })}
                  >
                    <option disabled value="">
                      Select Criteria
                    </option>
                    {criteriaElements}
                  </select>
                </div>
              </div>
              <div className="w-full md:w-2/6">
                <input type="submit" className="btn-primary" />
              </div>
            </form>
            <div className="mt-6">
              {isLoading ? (
                'Loading...'
              ) : (
                <ClassSubjectList subjects={subjects} />
              )}
            </div>
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
}

SubjectSetupScreen.auth = {
  role: 'faculty',
};

export default SubjectSetupScreen;
