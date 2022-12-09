import { Box } from '@mui/material';
import DefaultLayout from '../../components/DefaultLayout';
import HeaderChild from '../../components/HeaderChild';

const RoomsPage = () => {
    return (
        <DefaultLayout>
            <Box m="20px">
                <HeaderChild title="Rooms"/>
                <div>RoomsPage</div>
            </Box>
        </DefaultLayout>
    )
};

export default RoomsPage;