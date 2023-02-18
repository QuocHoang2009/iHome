import { Box, Dialog, DialogTitle, Stack, Switch } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BoxEdit from '../../components/BoxEdit';
import ButtonStyle from '../../components/ButtonStyle';
import HeaderChild from '../../components/HeaderChild';
import ModalDelete from '../../components/ModalDelete';
import { getHome, inforADE, linkHome, unLinkHome, updateDevice } from '../../const/API';

const RelaysDialog = (props) =>{
    const nodes = useSelector((state)=> state.nodes);
    const relayNodes = nodes.filter(node=> (node.type === "Relay") && (node.isADE === true));
    const { onClose, selectedValue, open } = props;

    const relays = relayNodes.map((relayNode)=>{
        const channels = relayNode?.channels.map((relayChannel)=>{
            return relayChannel;
        });

        const relay = channels.map((channel)=> {
            return  {...channel, ...relayNode};
        });

        return relay;
    })
    
    let relayChannels =[];
    for(let i = 0; i < relays.length; i++){
        relayChannels = relayChannels.concat(relays[i]);
    }

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const handleClose = () => {
      onClose(selectedValue);
    };

    const CheckChannel = (channel, key)=>{
        channel = channel.channel;
        if(channel?.link) return;
        
        return(
            <ListItem disableGutters  key={key} >
                <ListItemButton onClick={() => handleListItemClick(channel)}>
                    <ListItemText primary={channel?.name + " channel " + channel?.channel} />
                </ListItemButton>
            </ListItem>
        )
    }
    
    return(
        <Dialog onClose={()=>handleClose()} open={open} >
            <DialogTitle minWidth="200px">SELECT RELAY CHANNEL</DialogTitle>
            <List sx={{ pt: 0 }} >
                {relayChannels.map((relay, index) => 
                    <CheckChannel channel={relay} key={index}/>
                )}
                <ListItemButton onClick={() => handleListItemClick()}>
                    <ListItemText primary={"Cancel"} />
                </ListItemButton>
            </List>
        </Dialog> 
    )
}

