import React from 'react';
import FacultyLayout from '@/components/faculty/FacultyLayout';

function GradeScreen() {
  return (
    <FacultyLayout title="Grades">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Students Grade</h1>

        <div className="flex items-end gap-3">
          <div className="mb-6 w-full"></div>
        </div>
      </div>
    </FacultyLayout>
  );
}

GradeScreen.auth = {
  role: 'faculty',
};

export default GradeScreen;
