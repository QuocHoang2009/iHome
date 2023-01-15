import { Box, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { tokens } from "../../app/theme";
import HeaderChild from '../../components/HeaderChild';
import { addNode, getAllNodes } from '../../const/API';

const NodesPage = () => {
    const [nodes, setNodes] = useState();

    const [isReload, setIsReload] = useState();

    const buttonHandle = ()=>{
        axios.post(addNode, {
            topic: 'mybk/down',
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });

        setTimeout(()=>{
            setIsReload(!isReload);
        }, 20000);
    }

    useEffect(()=>{
        (async () => {
            const res = await axios.get(getAllNodes);
            if (res.data) setNodes(res.data);
        })();
    }, [isReload]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
                {nodes && <DataGrid 
                    rows={nodes?.map((node, index)=>{
                    return {
                        ...node,
                        id: index + 1
                    }
                })} 
                    columns={columns} 
                    pageSize={7}
                    rowsPerPageOptions={[7]}
                    disableSelectionOnClick
                />}
            </Box>
        </Box>
    )
};

export default NodesPage;