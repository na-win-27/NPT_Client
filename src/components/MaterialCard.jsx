import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const card =(data)=>{
    return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         {data.category}
        </Typography>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Stock:{data.stock}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Price:{data.price}
      </Typography>
        <Typography variant="body2">
          Minimum Stock:{data.minStock}
          <br />
          {data.unit}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Load More</Button>
      </CardActions>
    </React.Fragment>
  )};


  export default function MaterialCard(props) {
    return (
      <Box sx={{ maxWidth: 250,margin:"20px" }}>
        <Card variant="outlined">{card(props.data)}</Card>
      </Box>
    );
  }