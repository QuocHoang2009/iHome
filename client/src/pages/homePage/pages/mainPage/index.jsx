import { Box, Stack } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HeaderChild from '../../../../components/HeaderChild'
import RelayComponent from '../../../../components/RelayComponent'
import { getHome } from '../../../../const/API'

const MainPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [home, setHome] = useState(useSelector((state) => state.home))

    useEffect(() => {
        ;(async () => {
            if (home?._id) {
                const api = getHome + home?._id
                const res = await axios.get(api)
                setHome(res.data)
            }
        })()
    }, [home?._id, dispatch])

    const handleEdit = () => {
        navigate('/home/edit')
    }

    const handleLinkRelay = () => {
        console.log('first')
    }

    return (
        <Box m="20px">
            <HeaderChild
                title="My Home"
                subtitle="Information Home"
                addButton="Edit Home"
                buttonHandle={handleEdit}
            />
            <Stack direction="column" spacing="2px" width="100%">
                <RelayComponent relayId={home?.relay} handleLink={handleLinkRelay} />
                <div>Sensor</div>
            </Stack>
        </Box>
    )
}

export default MainPage
