import { Box, Chip, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getRelayChannel } from '../const/API';
import ButtonStyle from './ButtonStyle';

const RelayComponent = (props) => {
    const relayId = props.relayId;
    const handleLink = props.handleLink;
    const handleUnlink = props.handleUnlink;

    const [relay, setRelay] = useState();

    useEffect(() => {
        (async () => {
            if (relayId) {
                const apiGetRelay = getRelayChannel + relayId;
                const res = await axios.get(apiGetRelay);
                console.log(res.data);
                setRelay(res.data);
            }
        })();
    }, [relayId]);

    return relayId ? (
        <Stack direction="row" justifyContent="space-between">
            <Box>Relay</Box>
            <Box>Channel</Box>
            <Box>State</Box>
            <Chip label="Delete" onClick={handleUnlink} />
        </Stack>
    ) : (
        <ButtonStyle width="100%" height="48px" handleClick={handleLink} name="LINK RELAY" />
    );
};

export default RelayComponent;
