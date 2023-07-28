import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';

import AdminLayout from '../../components/admin/AdminLayout';
import { addStudentPassers } from '../../components/hooks/Admin/addData';
import {
  fetchGraduatedStudent,
  fetchStudentPassersList,
} from '../../components/hooks/Admin/fetch';
import Processing from '../../components/Processing';
import StudentPasserList from '../../components/admin/grid/StudentPassersList';

function StudentScreen() {
  // HOOK FORM
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { data: studentPassersList, isLoading } = useQuery(
    ['studentPassersList'],
    () => fetchStudentPassersList()
  );

  if (!isLoading) {
    console.log('HEREL ', studentPassersList.data);
  }

  // USE STATE
  const [selectedExamType, setSelectedExamType] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();
  const { data: graduatedStudent } = useQuery(
    ['graduatedStudent', currentYear],
    () => fetchGraduatedStudent(currentYear),
    {
      enabled: false, // Disable automatic refetching on mount
    }
  );
  const examTypeOption = [
    {
      value: 'Licensure Examination for Professional Teachers',
      label: 'Licensure Examination for Professional Teachers',
    },
    { value: 'Human Resources', label: 'Human Resources' },
    {
      value: 'Others (BAR Exam, Engineering, etc.)',
      label: 'Others (BAR Exam, Engineering, etc.)',
    },
  ];

  const studentOptions = useMemo(() => {
    return graduatedStudent?.data?.map((classItem) => ({
      value: classItem.student_id,
      label: classItem.name,
    }));
  }, [graduatedStudent]);

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
            : '#CBD5E0',
        backgroundColor: '#F9FAFB',
        padding: '2px',
        boxShadow: 'none',
        '&:hover': {
          borderColor: '',
        },
      }),
    };
  };

  // Input Change
  const handleInputChange = (name, e) => {
    if (!e) {
      return;
    }

    setValue(name, e.value);
    clearErrors(name);
    if (name === 'examTypeVal') {
      setSelectedExamType(e);
    } else {
      setSelectedStudentId(e);
    }
  };

  const addStudentPassersMutation = useMutation(addStudentPassers);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true); // Disable the submit button

      await addStudentPassersMutation.mutateAsync(data);

      setSelectedExamType(null);
      setSelectedStudentId(null);
      setValue('scores', '');

      //   await refetchSubjectClass();
      toast.success('Subject added successfully');
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Handle backend error message
        toast.error(error.response.data.message);
      } else {
        // Handle other errors
        toast.error('An error occurred while adding the subject');
      }
    } finally {
      setSubmitting(false); // Enable the submit button
    }
  };

  return (
    <AdminLayout title="Class Assign">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Student Passers</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
              <div className="md:flex gap-3">
                <Select
                  value={selectedStudentId}
                  options={studentOptions}
                  isClearable
                  placeholder="Select or type to search a student"
                  id="student_id"
                  {...register('student_id', {
                    required: {
                      value: true,
                      message: 'Student is required',
                    },
                  })}
                  onChange={(e) => handleInputChange('student_id', e)}
                  className="text-p mb-1 w-full lg:w-4/12 "
                  styles={selectStyles('student_id')}
                />

                <Select
                  value={selectedExamType}
                  options={examTypeOption}
                  isClearable
                  placeholder="Select or type to search a examination"
                  id="examTypeVal"
                  {...register('examTypeVal', {
                    required: {
                      value: true,
                      message: 'Examination is required',
                    },
                  })}
                  onChange={(e) => handleInputChange('examTypeVal', e)}
                  className="text-p mb-1 w-full lg:w-4/12 "
                  styles={selectStyles('examTypeVal')}
                />

                <input
                  type="number" // Set the input type to "number" to allow only numeric values
                  placeholder="Scores"
                  id="scores"
                  // onChange={(e) => setName(e.target.value)}
                  className={`w-full lg:w-4/12 mb-1 bg-gray-50 border text-gray-900 text-p rounded-lg outline-none block p-2 ${
                    errors.scores
                      ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                  }`}
                  {...register('scores', {
                    required: 'Scores is required',
                    maxLength: {
                      value: 200,
                      message: 'Name must be a maximum of 200 characters',
                    },
                    // Add custom validation to check if the value is a valid number
                    pattern: {
                      value: /^[0-9]+$/, // Regular expression to match only numbers
                      message: 'Please enter a valid number',
                    },
                  })}
                />
              </div>
              <div className="md:flex gap-3 mb-3 pl-1">
                <div className="w-1/2">
                  {errors.student_id && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.student_id.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  {errors.examTypeVal && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.examTypeVal.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  {errors.scores && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.scores.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="lg:w-1/2  md:pr-1.5 text-p ">
                <input
                  type="submit"
                  className="btn-primary "
                  value={'Submit'}
                  disabled={submitting} // Disable the button when submitting is true
                />
              </div>
            </form>
          </div>
        </div>
        <div className="w-full">
          {isLoading ? (
            'Loading...'
          ) : (
            <StudentPasserList studentPassersList={studentPassersList.data} />
          )}
        </div>
        {submitting && <Processing text="Adding the class" />}
      </div>
    </AdminLayout>
  );
}

StudentScreen.auth = {
  role: 'admin',
};

export default StudentScreen;
