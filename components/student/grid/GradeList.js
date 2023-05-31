import React from 'react';

import GridGrade from './GridGrade';

function GradeList({ studentGrade }) {
  const gridStudentData = studentGrade.map((yearClass) => {
    return yearClass.map((semesterClass, index) => {
      return (
        <GridGrade
          key={`${yearClass}-${semesterClass.batch}-${index}`}
          title={`School Year ${semesterClass.batch}-${
            Number(semesterClass.batch) + 1
          }`}
          sectionCode={`${semesterClass.course_code} ${semesterClass.year}-${semesterClass.section}`}
          semester={semesterClass.semester}
          studentClassGrade={semesterClass.subjects}
        />
      );
    });
  });

  return <div>{gridStudentData}</div>;
}
export default GradeList;
