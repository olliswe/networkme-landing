import React, {useState} from 'react';
import {Fab, Menu, MenuItem} from "@material-ui/core"
import ShareIcon from '@material-ui/icons/Share';
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon} from "react-share";

const ShareButton = (props) => {


    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpen = (event) => {setAnchorEl(event.currentTarget)}
    const handleClose = () => {setAnchorEl(null)}

    return (
        <div>
            <Fab size="medium" color="primary" onClick={handleOpen} aria-controls="share-menu" aria-haspopup="true">
                <ShareIcon />
            </Fab>
            <Menu
                id="share-menu"
                open={!!anchorEl}
                onClose={handleClose}
                anchorEl={anchorEl}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className='shareButton'
                PaperProps={{
                    style:{
                        backgroundColor:"transparent"
                    }
                }}
            >
                <div>
                    <FacebookShareButton onClick={handleClose} url={props.url}><FacebookIcon round={true} size={40}/></FacebookShareButton>
                </div>
                <div>
                    <TwitterShareButton onClick={handleClose} url={props.url}><TwitterIcon round={true} size={40}/></TwitterShareButton>
                </div>
                <div>
                    <LinkedinShareButton onClick={handleClose} url={props.url}><LinkedinIcon round={true} size={40}/></LinkedinShareButton>
                </div>
                <div>
                    <WhatsappShareButton onClick={handleClose} url={props.url}><WhatsappIcon round={true} size={40}/></WhatsappShareButton>
                </div>
            </Menu>
        </div>
    );
};

export default ShareButton;
