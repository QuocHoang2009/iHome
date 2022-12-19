import { Box } from '@mui/material';
import DefaultLayout from '../../components/DefaultLayout';
import HeaderChild from '../../components/HeaderChild';

const NodesPage = () => {
    const buttonHandle = ()=>{
        console.log("first");
    }
    
    return (
        <DefaultLayout>
            <Box m="20px">
                <HeaderChild 
                    title="Nodes"
                    subtitle="Managing the Nodes" 
                    addButton="Add Node" 
                    buttonHandle={buttonHandle} 
                />
                <div>NodesPage</div>
            </Box>
        </DefaultLayout>
    )
};

export default NodesPage;