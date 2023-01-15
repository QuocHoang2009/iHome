import { Box } from '@mui/material';
import HeaderChild from '../../components/HeaderChild';

const DevicesPage = () => {
    const buttonHandle = ()=>{
        console.log("first");
    }
    
    return (
        <Box m="20px">
            <HeaderChild 
                title="Devices"
                subtitle="Managing the Devices" 
                addButton="Add Device" 
                buttonHandle={buttonHandle} 
            />
            <div>DevicesPage</div>
        </Box>
    )
};

export default DevicesPage;