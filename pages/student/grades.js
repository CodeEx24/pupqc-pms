import React from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { useQuery } from '@tanstack/react-query';
import { fetchStudentGrade } from '../../components/hooks/Student/fetch';
import { useSession } from 'next-auth/react';
import GradeList from '../../components/student/grid/GradeList';

function StudentGradeScreen() {
  const { data: session, status } = useSession();

  // Get my grades
  const {
    data: studentGrade,
    isLoading: isLoadingStudentGrade,
    // refetch: refetchStudentData,
  } = useQuery(['studentCurrentYearLevelSemester'], fetchStudentGrade, {
    refetchOnWindowFocus: false,
  });

  return (
    <StudentLayout title="Grades">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary mb-5">Grades</h1>

        <div className="flex gap-10 font-semibold text-gray-600 mb-8">
          {status === 'loading' ? (
            <h3>Loading</h3>
          ) : (
            <>
              <h3 className="text-xl">{session?.user.name}</h3>
              <h3 className="text-xl">{session?.user.email}</h3>
            </>
          )}
        </div>
        {isLoadingStudentGrade ? (
          'Loading...'
        ) : (
          <GradeList studentGrade={studentGrade.data} />
        )}
      </div>
    </StudentLayout>
  );
}

export default StudentGradeScreen;
