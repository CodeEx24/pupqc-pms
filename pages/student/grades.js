import React from 'react';
import StudentLayout from '@/components/student/StudentLayout';

function StudentGradeScreen() {
  return (
    <StudentLayout title="Grades">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="title">Grades</h1>
      </div>
    </StudentLayout>
  );
}

export default StudentGradeScreen;
