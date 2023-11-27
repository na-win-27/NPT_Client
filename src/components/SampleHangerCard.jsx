import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function SampleHangerCard(props) {
    const {hanger}=props
    const theme = useTheme();
  
    return (
      <Card sx={{ display: 'flex', alignItems:'center' ,width:"300px" ,height:"200px" }}>
        <Box sx={{ display: 'flex',   flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
          
            <Typography component="div" variant="h4">
             {hanger.id.code}
            </Typography>
            <Typography variant="h6" color="text.secondary" component="div">
            {hanger.id.category}
          </Typography>
            <Typography variant="h4" color="text.secondary" component="div">
              Quantity:{hanger.quantity}
            </Typography>
            <Typography variant="h4" color="text.secondary" component="div">
           Colour: {hanger.colour.name}
          </Typography>
         
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 125,height:100 }}
          image={hanger.id.imageUrl}
          alt={hanger.id.code}
        />
      </Card>
    );
  }