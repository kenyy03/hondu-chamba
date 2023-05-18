import { CardContent, Card, Typography, CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';

export default function BasicCard({ category = { name: '', icons: <div />, totalTalens: 0 } }) {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardActionArea>
          <CardContent >
            <Typography textAlign='center' > <span>{category?.icons && (category?.icons)}</span> </Typography>
            <Typography lg={{ fontSize: 14 }} color='text.secondary' textAlign='center' gutterBottom>
              {category?.name}
            </Typography>
            <Typography sx={{ fontSize: 12 }} color='text.secondary' textAlign='center' gutterBottom>
              {category?.totalTalens} Autónomos
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

BasicCard.propTypes = {
  category: PropTypes.object.isRequired,
}

BasicCard.defaultProps = {
  category: {
    name: '',
    icons: <div />,
    totalTalens: 0,
  },
};
