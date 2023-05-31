import React from 'react';
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from '@syncfusion/ej2-react-grids';

function GridGrade({ title, semester, studentClassGrade, sectionCode }) {
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
          <ColumnDirective field="_id" headerText="Subject Code" width="80" />
          <ColumnDirective
            field="subject_name"
            headerText="Subject Name"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="teacher_name"
            headerText="Teacher"
            width="150"
            format="C2"
            textAlign="Left"
          />
          <ColumnDirective
            headerText="Section Code"
            width="100"
            format="C2"
            textAlign="Left"
            template={() => <p>{sectionCode}</p>}
          />
          <ColumnDirective
            field="grade"
            headerText="Grade"
            width="100"
            format="N2"
          />
        </ColumnsDirective>
      </GridComponent>
      {/* <hr className="mt-10  border-sky-500" /> */}
    </div>
  );
}

export default GridGrade;
