import { Box, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderChild from '../../../../components/HeaderChild';
import RelayComponent from '../../../../components/RelayComponent';
import RelaysDialog from '../../../../components/RelaysDialog';
import { getHome, linkHome } from '../../../../const/API';

const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [home, setHome] = useState(useSelector((state) => state.home));
    const [isReset, setIsReset] = useState(false);
    const [selectedValueLink, setSelectedValueLink] = useState();
    const [openModalLink, setOpenModalLink] = useState(false);

    useEffect(() => {
        (async () => {
            if (home?._id) {
                const api = getHome + home?._id;
                const res = await axios.get(api);
                setHome(res.data);
            }
        })();
    }, [home?._id, dispatch]);

    const handleEdit = () => {
        navigate('/home/edit');
    };

    const handleClickOpenModalLink = () => {
        setOpenModalLink(true);
        console.log('first');
    };

    const handleCloseModalLink = async (value) => {
        setOpenModalLink(false);
        if (value) {
            setSelectedValueLink(value);
            const data = {
                home: home._id,
                relay: value.channels[value.channel - 1]._id,
            };

            await axios
                .patch(linkHome, {
                    body: data,
                })
                .then((res) => {
                    setIsReset(!isReset);
                })
                .catch((error) => {
                    if (error?.response) {
                        console.log(error.response.data);
                    } else {
                        console.log(error);
                    }
                });
        }
    };

    const handleUnlink = () => {
        console.log('first');
    };

    return (
        <Box m="20px">
            <HeaderChild
                title="My Home"
                subtitle="Information Home"
                addButton="Edit Home"
                buttonHandle={handleEdit}
            />
            <Stack direction="column" spacing="2px" width="100%">
                <RelayComponent
                    relayId={home?.relay}
                    handleLink={handleClickOpenModalLink}
                    handleUnlink={handleUnlink}
                />
                <div>Sensor</div>
            </Stack>

            <RelaysDialog
                selectedValue={selectedValueLink}
                open={openModalLink}
                onClose={handleCloseModalLink}
            />
        </Box>
    );
};

export default MainPage;
