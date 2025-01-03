import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';

const Cards = () => {
    return ( 
        <div style={{ 
            display: 'flex', 
            width: '95%', 
            border: '1px solid white', 
            margin: 'auto',
            borderRadius: '8px',
            padding: 3,
            border: "1px solid rgba(255, 255, 255, 0.3)", 
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)", 
            color: "#333"}}>
            <Card sx={{ padding: '20px', backgroundColor: ' #FFE2E5', height: '120px', width: '300px', margin: '50px auto'}}>
                <Typography variant="h6">Available Medicines</Typography>
                <Typography variant="h4">120</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #FFF4DE', height: '120px', width: '300px', margin: '50px auto'}}>
                <Typography variant="h6">Expired Medicines</Typography>
                <Typography variant="h4">120</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #DCFCE7', height: '120px', width: '300px', margin: '50px auto'}}>
                <Typography variant="h6">Overview Savings</Typography>
                <Typography variant="h4">120</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #F3E8FF', height: '120px', width: '300px', margin: '50px auto'}}>
                <Typography variant="h6">History</Typography>
                <Typography variant="h4">120</Typography>
            </Card>
        </div>
     );
}
 
export default Cards;