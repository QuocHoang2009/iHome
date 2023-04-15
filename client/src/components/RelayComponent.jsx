import { Box } from '@mui/material'
import ButtonStyle from './ButtonStyle'

const RelayComponent = (props) => {
    const relayId = props.id
    const handleLink = props.handleLink

    return relayId ? (
        <Box>have relay</Box>
    ) : (
        <ButtonStyle width="100%" height="48px" handleClick={handleLink} name="LINK RELAY" />
    )
}

export default RelayComponent
