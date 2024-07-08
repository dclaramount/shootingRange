import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { GlobalVariablesContext } from '../../Context/GlobalVariablesContext';
import { PostPopUp } from '../../shared/PostPopUp';
import { ManagementDashboardContext } from '../../Context/ManagementDashboardContext';
export type rowProps = {
  id:           number;
  vName:        string;
  vValue:       string;
  vComment:     string;
  isNew:        boolean;
}

export default function GlobalVariablesManagement() {
  const {globalVariabes}                                            =   React.useContext(GlobalVariablesContext);
  const {refreshManagementDashboard, setRefreshManagementDashboard} =   React.useContext(ManagementDashboardContext);
  const lglobalVariables                                            =   globalVariabes.payload;
  const initialRows: rowProps[]                                     =   []
  lglobalVariables.forEach((gVariable:any) => initialRows.push({id:gVariable.id, vName: gVariable.name, vValue: gVariable.value, vComment: gVariable.comment, isNew:false }))
  const [rows, setRows]                                             =   React.useState(initialRows);
  const [rowModesModel, setRowModesModel]                           =   React.useState<GridRowModesModel>({});
  const [showPopUp,    setShowPopUp]                                =   React.useState(false);
  const [postParameters, setPostParameters]                         =   React.useState("");
  const [endpoint, setEndPoint]                                     =   React.useState("");
  const closeModalPopUp                                             =   () => {setRefreshManagementDashboard(refreshManagementDashboard+1);setShowPopUp(false);}

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row)));
    setEndPoint("postUpdateGlobalVariable") 
    setPostParameters(`id=${newRow.id}&newValue=${newRow.vValue}`);
    setShowPopUp(true);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'vName', headerName: 'Name', width: 180, editable: false },
    { field: 'vValue',headerName: 'Value',type: 'string',width: 500,editable: true, renderCell: (params: any) =>  {
      return(
      <Tooltip title={params.row.vComment} >
         <span className="table-cell-trucate">{params.row.vValue}</span>
       </Tooltip>)
     },},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />]
          /*
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];*/
      },
    },
  ];

  return (
    <div>
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        autoPageSize={true}
      />
    </Box>
    {showPopUp && postParameters!=='' && <PostPopUp postAPI={endpoint} postParameters={postParameters} closeModal={closeModalPopUp}/>}
    </div>
  );
}