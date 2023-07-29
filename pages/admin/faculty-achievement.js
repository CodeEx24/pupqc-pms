import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';

import AdminLayout from '../../components/admin/AdminLayout';
import { addFacultyAchievement } from '../../components/hooks/Admin/addData';
import {
  fetchFacultyAchievementList,
  fetchFacultyMembers,
} from '../../components/hooks/Admin/fetch';
import Processing from '../../components/Processing';
import FacultyAchievementList from '../../components/admin/grid/FacultyAchievementList';

function FacultyScreen() {
  // HOOK FORM
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const {
    data: facultyAchievementList,
    isLoading,
    refetch: refetchFacultyAchievementList,
  } = useQuery(['facultyAchievementList'], () => fetchFacultyAchievementList());

  if (!isLoading) {
    console.log('HEREL ', facultyAchievementList.data);
  }

  // USE STATE
  const [selectedAchievementType, setSelectedAchievementType] = useState(null);
  const [selectedFacultyId, setSelectedFacultyId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  //   const currentYear = new Date().getFullYear();
  const { data: facultyMembers } = useQuery(['facultyMembers'], () =>
    fetchFacultyMembers()
  );

  const achievementTypeOption = [
    {
      value: 'PhD',
      label: 'PhD',
    },
    { value: 'Publish Research', label: 'Publish Research' },
    {
      value: 'Awards',
      label: 'Awards',
    },
    {
      value: 'Grants',
      label: 'Grants',
    },
  ];

  const facultyMemberOption = useMemo(() => {
    return facultyMembers?.data?.map((classItem) => ({
      value: classItem._id,
      label: classItem.name,
    }));
  }, [facultyMembers]);

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
    if (name === 'achievementType') {
      setSelectedAchievementType(e);
    } else {
      setSelectedFacultyId(e);
    }
  };

  const addFacultyAchievementMutation = useMutation(addFacultyAchievement);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true); // Disable the submit button

      await addFacultyAchievementMutation.mutateAsync(data);

      setSelectedAchievementType(null);
      setSelectedFacultyId(null);
      setValue('title', '');
      setValue('faculty_id', '');
      setValue('achievementType', '');

      await refetchFacultyAchievementList();
      toast.success('Facullty achievement added successfully');
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Handle backend error message
        toast.error(error.response.data.message);
      } else {
        // Handle other errors
        toast.error('An error occurred while adding the achievement');
      }
    } finally {
      setSubmitting(false); // Enable the submit button
    }
  };

  return (
    <AdminLayout title="Class Assign">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Faculty Achievement</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
              <div className="md:flex gap-3">
                <Select
                  value={selectedFacultyId}
                  options={facultyMemberOption}
                  isClearable
                  placeholder="Select or type to search a faculty members"
                  id="faculty_id"
                  {...register('faculty_id', {
                    required: {
                      value: true,
                      message: 'Faculty is required',
                    },
                  })}
                  onChange={(e) => handleInputChange('faculty_id', e)}
                  className="text-p mb-1 w-full lg:w-4/12 "
                  styles={selectStyles('faculty_id')}
                />

                <Select
                  value={selectedAchievementType}
                  options={achievementTypeOption}
                  isClearable
                  placeholder="Select or type to search an achievement"
                  id="achievementType"
                  {...register('achievementType', {
                    required: {
                      value: true,
                      message: 'Achievement is required',
                    },
                  })}
                  onChange={(e) => handleInputChange('achievementType', e)}
                  className="text-p mb-1 w-full lg:w-4/12 "
                  styles={selectStyles('achievementType')}
                />

                <input
                  placeholder="Title"
                  id="title"
                  // onChange={(e) => setName(e.target.value)}
                  className={`w-full lg:w-4/12 mb-1 bg-gray-50 border text-gray-900 text-p rounded-lg outline-none block p-2 ${
                    errors.title
                      ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                  }`}
                  {...register('title', {
                    required: 'Title is required',
                    maxLength: {
                      value: 200,
                      message: 'Name must be a maximum of 200 characters',
                    },
                    // Add custom validation to check if the value is a valid number
                  })}
                />
              </div>
              <div className="md:flex gap-3 mb-3 pl-1">
                <div className="w-1/2">
                  {errors.faculty_id && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.faculty_id.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  {errors.achievementType && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.achievementType.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  {errors.title && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.title.message}
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
            <FacultyAchievementList
              facultyAchievementList={facultyAchievementList.data}
            />
          )}
        </div>
        {submitting && <Processing text="Adding the achievement" />}
      </div>
    </AdminLayout>
  );
}

FacultyScreen.auth = {
  role: 'admin',
};

export default FacultyScreen;
