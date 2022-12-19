import { Box, Button, TextField, useTheme } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { DataGrid } from "@mui/x-data-grid";
import { Formik } from "formik";
import { useState } from 'react';
import * as yup from "yup";
import { tokens } from "../../app/theme";
import DefaultLayout from '../../components/DefaultLayout';
import HeaderChild from '../../components/HeaderChild';

const initialValues = {
    name: "",
};

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
});

const RoomsPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const rooms = [
        {
            id: 1,
            name: "Living room",
            relay: "12353r4",
            state: true
        },
        {
            id: 2,
            name: "Bathroom",
            relay: "465498",
            state: false
        },
        {
            id: 3,
            name: "Bedroom",
            relay: "",
            state: null
        },
        {
            id: 4,
            name: "Storehouse",
            relay: "",
            state: null
        }
    ]

    const handleChange = ()=>{
        console.log("0");
    }

    const columns = [
        { field: "id", headerName: "ID" },
        {
          field: "name",
          headerName: "Name",
          flex: 3,
          renderCell: ({ row: { name } }) => {
            return (
              <Box 
                sx={{
                    ":hover":{
                        cursor: "pointer",
                    }
                }}
              >
                {name}
              </Box>
            );
          },
        },
        {
          field: "state",
          headerName: "State",
          flex: 1,
          renderCell: ({ row: { relay, state } }) => {
            return (
              <Box>
                    {relay? (
                        <Switch checked={state} onChange={handleChange(state)}/>
                    ) : (
                        <FormControlLabel disabled control={<Switch />} />
                    )}
              </Box>
            );
          },
        },
      ];
    

    const [isAdd, setIsAdd] = useState(false);
    const buttonHandle = ()=> setIsAdd(true);
    
    const handleFormSubmit = (values) => {
        setIsAdd(false);
    };
      
    return (
        <DefaultLayout>
            <Box m="20px">
                <HeaderChild 
                    title="Rooms" 
                    subtitle="Managing the Rooms"  
                    addButton="Add Room"
                    buttonHandle={buttonHandle}
                />
                {(isAdd && (
                    <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Box display="flex" justifyContent="space-between" m="20px 0" >
                            <Box height="45px" width="79%">
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                            </Box>

                            <Box height="100%" width="20%">
                                <Button type="submit" color="secondary" variant="contained" fullWidth height="100%">
                                    Create New Room
                                </Button>
                            </Box>
                        </Box>
                      </form>
                    )}
                  </Formik>
                ))}
                <Box
                    m="40px 0 0 0"
                    height="68vh"
                    sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
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
                        rows={rooms} 
                        columns={columns} 
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                    />
                </Box>
            </Box>
        </DefaultLayout>
    )
};

export default RoomsPage;