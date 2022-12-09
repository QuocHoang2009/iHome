import Stack from '@mui/material/Stack';
import Header from "./Header";
import SideBar from "./SideBar";

function DefaultLayout(props){
    return (
        <Stack direction="row" width="100%">
            <SideBar />
            <Stack width="100%">
                <Header />
                {props.children}
            </Stack>
        </Stack>
    )
};

export default DefaultLayout;