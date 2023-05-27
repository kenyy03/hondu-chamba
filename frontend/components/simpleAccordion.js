import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../styles/Grid.module.css';
import { catergories } from '@/pages';

export default function SimpleAccordion({my = 'my-1', fontSize = '12px'}) {
  return (
    <div className={styles[my]}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Categorias</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {catergories(25)?.map((category) => (
              <ListItem key={category?.id} disablePadding >
                <ListItemButton>
                  <ListItemIcon>
                    {category?.icons}
                  </ListItemIcon>
                  <ListItemText primary={category?.name} primaryTypographyProps={{fontSize: fontSize}}  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Localizacion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField id="outlined-basic" label="Buscar colonia" variant="outlined" fullWidth />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
