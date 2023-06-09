import { Brush, Code, Face2, HouseSidingOutlined, ScaleOutlined, SchoolOutlined, SportsEsports, StorefrontOutlined } from '@mui/icons-material';

export const categoriesIcons =(fontSize= 50) => ({
  'Desarrollo & IT': <Code sx={{fontSize: fontSize}} color='secondary' />,
  'Marketing': <StorefrontOutlined sx={{fontSize: fontSize}} color='secondary' />,
  'Arte & Diseño': <Brush sx={{fontSize: fontSize}} color='secondary' />,
  'Legal': <ScaleOutlined sx={{fontSize: fontSize}} color='secondary' />,
  'Hogar & Mantenimiento': <HouseSidingOutlined sx={{fontSize: fontSize}} color='secondary' />,
  'Entretenimiento': <SportsEsports sx={{fontSize: fontSize}} color='secondary' />,
  'Moda & Belleza': <Face2 sx={{fontSize: fontSize}} color='secondary' />,
  'Educacion': <SchoolOutlined sx={{fontSize: fontSize}} color='secondary' />,
});