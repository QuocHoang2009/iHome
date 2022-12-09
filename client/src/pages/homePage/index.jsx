import { Box } from '@mui/material';
import DefaultLayout from '../../components/DefaultLayout';
import HeaderChild from '../../components/HeaderChild';

const HomePage = () => {
    return (
        <DefaultLayout>
            <Box m="20px">
                <HeaderChild title="My Home" subtitle="Information Home" />
                <div>Home</div>
            </Box>
        </DefaultLayout>
    )
};

export default HomePage;