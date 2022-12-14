import { Box } from '@mui/material';
import DefaultLayout from '../../components/DefaultLayout';
import HeaderChild from '../../components/HeaderChild';

const DevicesPage = () => {
    const buttonHandle = ()=>{
        console.log("first");
    }
    
    return (
        <DefaultLayout>
            <Box m="20px">
                <HeaderChild 
                    title="Devices"
                    subtitle="Managing the Devices" 
                    addButton="Add Device" 
                    buttonHandle={buttonHandle} 
                />
                <div>DevicesPage</div>
            </Box>
        </DefaultLayout>
    )
};

export default DevicesPage;