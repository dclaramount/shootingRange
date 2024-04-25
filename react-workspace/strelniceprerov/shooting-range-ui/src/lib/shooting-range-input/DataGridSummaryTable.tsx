import React, { useCallback, useState } from 'react';
import Button from 'devextreme-react/button';
import DataGrid, {
  Column, Editing, Paging, Pager,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';


const DataGridSummaryTable = ({Data}: any) => {

  return (
    {/*}
    <DataGrid
      dataSource={dataSourceOptions}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      showBorders={true}
      width="100%"
      onContentReady={onContentReady}
    >
      <GroupPanel visible={true} />
      <SearchPanel visible={true} highlightCaseSensitive={true} />
      <Grouping autoExpandAll={false} />

      <Column dataField="Product" groupIndex={0} />
      <Column
        dataField="Amount"
        caption="Sale Amount"
        dataType="number"
        format="currency"
        alignment="right"
      />
      <Column
        dataField="Discount"
        caption="Discount %"
        dataType="number"
        format="percent"
        alignment="right"
        allowGrouping={false}
        cellRender={DiscountCell}
        cssClass="bullet"
      />
      <Column dataField="SaleDate" dataType="date" />
      <Column dataField="Region" dataType="string" />
      <Column dataField="Sector" dataType="string" />
      <Column dataField="Channel" dataType="string" />
      <Column dataField="Customer" dataType="string" width={150} />

      <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
      <Paging defaultPageSize={10} />
  </DataGrid>  )*/}
  )
};

export default DataGridSummaryTable;
