import { useMemo } from 'react';
import FacultyLayout from '@/components/FacultyLayout';
import { useClassDataQueries } from '@/components/hooks/useClassData';
import { useSubjectData } from '@/components/hooks/useSubjectData';
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Sort,
} from '@syncfusion/ej2-react-grids';
import { useSession } from 'next-auth/react';

function SectionScreen() {
  const { data: session } = useSession();
  const user_id = session?.user._id;

  const { data: subjectData } = useSubjectData(user_id);

  const class_ids = useMemo(
    () => subjectData?.data?.map((subject) => subject.class_id),
    [subjectData]
  );

  const classData = useClassDataQueries(class_ids);

  const mergedData = useMemo(
    () =>
      subjectData?.data?.reduce((acc, curr) => {
        const matchingClassIndex = classData?.findIndex(
          (c) => c?._id === curr.class_id
        );

        if (matchingClassIndex !== -1) {
          const matchingClass = classData[matchingClassIndex];
          const {
            name: Name,
            year: Year,
            section: Section,
            batch: Batch,
          } = matchingClass;
          const { _id: ID, name: Subject, semester: Semester } = curr;

          acc.push({ Subject, Semester, Name, Year, Section, Batch, ID });
        }

        return acc;
      }, []),
    [classData, subjectData]
  );

  return (
    <FacultyLayout title="Home">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-sky-400 font-bold text-3xl mb-5">Section</h1>
        {mergedData?.length === subjectData?.data.length && (
          <GridComponent
            dataSource={mergedData}
            allowPaging={true}
            pageSettings={{ pageSize: 10 }}
            allowEditing={true}
            editSettings={{
              allowEditing: true,
              allowAdding: true,
              allowDeleting: true,
            }}
            toolbar={['Add', 'Edit', 'Delete', 'Update', 'Cancel']}
          >
            <ColumnsDirective>
              <ColumnDirective field="Subject" width="200" textAlign="Left" />
              <ColumnDirective field="Name" width="100" />
              <ColumnDirective field="Year" width="100" textAlign="Left" />
              <ColumnDirective field="Section" width="100" textAlign="Left" />
              <ColumnDirective field="Semester" width="100" />
              <ColumnDirective field="Batch" width="100" />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group]} />
          </GridComponent>
        )}
      </div>
    </FacultyLayout>
  );
}

SectionScreen.auth = {
  role: 'faculty',
};

export default SectionScreen;
