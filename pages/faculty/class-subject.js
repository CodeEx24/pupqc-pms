import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';

import FacultyLayout from '@/components/faculty/FacultyLayout';
import { fetchSubjectCode } from '@/components/hooks/FacultySubject/fetch';

import Select from 'react-select';
import {
  fetchClassYear,
  fetchCriteria,
  fetchSubjectClass,
} from '../../components/hooks/FacultySubject/fetch';
import { useMemo } from 'react';
import { addSubjectClassData } from '../../components/hooks/FacultySubject/addData';
import { toast } from 'react-toastify';
import ClassSubjectList from '../../components/faculty/grid/ClassSubjectList';
import Loading from '../../components/Loading';

function ClassSubjectScreen() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const {
    data: subjectClass,
    refetch: refetchSubjectClass,
    isLoading,
  } = useQuery(['subjectClass'], fetchSubjectClass);

  // Fetch the data needed for selection
  const { data: subjects } = useQuery(['subject'], fetchSubjectCode);

  const currentYear = new Date().getFullYear();
  const { data: classYears } = useQuery(['class', currentYear], () =>
    fetchClassYear(currentYear)
  );

  const { data: criteria } = useQuery(['criteria'], fetchCriteria);

  // Usestate for selected options
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedCriteria, setSelectedCriteria] = useState(null);

  // Options for select
  const subjectOptions = subjects?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const semesterOption = [
    { value: 1, label: '1st Semester' },
    { value: 2, label: '2nd Semester' },
    { value: 3, label: 'Summer Term' },
  ];

  const classOptions = useMemo(() => {
    return classYears?.data?.map((classItem) => ({
      value: classItem.id,
      label: classItem.name,
    }));
  }, [classYears]);

  const criteriaOptions = useMemo(() => {
    if (!criteria?.data) return []; // add a conditional statement to check if criteria has a value
    return criteria.data.map((criteriaItem) => ({
      value: criteriaItem.id,
      label: criteriaItem.name,
    }));
  }, [criteria]);

  // Input Change
  const handleInputChange = (name, e) => {
    if (!e) {
      return;
    }

    setValue(name, e.value);
    clearErrors(name);
    if (name === 'semester') {
      setSelectedSemester(e);
    } else if (name === 'subject_id') {
      setSelectedSubject(e);
    } else if (name === 'class_id') {
      setSelectedClass(e);
    } else {
      setSelectedCriteria(e);
    }
  };

  // When data is submitted
  const addClassMutation = useMutation(addSubjectClassData);
  const onSubmit = async (data) => {
    try {
      await addClassMutation.mutateAsync(data);
      refetchSubjectClass();
      setSelectedSubject(null);
      setSelectedSemester(null);
      setSelectedClass(null);
      setSelectedCriteria(null);
      toast.success('Subject added successfully');
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Handle backend error message
        toast.error(error.response.data.message);
      } else {
        // Handle other errors
        toast.error('An error occurred while adding the subject');
      }
    }
  };

  // Select styles
  const selectStyles = (name) => {
    return {
      control: (baseStyles, state) => ({
        ...baseStyles,
        borderRadius: '0.5rem',
        borderColor:
          errors[name] && state.isFocused
            ? '#f56565'
            : state.isFocused
            ? '#4299E1'
            : errors[name]
            ? '#f565658c'
            : '#9CA3AF',
        boxShadow: 'none',
        '&:hover': {
          borderColor: '',
        },
      }),
    };
  };

  return (
    <FacultyLayout title="Subject Setup">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="title">Class Subject</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
              <div className="md:flex gap-3">
                <Select
                  value={selectedSubject}
                  options={subjectOptions}
                  isClearable
                  placeholder="Select or type to search a subject"
                  id="subject_id"
                  {...register('subject_id', { required: true })}
                  onChange={(e) => handleInputChange('subject_id', e)}
                  className="mb-3 w-full lg:w-1/2 "
                  styles={selectStyles('subject_id')}
                />
                <Select
                  value={selectedSemester}
                  options={semesterOption}
                  isClearable
                  placeholder="Select or type to search a semester"
                  id="semester"
                  {...register('semester', { required: true })}
                  onChange={(e) => handleInputChange('semester', e)}
                  className="mb-3 w-full lg:w-1/2 "
                  styles={selectStyles('semester')}
                />
              </div>
              <div className="md:flex gap-3">
                <Select
                  value={selectedClass}
                  options={classOptions}
                  isClearable
                  placeholder="Select or type to search a section"
                  id="class_id"
                  {...register('class_id', { required: true })}
                  onChange={(e) => handleInputChange('class_id', e)}
                  className="mb-3 w-full lg:w-1/2 "
                  styles={selectStyles('class_id')}
                />
                <Select
                  value={selectedCriteria}
                  options={criteriaOptions}
                  isClearable
                  placeholder="Select or type to search a criteria"
                  id="criteria_id"
                  {...register('criteria_id', { required: true })}
                  onChange={(e) => handleInputChange('criteria_id', e)}
                  className="mb-3 w-full lg:w-1/2 "
                  styles={selectStyles('criteria_id')}
                />
              </div>
              <div className="lg:w-1/2  md:pr-1.5">
                <input type="submit" className="btn-primary " />
              </div>
            </form>
          </div>
        </div>
        <div className="w-full">
          {isLoading ? (
            <Loading />
          ) : (
            <ClassSubjectList subjectClass={subjectClass} />
          )}
        </div>
      </div>
    </FacultyLayout>
  );
}

ClassSubjectScreen.auth = {
  role: 'faculty',
};

export default ClassSubjectScreen;
