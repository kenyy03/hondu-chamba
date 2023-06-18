import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../styles/Grid.module.css';
import { useSelector } from 'react-redux';

export default function SimpleAccordion({ my = 'my-1', fontSize = '12px' }) {
  const categories = useSelector(state => state?.categoryReducer?.categories);
  return (
    <div className={styles[my]}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Categorias</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {categories?.map(category => (
              <ListItem key={category?.id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{category?.icons}</ListItemIcon>
                  <ListItemText
                    primary={category?.name}
                    primaryTypographyProps={{ fontSize: fontSize }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Localizacion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            id='outlined-basic'
            label='Buscar ciudad'
            variant='outlined'
            fullWidth
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
