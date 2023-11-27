import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function HangerCard(props) {
 const {hanger,size,quantity,colour,det}=props
  return (
    <Card sx={{ maxWidth: size*2.5 , maxHeight: size*3.5  ,marginLeft:'20px'}}>
    <CardMedia
      component="img"
      alt={hanger.code}

      image={hanger.imageUrl}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
       {hanger.code}
      </Typography>
      <Typography variant="body2" color="text.secondary">
       {hanger.category}
      </Typography>
    </CardContent>
   {(quantity&&colour)?(<div><Typography gutterBottom variant="h6" component="div">
   Quantity:{quantity}
  </Typography>
  <Typography variant="h6" >
  Colour: {colour}
  </Typography></div>):null}
 {det?( <CardActions>
  <Button size="small">Share</Button>
  <Button size="small">Load More</Button>
</CardActions>):null}
  </Card>
  )
}

export default HangerCard