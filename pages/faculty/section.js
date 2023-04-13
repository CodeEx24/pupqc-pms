// import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
  Sort,
  Edit,
  Inject,
  Toolbar,
  CommandColumn,
  PdfExport,
} from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import FacultyLayout from '@/components/faculty/FacultyLayout';
import { useSession } from 'next-auth/react';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2/data';
import { baseUrl } from '../../utils/data';
import { toast } from 'react-toastify';

function SectionScreen() {
  let grid;
  const toolbar = ['PdfExport'];
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
    }
  };
  return (
    <div>
      <GridComponent
        id="grid"
        dataSource={({ SAMPLE: 'SADA' }, { SAMPLE: 'SADWAS' })}
        height={270}
        toolbar={toolbar}
        allowPdfExport={true}
        allowPaging={true}
        toolbarClick={toolbarClick}
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="SAMPLE"
            headerText="Order ID"
            width="120"
            textAlign="Right"
          />
          {/* <ColumnDirective field='CustomerID' headerText='Customer ID' width='150'/>
              <ColumnDirective field='Freight' width='100' format='C2' textAlign='Right'/>
              <ColumnDirective field='OrderDate' width='140' format='yMd' textAlign='Right'/>
              <ColumnDirective field='ShipCity' headerText='Ship City' width='150'/>
              <ColumnDirective field='ShipName' headerText='Ship Name' width='150' visible={false}/> */}
        </ColumnsDirective>
        <Inject services={[Toolbar, PdfExport]} />
      </GridComponent>
    </div>
  );
}

SectionScreen.auth = {
  role: 'faculty',
};

export default SectionScreen;
