import React, { useEffect, useRef, useState } from 'react';
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from '@syncfusion/ej2-react-grids';
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from '@syncfusion/ej2-react-navigations';
import TabsContentPerformance from '../tabs/TabsContentPerformance';
import axios from 'axios';
import { toast } from 'react-toastify';
import Processing from '../../Processing';

function GridGrade({ title, semester, studentClassGrade, sectionCode }) {
  const [studentPerformance, setStudentPerformance] = useState();
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [tabDirectiveElement, setTabDirectiveElement] = useState();
  const [isActionInProgress, setIsActionInProgress] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowPerformanceModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickPerformance = async (classSubject_id) => {
    try {
      setIsActionInProgress(true);
      const res = await axios.get(`/api/student/own-performance`, {
        params: { classSubject_id },
      });

      setStudentPerformance(res);

      const tabElement = Object.keys(res?.data.student_records).map(
        (item, index) => {
          return (
            <TabItemDirective
              key={index}
              header={{ text: item.toLocaleUpperCase().replace('_', ' ') }}
              content={() => (
                <TabsContentPerformance
                  assessment={item}
                  assessmentItem={res.data.student_records[item]}
                  criteriaOverall={res?.data.criteria_overall[item]}
                />
              )}
            />
          );
        }
      );
      setTabDirectiveElement(tabElement);
      setShowPerformanceModal(true);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsActionInProgress(false);
    }
  };

  return (
    <div className=" pb-14 ">
      <h3 className="font-bold text-white bg-sky-400 p-3">
        {title}{' '}
        <span className="text-white">
          {semester === 1
            ? '(1st Semester)'
            : semester === 2
            ? '(2nd Semester)'
            : '(3rd Semester)'}
        </span>
      </h3>
      <GridComponent dataSource={studentClassGrade}>
        <ColumnsDirective>
          <ColumnDirective
            headerText="#"
            width="50"
            textAlign="Left"
            template={(props) => {
              const index = Number(props.index) + 1;
              return <div>{index}</div>;
            }}
          />
          <ColumnDirective
            field="subject_id"
            headerText="Subject Code"
            width="80"
          />
          <ColumnDirective
            field="subject_name"
            headerText="Subject Name"
            width="120"
            textAlign="Left"
          />
          <ColumnDirective
            field="teacher_name"
            headerText="Teacher"
            width="70"
            format="C2"
            textAlign="Left"
          />
          <ColumnDirective
            headerText="Section Code"
            width="80"
            format="C2"
            textAlign="Left"
            template={() => <p>{sectionCode}</p>}
          />
          <ColumnDirective
            field="grade"
            headerText="Grade"
            width="60"
            format="N2"
          />
          <ColumnDirective
            field="classSubject_id"
            headerText="Performance"
            width="100"
            format="N2"
            template={(rowData) => (
              <>
                {/* <Link
                href={`/student/performance/${rowData.classSubject_id}`}
                className="btn-primary-no-width px-3"
              >
                Performamce
              </Link> */}
                <button
                  className="btn-primary px-3"
                  onClick={() =>
                    handleClickPerformance(rowData.classSubject_id)
                  }
                >
                  Performamce
                </button>
              </>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
      {showPerformanceModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div
            className="bg-white rounded-md p-10 lg:w-8/12 md:w-10/12 w-11/12"
            ref={modalRef}
          >
            <h1 className="title text-h5 text-primary">Performance</h1>
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
          </div>
        </div>
      )}
      {isActionInProgress && <Processing text={'Getting the performance'} />}
    </div>
  );
}

export default GridGrade;
