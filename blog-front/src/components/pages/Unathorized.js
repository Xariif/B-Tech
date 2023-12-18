import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Unathorized() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ textAlign: 'center', m: 'auto' }}>
      <h1>401</h1>
      <h2>Unauthorized</h2>
      <div>
        <Button onClick={goBack}>Go Back</Button>
      </div>
    </Box>
  );
}
