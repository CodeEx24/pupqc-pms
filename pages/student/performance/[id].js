import React from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchStudentPerformance } from '@/components/hooks/Student/fetch';

import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from '@syncfusion/ej2-react-navigations';
import { useState } from 'react';
import { useEffect } from 'react';
import TabsContentPerformance from '../../../components/student/tabs/TabsContentPerformance';

function SAMPLE() {
  const [tabDirectiveElement, setTabDirectiveElement] = useState();

  const router = useRouter();

  // Get my performance through the subject
  const { data: studentPerformance, isLoading } = useQuery(
    ['studentPerformance', router.query.id],
    () => fetchStudentPerformance(router.query.id),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!isLoading) {
    console.log('DATA STUDENT PERFORMANCE: ', studentPerformance?.data);
  }

  useEffect(() => {
    if (!isLoading && studentPerformance?.data) {
      const tabElement = Object.keys(
        studentPerformance?.data.student_records
      ).map((item, index) => {
        return (
          <TabItemDirective
            key={index}
            header={{ text: item.toLocaleUpperCase().replace('_', ' ') }}
            content={() => (
              <TabsContentPerformance
                assessment={item}
                assessmentItem={studentPerformance.data.student_records[item]}
                criteriaOverall={
                  studentPerformance?.data.criteria_overall[item]
                }
              />
            )}
          />
        );
      });
      setTabDirectiveElement(tabElement);
    }
  }, [isLoading, studentPerformance]);

  return (
    <StudentLayout title="Performance">
      <div className="bg-white p-10 rounded-xl ">
        <h1 className="title">Performance</h1>
        {!isLoading && (
          <>
            <div className="flex mb-6">
              <div className="w-6/12">
                <h4 className="font-bold text-gray-600">
                  Teacher:{' '}
                  <span className="font-normal">
                    {studentPerformance.data.details.teacher_name}
                  </span>
                </h4>

                <h4 className="font-bold text-gray-600">
                  Subject Code:{' '}
                  <span className="font-normal">
                    {studentPerformance.data.details.subject_id}
                  </span>
                </h4>

                <h4 className="font-bold text-gray-600">
                  Class Year:{' '}
                  <span className="font-normal">
                    {studentPerformance.data.details.batch}
                  </span>
                </h4>
              </div>
              <div className="w-6/12">
                <h4 className="font-bold text-gray-600">
                  Section Code:{' '}
                  <span className="font-normal">
                    {studentPerformance.data.details.section_code}
                  </span>
                </h4>
                <h4 className="font-bold text-gray-600">
                  Subject:{' '}
                  <span className="font-normal">
                    {studentPerformance.data.details.subject_name}
                  </span>
                </h4>
                <h4 className="font-bold text-gray-600">
                  Semester:{' '}
                  <span className="font-normal">
                    {studentPerformance.data.details.semester === 1
                      ? '1st Semester'
                      : studentPerformance.data.details.semester === 2
                      ? '2nd Semester'
                      : 'Summer Term'}
                  </span>
                </h4>
              </div>
            </div>
            <TabComponent heightAdjustMode="Content">
              <TabItemsDirective>{tabDirectiveElement} </TabItemsDirective>
            </TabComponent>
          </>
        )}
      </div>
    </StudentLayout>
  );
}

export default SAMPLE;
