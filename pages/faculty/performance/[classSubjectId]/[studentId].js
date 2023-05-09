import { useRouter } from 'next/router';
import React from 'react';

function StudentPerformanceManagementScreen() {
  const router = useRouter();

  const { classSubjectId, studentId } = router.query;
  console.log('CLASS SUBJECT ID: ', classSubjectId);
  console.log('STUDENT ID: ', studentId);

  // CriteriaOverallScores._id find match in StudentsRecords.criteriaOverallScores_id

  // If successfully find => fetchStudentRecords === studentId

  // After getting the data have a list in which allow the user to configure the scores of students.

  return <div>StudentPerformanceManagementScreen</div>;
}

export default StudentPerformanceManagementScreen;
