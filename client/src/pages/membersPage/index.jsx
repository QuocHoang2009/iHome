import { Box } from '@mui/material';
import DefaultLayout from '../../components/DefaultLayout';
import HeaderChild from '../../components/HeaderChild';

const MembersPage = () => {
    return (
        <DefaultLayout>
            <Box m="20px">
                <HeaderChild title="Members"/>
                <div>MembersPage</div>
            </Box>
        </DefaultLayout>
    )
};

export default MembersPage;