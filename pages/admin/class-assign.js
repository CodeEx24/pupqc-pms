import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';

import AdminLayout from '../../components/admin/AdminLayout';
import ClassSubjectList from '../../components/admin/grid/ClassSubjectList';
import { addSubjectClassData } from '../../components/hooks/Admin/addData';
import {
  fetchClassYear,
  fetchCriteria,
  fetchSubjectClass,
  fetchSubjectCode,
  fetchTeacher,
} from '../../components/hooks/Admin/fetch';
import Processing from '../../components/Processing';

function ClassManagementScreen() {
  // HOOK FORM
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  // USE STATE
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // FETCHING DATA NEEDED
  const { data: teachers, isSuccess: teacherIsSucess } = useQuery(
    ['teacher'],
    fetchTeacher
  );
  const { data: subjects, isSuccess: subjectIsSucess } = useQuery(
    ['subject'],
    fetchSubjectCode,
    { enabled: teacherIsSucess }
  );

  const currentYear = new Date().getFullYear();
  const { data: classYears, isSuccess: classIsSucess } = useQuery(
    ['class', currentYear],
    () => fetchClassYear(currentYear),
    { enabled: subjectIsSucess }
  );

  const { data: criterias, isSuccess: criteriaIsSucess } = useQuery(
    ['criteria'],
    fetchCriteria,
    { enabled: classIsSucess }
  );

  const {
    data: subjectClass,
    refetch: refetchSubjectClass,
    isLoading,
  } = useQuery(['subjectClass'], fetchSubjectClass, {
    enabled: criteriaIsSucess,
    refetchOnWindowFocus: false,
  });

  // OPTIONS FOR SELECT
  const subjectOptions = subjects?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const teacherOptions = teachers?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const criteriaOptions = criterias?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const semesterValOption = [
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

  const SubjectClassMemoized = useMemo(
    () => (
      <ClassSubjectList
        subjectClass={subjectClass?.data}
        refetchSubjectClass={refetchSubjectClass}
      />
    ),
    [subjectClass, refetchSubjectClass]
  );

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
    if (name === 'semesterVal') {
      setSelectedSemester(e);
    } else if (name === 'subject_id') {
      setSelectedSubject(e);
    } else if (name === 'class_id') {
      setSelectedClass(e);
    } else if (name === 'teacher_id') {
      setSelectedTeacher(e);
    } else {
      setSelectedCriteria(e);
    }
  };

  const addClassSubjectMutation = useMutation(addSubjectClassData);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true); // Disable the submit button

      await addClassSubjectMutation.mutateAsync(data);

      setSelectedSubject(null);
      setSelectedSemester(null);
      setSelectedClass(null);
      setSelectedCriteria(null);
      setSelectedTeacher(null);
      await refetchSubjectClass();
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
        <h1 className="text-h4 text-primary mb-5">Class Assign</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
              <div className="md:flex gap-3">
                <Select
                  value={selectedTeacher}
                  options={teacherOptions}
                  isClearable
                  placeholder="Select or type to search a teacher"
                  id="teacher_id"
                  {...register('teacher_id', {
                    required: {
                      value: true,
                      message: 'Teacher is required',
                    },
                  })}
                  onChange={(e) => handleInputChange('teacher_id', e)}
                  className="text-p mb-1 w-full lg:w-1/2 "
                  styles={selectStyles('teacher_id')}
                />
                <Select
                  value={selectedSubject}
                  options={subjectOptions}
                  isClearable
                  placeholder="Select or type to search a subject"
                  id="subject_id"
                  {...register('subject_id', {
                    required: {
                      value: true,
                      message: 'Subject is required',
                    },
                  })}
                  onChange={(e) => handleInputChange('subject_id', e)}
                  className="text-p mb-1 w-full lg:w-1/2 "
                  styles={selectStyles('subject_id')}
                />
              </div>
              <div className="md:flex gap-3 mb-3 pl-1">
                <div className="w-1/2">
                  {errors.teacher_id && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.teacher_id.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  {errors.subject_id && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.subject_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="md:flex gap-3">
                <Select
                  value={selectedClass}
                  options={classOptions}
                  isClearable
                  placeholder="Select or type to search a class"
                  id="class_id"
                  {...register('class_id', {
                    required: {
                      value: true,
                      message: 'Class is required',
                    },
                  })}
                  onChange={(e) => handleInputChange('class_id', e)}
                  className="text-p mb-1 w-full lg:w-4/12 "
                  styles={selectStyles('class_id')}
                />
                <Select
                  value={selectedSemester}
                  options={semesterValOption}
                  isClearable
                  placeholder="Select or type to search a semester"
                  id="semesterVal"
                  {...register('semesterVal', {
                    required: {
                      value: true,
                      message: 'Semester is required',
                    },
                  })}
                  onChange={(e) => handleInputChange('semesterVal', e)}
                  className="text-p mb-1 w-full lg:w-4/12 "
                  styles={selectStyles('semesterVal')}
                />

                <Select
                  value={selectedCriteria}
                  options={criteriaOptions}
                  isClearable
                  placeholder="Select or type to search a criteria"
                  id="criteria_id"
                  {...register('criteria_id', {
                    required: {
                      value: true,
                      message: 'Criteria is required',
                    },
                  })}
                  onChange={(e) => handleInputChange('criteria_id', e)}
                  className="text-p mb-1 w-full lg:w-4/12 "
                  styles={selectStyles('criteria_id')}
                />
              </div>
              <div className="md:flex gap-3 mb-3 pl-1">
                <div className="w-1/2">
                  {errors.class_id && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.class_id.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  {errors.semesterVal && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.semesterVal.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  {errors.criteria_id && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.criteria_id.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="lg:w-1/2  md:pr-1.5 text-p ">
                <input
                  type="submit"
                  className="btn-primary "
                  value={'Submit Class'}
                  disabled={submitting} // Disable the button when submitting is true
                />
              </div>
            </form>
          </div>
        </div>
        <div className="w-full">
          {isLoading ? 'Loading...' : SubjectClassMemoized}
        </div>
        {submitting && <Processing text="Adding the class" />}
      </div>
    </AdminLayout>
  );
}

ClassManagementScreen.auth = {
  role: 'admin',
};

export default ClassManagementScreen;
