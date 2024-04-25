import React, { useCallback, useState } from 'react';
import ODataStore from 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  DataGridTypes,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';


const DataGridSummaryTable = ({Data}: any) => {
  const pageSizes = [10, 25, 50, 100];

  return (
    {/*
    <DataGrid
      dataSource={Data}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      showBorders={true}
      width="100%"
    >
      <GroupPanel visible={true} />
      <SearchPanel visible={true} highlightCaseSensitive={true} />
      <Grouping autoExpandAll={true} />

      <Column dataField="location" groupIndex={0} caption="Shooting Range" />
      <Column dataField="start" groupIndex={1} caption="Time Segment"/>
      <Column dataField="location" dataType="date" caption="Location"/>
      <Column dataField="invoiceId" dataType="string" caption="Invoice"/>
      <Column dataField="occupancy" dataType="string" caption="Occupancy"/>
      <Column dataField="start" dataType="datetime" caption="Start of Segment" />
      <Column dataField="end" dataType="datetime" caption="End of Segment"/>

      <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
      <Paging defaultPageSize={10} />
  </DataGrid>  )*/}
  )
};

export default DataGridSummaryTable;