const RelaySession = (props)=>{
    const {width, handleReset} = props;
    const [home, setHome] = useState(useSelector((state)=>state.currentHome));
    const [relay, setRelay] = useState();
    const [data, setData] = useState();
    const [isReset, setIsReset] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [openModalDelete, setOpenModalDelete] = useState(false);
    
    useEffect(()=>{
        (async ()=>{
            if(home?.relay){
                const api = inforADE + home.relay;
                const res = await axios.get(api);
                const {relay, data} = res.data;
                setRelay(relay);
                setData(data);
            }
            else{
                setRelay(null);
                setData(null);
            }
        })()
    }, [isReset, home?.relay, home]);

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = async (value)=>{
        setOpenModal(false);
        setSelectedValue(value);

        const data = {
            home: home._id,
            relay: value?.channels[0]._id
        }

        await axios.patch(linkHome, {
            body: data,
        })
        .then((res) => {
            handleReset();
            setHome({...home, relay: value?.channels[0]._id})
            setIsReset(!isReset);
        })
        .catch((error) => {
            if(error?.response){
                console.log(error.response.data);
            }
            else{
                console.log(error);
            }
        });
    }

    const handleChangeState = async ()=>{
        const data = {
            mqttPath: home.mqttPath,
            relay: relay,
        }

        await axios.patch(updateDevice, {
            body: data,
        })
        .then((res) => {
            setIsReset(!isReset);
        })
        .catch((error) => {
            if(error?.response){
                console.log(error.response.data);
            }
            else{
                console.log(error);
            }
        });
    }

    const handleUnlinkRelay = async ()=>{
        setOpenModalDelete(false);
        const data = {
            relayChannel: relay._id,
            home: home._id
        }

        await axios.patch(unLinkHome, {
            body: data,
        })
        .then((res) => {
            handleReset();
            setIsReset(!isReset);
        })
        .catch((error) => {
            if(error?.response){
                console.log(error.response.data);
            }
            else{
                console.log(error);
            }
        });
    }

    const deleteHandle = ()=>{
        setOpenModalDelete(true);
    }

    return(
        <Box width={width}>
            {(openModalDelete && (
                <ModalDelete 
                    open={openModalDelete} 
                    handleModal={setOpenModalDelete} 
                    name={"Unlink Relay"}
                    handleDelete={handleUnlinkRelay}
            />))}

            {relay ? (
                <Stack direction="row" spacing="2px" width="100%">
                    <BoxEdit title="Relay" button="Unlink" buttonHandle={deleteHandle}>
                        {(relay?.state !== undefined) && <Switch checked={relay?.state} onChange={handleChangeState}/>}
                    </BoxEdit>
                </Stack>
            ) :(
                <ButtonStyle width="150px" height="60px" name="Link with relay ADE" handleClick={handleClickOpenModal}/>
            )}
            <RelaysDialog
                selectedValue={selectedValue}
                open={openModal}
                onClose={handleCloseModal}
            />
        </Box>
    )
}

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sensor, setSensor] = useState();
    const [currentHome, setCurrentHome] = useState(useSelector((state)=> state.currentHome));
    const [home, setHome] = useState(useSelector((state)=>state.currentHome));
    const [relay, setRelay] = useState();
    const [data, setData] = useState();
    const [isReset, setIsReset] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [openModalDelete, setOpenModalDelete] = useState(false);
    
    useEffect(()=>{
        (async ()=>{
            if(currentHome?._id){
                const api = getHome + currentHome?._id;
                const res = await axios.get(api);
                setCurrentHome(res.data);
            }
        })()
    }, [isReset, currentHome._id, dispatch]);

    useEffect(()=>{
        (async ()=>{
            if(home?.relay){
                const api = inforADE + home.relay;
                const res = await axios.get(api);
                const {relay, data} = res.data;
                setRelay(relay);
                setData(data);
            }
            else{
                setRelay(null);
                setData(null);
            }
        })()
    }, [isReset, home?.relay, home]);

    const handleEdit = ()=>{
        navigate('/edithome');
    }

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = async (value)=>{
        setOpenModal(false);
        setSelectedValue(value);

        const data = {
            home: home._id,
            relay: value?.channels[0]._id
        }

        const res = await axios.patch(linkHome, {
            body: data,
        })
        console.log(res.data)
        dispatch(setCurrentHome({currentHome: res.data}))
    }

    const handleChangeState = async ()=>{
        const data = {
            mqttPath: home.mqttPath,
            relay: relay,
        }

        await axios.patch(updateDevice, {
            body: data,
        })
        .then((res) => {
            setIsReset(!isReset);
        })
        .catch((error) => {
            if(error?.response){
                console.log(error.response.data);
            }
            else{
                console.log(error);
            }
        });
    }

    const handleUnlinkRelay = async ()=>{
        setOpenModalDelete(false);
        const data = {
            relayChannel: relay._id,
            home: home._id
        }

        const res = await axios.patch(unLinkHome, {
            body: data,
        })
        console.log(res.data)
        dispatch(setCurrentHome({currentHome: res.data}))
    }

    const deleteHandle = ()=>{
        setOpenModalDelete(true);
    }

    return (
        <Box m="20px">
            <HeaderChild title="My Home" subtitle="Information Home" addButton="Edit Home" buttonHandle={handleEdit}/>
            <Stack direction="row" spacing="2px" width="100%" >
                <Box width="75%">
                    {(openModalDelete && (
                        <ModalDelete 
                            open={openModalDelete} 
                            handleModal={setOpenModalDelete} 
                            name={"Unlink Relay"}
                            handleDelete={handleUnlinkRelay}
                    />))}

                    {relay ? (
                        <Stack direction="row" spacing="2px" width="100%">
                            <BoxEdit title="Relay" button="Unlink" buttonHandle={deleteHandle}>
                                {(relay?.state !== undefined) && <Switch checked={relay?.state} onChange={handleChangeState}/>}
                            </BoxEdit>
                        </Stack>
                    ) :(
                        <ButtonStyle width="150px" height="60px" name="Link with relay ADE" handleClick={handleClickOpenModal}/>
                    )}
                    <RelaysDialog
                        selectedValue={selectedValue}
                        open={openModal}
                        onClose={handleCloseModal}
                    />
                </Box>
                <div>Sensor</div>
            </Stack>
        </Box>
    )
};

export default HomePage;