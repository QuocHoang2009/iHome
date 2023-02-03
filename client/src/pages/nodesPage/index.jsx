import { Alert, AlertTitle, Box, LinearProgress, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNodes } from "../../app/state";
import { tokens } from "../../app/theme";
import HeaderChild from '../../components/HeaderChild';
import { addNode, getAllNodes } from '../../const/API';

const NodesPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const nodes = useSelector((state)=> state.nodes)
    const [isReload, setIsReload] = useState();
    const [isLineNear, setIsLineNear] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const currentHome = useSelector((state)=> state.currentHome);
    const apiAddNode = addNode + currentHome._id;

    const buttonHandle = ()=>{
        setIsLineNear(true);
        axios.post(apiAddNode, {
            topic: currentHome?.mqttPath,
          })
          .then((res) => {
            setIsLineNear(false);
            setIsAlert(true);
            if(res.data){
                setIsReload(!isReload);
                setIsSuccess(true);
            }
            else{
                setIsSuccess(false);
            }
            setTimeout(()=>{
                setIsAlert(false);
            }, 10000);
          })
          .catch((error) => {
            setIsLineNear(false);
            console.log(error);
          });
    }

    useEffect(()=>{
        (async () => {
            const res = await axios.get(getAllNodes);
            if (res.data) dispatch(setNodes({nodes: res.data}));;
        })();
    }, [isReload, dispatch]);

    const columns = [
        { 
            field: "id", 
            headerName: "ID" 
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "room",
            headerName: "Room",
            flex: 1,
        },
        {
            field: "type",
            headerName: "Type Node",
            flex: 1,
        },
        {
            field: "numChannel",
            headerName: "Number Channel",
            flex: 1,
        },
    ];
    
    return (
        <Box m="20px">
            <HeaderChild 
                title="Nodes"
                subtitle="Managing the Nodes" 
                addButton="Add Node" 
                buttonHandle={buttonHandle} 
            />

            {(isLineNear && (
                <Box >
                    <LinearProgress color="success" />
                </Box>
            ))}

            {(isAlert && !isSuccess && (
                <Alert  
                    severity="error" 
                    onClose={() => {setIsAlert(false)}}
                >
                    <AlertTitle>Error</AlertTitle>
                    Can not find any node! — <strong>Try again!</strong>
                </Alert>
            ))}

            {(isAlert && isSuccess && (
                <Alert  
                    severity="success" 
                    onClose={() => {setIsAlert(false)}}
                >
                    <AlertTitle>Success</AlertTitle>
                    Find a node! — <strong>check it out!</strong>
                </Alert>
            ))}

            <Box
                m="40px 0 0 0"
                height="60vh"
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
                {nodes && <DataGrid 
                    rows={nodes?.map((node, index)=>{
                    return {
                        ...node,
                        id: index + 1
                    }
                })} 
                    columns={columns} 
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    disableSelectionOnClick
                />}
            </Box>
        </Box>
    )
};

export default NodesPage;