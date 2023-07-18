import React, { useEffect, useState } from 'react';
import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import { fetchStudentPerformance } from '@/components/hooks/FacultySubject/fetch';
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from '@syncfusion/ej2-react-navigations';
import TabsContentStudentManagement from '@/components/faculty/tabs/TabsContentStudentManagement';

function StudentClassScores() {
  const router = useRouter();

  const id = `${router.query.studentId}${router.query.classSubjectId}`;

  const studentId = router.query.studentId;
  const classSubjectId = router.query.classSubjectId;

  const [tabDirectiveElement, setTabDirectiveElement] = useState(null);
  //   const [studentData, setStudentData] = useState({ name: '', email: '' });

  const { data: studentPerformance, isLoading } = useQuery(
    ['studentPerformance', id],
    () => fetchStudentPerformance(studentId, classSubjectId),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (studentPerformance) {
      const assessment = studentPerformance.data.studentRecord.records;
      const criteriaOverall = studentPerformance.data.criteriaOverall;

      const tabElement = Object.keys(assessment).map((item, index) => (
        <TabItemDirective
          key={`${item}${index}`}
          header={{ text: item.toLocaleUpperCase().replace('_', ' ') }}
          content={() => (
            <TabsContentStudentManagement
              assessment={item}
              assessmentItem={[...assessment[item]]}
              criteriaOverall={criteriaOverall}
              studentId={studentId}
              classSubjectId={classSubjectId}
            />
          )}
        />
      ));

      const tabDirective = () => (
        <div className="h-full ">
          <div className="h-5/6 overflow-y-auto">
            <TabComponent heightAdjustMode="Fill">
              <TabItemsDirective>{tabElement}</TabItemsDirective>
            </TabComponent>
          </div>
        </div>
      );

      setTabDirectiveElement(tabDirective);
    }
  }, [studentPerformance, studentId, classSubjectId]);

  return (
    // Add Subject name, semester and other required details
    <FacultyLayout title="Performance">
      <div id="myMainNode" className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Performance</h1>
        <div className="flex items-end gap-3">
          <div className="mb-6 w-full h-1/2">
            {isLoading && !studentPerformance ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="flex gap-10">
                  <h2 className="text-lg font-medium mb-2">
                    Name:{' '}
                    <span className="font-normal">
                      {studentPerformance?.data?.studentRecord?.name || ''}
                    </span>
                  </h2>
                  <h2 className="text-lg font-medium mb-2">
                    Email:{' '}
                    <span className="font-normal">
                      {studentPerformance?.data?.studentRecord?.email || ''}
                    </span>
                  </h2>
                </div>
                {tabDirectiveElement}
              </>
            )}
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
}

StudentClassScores.auth = {
  role: 'faculty',
};

export default StudentClassScores;
