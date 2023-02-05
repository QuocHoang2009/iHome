import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { tokens } from "../../../../app/theme";
import BoxEdit from "../../../../components/BoxEdit";
import HeaderChild from "../../../../components/HeaderChild";
import { editNode, nodeApi } from "../../../../const/API";

const RelayPage = ()=>{
    const params = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentNode, setCurrentNode] = useState();
    const [isReset, setIsReset] = useState();

    useEffect(()=>{
        (async ()=>{
            const api = nodeApi + params.id;
            const res = await axios.get(api);
            console.log(res.data);
            setCurrentNode(res.data);
            
        })()
    }, [params.id, isReset]);


    return(
        <div>RelayPage</div>
    )
}

export default RelayPage;