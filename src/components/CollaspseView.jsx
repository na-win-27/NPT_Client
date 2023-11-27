import React from 'react'
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import {  Typography } from '@mui/material';
import { Box } from '@mui/system';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


const CollaspseView = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

  return (
      <>
    <Box marginLeft="20px" marginTop="10px" display="flex">
    <Typography variant="h4" >{props.name}</Typography>
    <ExpandMore
    expand={expanded}
    onClick={handleExpandClick}
    aria-expanded={expanded}
    aria-label="show more"
  >
    <ExpandMoreIcon />
  </ExpandMore>
  </Box>
  <Collapse style={{marginLeft:'20px'}} in={expanded} timeout="auto" unmountOnExit>
{props.children}
  </Collapse>

  </>
  )
}

export default CollaspseView