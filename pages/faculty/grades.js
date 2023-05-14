import React from 'react';
import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useQuery } from '@tanstack/react-query';
import { fetchStudentsGrade } from '@/components/hooks/FacultySubject/fetch';
import StudentGradeList from '@/components/faculty/grid/StudentGradeList';

function GradeScreen() {
  // Get student list
  const { data: studentsGrade, isLoading } = useQuery(
    ['students'],
    fetchStudentsGrade,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <FacultyLayout title="Grades">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Students Grade</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full">
            {isLoading ? (
              'Loading...'
            ) : (
              <StudentGradeList students={studentsGrade} />
            )}
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
}

GradeScreen.auth = {
  role: 'faculty',
};

export default GradeScreen;
