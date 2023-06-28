import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/admin/AdminLayout';
import SubjectList from '../../components/admin/grid/SubjectList';
import { fetchSubjectList } from '../../components/hooks/Admin/fetch';
import { addSubjectData } from '../../components/hooks/Admin/addData';

function SubjectScreen() {
  const {
    data: subjectList,
    isLoading,
    refetch: refetchSubject,
  } = useQuery(['subjectList'], fetchSubjectList);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //  Should be admin

  const addSubjectMutation = useMutation(addSubjectData);
  const onSubmit = async (data) => {
    try {
      await addSubjectMutation.mutateAsync(data);
      refetchSubject();
      toast.success('Subject added successfully');
      reset(); // Clear form inputs
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <AdminLayout title="Subject">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Subject</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="md:flex gap-3">
                <input
                  type="text"
                  placeholder="Subject Code"
                  id="code"
                  // onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-gray-50 border text-gray-900 text-p rounded-lg   outline-none block p-2.5 ${
                    errors.code
                      ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                  }`}
                  {...register('code', {
                    required: 'Subject Code is required',
                    maxLength: {
                      value: 10,
                      message: 'Code must be a maximum of 10 characters',
                    },
                    pattern: {
                      value: /^[A-Z]{4}-\d{3}$/,
                      message: 'Code must follow the format: XXXX-000',
                    },
                  })}
                />
                <input
                  type="text"
                  placeholder="Subject Name"
                  id="name"
                  // onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-gray-50 border text-gray-900 text-p rounded-lg outline-none block p-2.5 ${
                    errors.name
                      ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                  }`}
                  {...register('name', {
                    required: 'Name is required',
                    maxLength: {
                      value: 200,
                      message: 'Name must be a maximum of 200 characters',
                    },
                  })}
                />
              </div>
              <div className="md:flex gap-3 mb-3 pl-1">
                <div className="w-1/2">
                  {errors.code && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.code.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  {errors.name && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="md:flex gap-3">
                <textarea
                  type="text"
                  placeholder="Subject Description"
                  id="description"
                  rows={4}
                  // onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-gray-50 border text-gray-900 text-p rounded-lg    outline-none block p-2.5 ${
                    errors.description
                      ? 'border-red-600/[.55]  focus:ring-red-500 focus:border-red-500 '
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                  }`}
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: {
                      value: 200,
                      message:
                        'Description must be a maximum of 200 characters',
                    },
                  })}
                />
              </div>
              <div className="md:flex gap-3 mb-3 pl-1">
                <div className="w-full">
                  {errors.description && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <input type="submit" className="btn-primary mb-5" />
              </div>
            </form>
            <div>
              {isLoading ? (
                'Loading...'
              ) : (
                <SubjectList subjectList={subjectList.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

SubjectScreen.auth = {
  role: 'admin',
};

export default SubjectScreen;
