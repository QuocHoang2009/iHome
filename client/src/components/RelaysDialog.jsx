import { Dialog, DialogTitle } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from "react-redux";

const RelaysDialog = (props) =>{
    const nodes = useSelector((state)=> state.nodes);
    const relayNodes = nodes.filter(node=> node.type === "Relay");
    const { onClose, selectedValue, open } = props;

    const relays = relayNodes.map((relayNode)=>{
        const channels = relayNode.channels.map((relayChannel)=>{
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

export default RelaysDialog;