import { Box } from '@mui/material';
import DefaultLayout from '../../components/DefaultLayout';
import HeaderChild from '../../components/HeaderChild';

const ChartsPage = () => {
    return (
        <DefaultLayout>
            <Box m="20px">
                <HeaderChild title="Charts" subtitle="All charts here!" />
                <div>ChartsPage</div>
            </Box>
        </DefaultLayout>
    )
};

export default ChartsPage;