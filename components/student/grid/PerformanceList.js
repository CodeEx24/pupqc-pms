import React from 'react';

import GridPerformance from './GridPerformance';

function Performance({ studentGrade }) {
  const gridStudentData = studentGrade.map((yearClass) => {
    return yearClass.map((semesterClass, index) => {
      return (
        <GridPerformance
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
export default Performance;
