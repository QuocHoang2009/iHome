import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../app/theme";
import HeaderChild from '../../components/HeaderChild';

const MembersPage = () => {
    const mockDataTeam = [
        {
          id: 1,
          name: "Jon Snow",
          email: "jonsnow@gmail.com",
          age: 35,
          access: "admin",
        },
        {
          id: 2,
          name: "Cersei Lannister",
          email: "cerseilannister@gmail.com",
          age: 42,
          access: "manager",
        },
        {
          id: 3,
          name: "Jaime Lannister",
          email: "jaimelannister@gmail.com",
          age: 45,
          access: "user",
        },
        {
          id: 4,
          name: "Anya Stark",
          email: "anyastark@gmail.com",
          age: 16,
          access: "admin",
        },
    ]

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        {
          field: "name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "age",
          headerName: "Age",
          type: "number",
          headerAlign: "left",
          align: "left",
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
        },
        {
          field: "accessLevel",
          headerName: "Access Level",
          flex: 1,
          renderCell: ({ row: { access } }) => {
            return (
              <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                  access === "admin"
                    ? colors.greenAccent[600]
                    : access === "manager"
                    ? colors.greenAccent[700]
                    : colors.greenAccent[700]
                }
                borderRadius="4px"
              >
                {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {access === "manager" && <SecurityOutlinedIcon />}
                {access === "user" && <LockOpenOutlinedIcon />}
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  {access}
                </Typography>
              </Box>
            );
          },
        },
    ];
    
    const buttonHandle = ()=>{
        console.log("add member");
    }

    const handleRowClick = ()=>{
      console.log("rowClick");
    }

    return (
      <Box m="20px">
          <HeaderChild 
              title="Members" 
              subtitle="Managing the Members" 
              addButton="Add Members" 
              buttonHandle={buttonHandle}
          />

          <Box
              m="40px 0 0 0"
              height="68vh"
              sx={{
              "& .MuiDataGrid-root": {
                  border: "none",
              },
              "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                  "cursor": "pointer",
              },
              "& .name-column--cell": {
                  color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
              <DataGrid 
                rows={mockDataTeam} 
                columns={columns} 
                pageSize={7}
                rowsPerPageOptions={[7]}
                disableSelectionOnClick
                onRowClick={handleRowClick}
              />
          </Box>
      </Box>
    )
};

export default MembersPage;