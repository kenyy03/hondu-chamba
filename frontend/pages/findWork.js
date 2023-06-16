import React, { useState } from 'react';
import Layout from '../components/layout';
import styles from '../styles/FindWork.module.css';
import utilities from '../styles/Grid.module.css';
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import TextFieldIcons from '@/components/textFieldIcons';
import MultilineTextField from '@/components/multilineTextField';
import { enqueueSnackbar } from 'notistack';
import { enviroment } from '@/config/enviroment';

const Container = styled.main( props => ({
  margin: props.roleName === 'Recruiter' ? '5rem 15rem' : '10rem 15rem'
}) );

const ContainerForm = styled.div(props => ({
  padding: '1rem',
  borderRadius: '1rem',
  border: '1px solid #ccc',
}));

const CustomForm = styled.form(props => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.2rem',
}));

const SectionFields = styled.section(props => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function FindWork() {
  const userInfoState = useSelector(state => state.userReducer.userInfo);
  const [selectedEmploye, setSelectedEmploye] = useState(
    employes?.find(f => f.id === 1)
  );
  const [showModal, setShowModal] = useState(false);
  const [employesDetails, setEmployesDetails] = useState({});
  const [jobs, setJobs] = useState([]);

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChangeNewEmploye = e => {
    const { name, value } = e.target;
    setEmployesDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateNewJob = async e => {
    try{
      const { jobName='', jobType='', requirements=[], description='' } = employesDetails;
      e.preventDefault();
      const url = `${enviroment.DEV_BASE_API_URL}/create-job`;
      const newJob = {
        nameEmployer: `${userInfoState?.names} ${userInfoState?.lastNames}`,
        jobName,
        jobType,
        imageCompany: userInfoState?.imageProfile?.url,
        description: description,
        requirements: requirements?.split('.')?.map(requirement => requirement.trim()).filter(requirement => requirement !== ''),
      };
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${userInfoState?.token}`
        },
        body: JSON.stringify(newJob),
      });

      if(!response.ok){
        enqueueSnackbar(`Error al crear la plaza: ${response?.statusText}`, {variant: 'error'});
        return;
      }
      const { data = {}, message= ''} = await response.json();

      const jobsUpdated = [...jobs, data];
      setJobs(jobsUpdated);
      enqueueSnackbar(`${message}`, {variant: 'success'});
    }catch(error){
      enqueueSnackbar(`Error al crear la plaza: ${error?.message}`, {variant: 'error'});
    }
  };

  const onRenderContentModal = () => {

    return (
      <>
        <h2 style={{textAlign: 'center'}} >Crear nueva plaza</h2>
        <ContainerForm>
          <CustomForm>
            <SectionFields >
              <TextFieldIcons 
                id={1}
                label='Nombre de la vacante'
                value={employesDetails?.jobName}
                name='jobName'
                onChange={handleInputChangeNewEmploye}
                type='text'
                color='secondary'
                size='small'
                variant='outlined'
                focused={true}
              />
              <TextFieldIcons 
                id={2}
                label='Tipo de plaza'
                value={employesDetails?.jobType}
                name='jobType'
                onChange={handleInputChangeNewEmploye}
                type='text'
                color='secondary'
                size='small'
                variant='outlined'
                focused={true}
              />
              
            </SectionFields>
            <SectionFields >
              <MultilineTextField 
                id={3}
                label='Requisitos'
                value={employesDetails?.requirements}
                name='requirements'
                onChange={handleInputChangeNewEmploye}
                helperText='Termina cada requerimiento con un punto (.)'
                fullWidth={true}
              />
            </SectionFields>
            <SectionFields >
              <MultilineTextField 
                id={4}
                label='Descripcion de la plaza'
                value={employesDetails?.description}
                name='description'
                onChange={handleInputChangeNewEmploye}
                helperText='Agrega la descripcion como parrafo'
                fullWidth={true}  
              />
            </SectionFields>
          </CustomForm>
          <div style={{display: 'flex', justifyContent:'center', alignItems:'center', marginTop: '1rem', marginBottom: '1rem'}} >
            <Button variant="outlined" color='secondary' onClick={handleCreateNewJob} >Guardar</Button>
          </div>
        </ContainerForm>
      </>
    )
  };


  return (
    <Layout 
      title='Find Work' 
      description='En esta pagina podras encontrar el trabajo que tanto estas buscando' 
      showModal={showModal}
      onShowModal={onShowModal}
      onCloseModal={onCloseModal} 
      onRenderContentModal={onRenderContentModal}
    >
      <Container roleName={userInfoState?.role?.name}  >
        <h1 className={styles['title-page']}>Empleos Disponibles</h1>
        <section className={styles['container-employes']}>
          <div>
            <h2>Listado de empleos</h2>
            <List>
              {employes?.map(employe => (
                <ListItem
                  key={employe?.id}
                  alignItems='center'
                  divider
                  disablePadding
                >
                  <ListItemButton
                    selected={selectedEmploye?.id === employe?.id}
                    onClick={e => setSelectedEmploye(employe)}
                  >
                    <ListItemText
                      primary={employe?.nombreVacante}
                      primaryTypographyProps={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                      secondary={
                        <>
                          <br />
                          <Typography
                            sx={{ display: 'inline' }}
                            component='span'
                            variant='body2'
                            color='text.primary'
                          >
                            {`${employe?.Empleador} - ${employe?.lugar}`}
                          </Typography>
                          <br />
                          Plaza - {employe?.tipoPlaza}
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
          <div className={`${utilities['px-2']} ${utilities['py-2']} ${utilities['border-left']} `} >
            <header className={styles['header-details-employes']}>
              <div>
                <Image
                  width={60}
                  height={30}
                  alt={`${selectedEmploye?.id} - ${selectedEmploye?.nombreVacante}`}
                  src={selectedEmploye?.imageCompany}
                  loading='lazy'
                />
              </div>
              <div className={`${utilities['principal-font']} ${utilities['mb-2']} `} >
                <h3 className={styles['vacant-name']} >{selectedEmploye?.nombreVacante}</h3>
                <h4 className={`${styles.employer} ${utilities['mb-1']}`} >{selectedEmploye.Empleador}</h4>
                <p className={styles.details} >{selectedEmploye.lugar} - Plaza {selectedEmploye.tipoPlaza} </p>
                <p className={styles['post-date']} >{selectedEmploye.fechaPublicacion}</p>
              </div>
              <div className={styles.actions} >
                <div><Button variant="outlined">Solicitar</Button></div>
              </div>
            </header>
            <Divider  />
            <article>
              <h3 className={styles.employer} >Detalles de la plaza</h3>
              <p className={`${styles.details} ${utilities['mt-1']}`} >{selectedEmploye?.detailsEmploye?.description}</p>
              <h3 className={`${styles.employer} ${utilities['mt-1']}`} >Requisitos</h3>
              <ul className={utilities['mx-2']} >
                {selectedEmploye?.detailsEmploye?.requirements?.map((requirement, index) => (
                  <li className={`${styles.details} ${utilities['mt-1']}`} key={index} >{requirement}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const employes = [
  {
    id: 1,
    nombreVacante: 'Mecanico',
    Empleador: 'Auto Repuestos',
    lugar: 'San Pedro Sula',
    tipoPlaza: 'Permanente',
    fechaPublicacion: '15 Mayo 2023',
    imageCompany:
      'https://cdn.pixabay.com/photo/2016/09/25/14/10/rocket-1693791_1280.png',
    detailsEmploye: {
      description: 'Como mecánico, serás responsable de realizar reparaciones y mantenimiento en vehículos automotores, asegurando su correcto funcionamiento y rendimiento. Tu papel principal será diagnosticar y solucionar problemas mecánicos, eléctricos y electrónicos, así como realizar reparaciones y reemplazos de piezas según sea necesario.',
      requirements: [
        'Experiencia comprobada como mecánico automotriz.',
        'Conocimientos sólidos de sistemas automotrices, componentes y funcionamiento.',
        'Habilidad para diagnosticar y solucionar problemas mecánicos y eléctricos.',
        'Capacidad para utilizar herramientas y equipos de manera efectiva y segura.',
        'Excelentes habilidades de organización y atención al detalle.',
      ],
    },
  },
  {
    id: 2,
    nombreVacante: 'Asesor de Ventas',
    Empleador: 'Tienda de Ropa - Scarlet',
    lugar: 'San Pedro Sula',
    tipoPlaza: 'Permanente',
    fechaPublicacion: '15 Mayo 2023',
    imageCompany:
      'https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_1280.png',
      detailsEmploye: {
        description: 'Como asesor de ventas, serás responsable de promover y vender los productos o servicios de la empresa, brindando asesoramiento y atención personalizada a los clientes. Tu objetivo principal será lograr las metas de ventas, establecer relaciones sólidas con los clientes y garantizar su satisfacción.',
        requirements: [
          'Experiencia previa en ventas, preferiblemente en el sector o industria relacionada.',
          'Excelentes habilidades de comunicación verbal y escrita.',
          'Orientación al cliente y capacidad para establecer relaciones sólidas.',
          'Capacidad para identificar las necesidades de los clientes y ofrecer soluciones adecuadas.',
          'Habilidades de negociación y cierre de ventas.',
        ],
      },
  },
  {
    id: 3,
    nombreVacante: 'Diseñador Grafico',
    Empleador: 'Robenior',
    lugar: 'San Pedro Sula',
    tipoPlaza: 'Permanente',
    fechaPublicacion: '15 Mayo 2023',
    imageCompany:
      'https://cdn.pixabay.com/photo/2017/09/07/10/25/logo-2724481_1280.png',
      detailsEmploye: {
        description: 'Como diseñador gráfico, serás responsable de crear y desarrollar elementos visuales para comunicar mensajes efectivos y atractivos. Trabajarás en estrecha colaboración con el equipo de marketing y otros departamentos para crear diseños impactantes que representen la identidad de la marca y satisfagan las necesidades del cliente.',
        requirements: [
          'Experiencia comprobada como diseñador gráfico o en un rol similar.',
          'Dominio de software de diseño gráfico, como Adobe Creative Suite (Photoshop, Illustrator, InDesign) u otros equivalentes.',
          'Fuerte sentido de la estética y la creatividad.',
          'Conocimiento de los principios de diseño gráfico, como la composición, el color y la tipografía.',
          'Capacidad para trabajar en proyectos múltiples y gestionar plazos ajustados.',
        ],
      },
  },
  {
    id: 4,
    nombreVacante: 'Estilista Profesional',
    Empleador: 'Cliente - Camila Pineda',
    lugar: 'San Pedro Sula',
    tipoPlaza: 'Permanente',
    fechaPublicacion: '15 Mayo 2023',
    imageCompany:
      'https://cdn.pixabay.com/photo/2015/02/18/16/09/spring-640958_1280.jpg',
    detailsEmploye: {
      description: 'Como estilista profesional, serás responsable de proporcionar servicios de peluquería y estilismo a los clientes, brindando una experiencia personalizada y de calidad. Tu objetivo principal será ayudar a los clientes a lograr el estilo y la apariencia deseados, ofreciendo asesoramiento experto y aplicando técnicas de corte, peinado y coloración.',
      requirements: [
        'Experiencia comprobada como estilista profesional en salones de belleza o peluquerías.',
        'Conocimientos sólidos de técnicas de corte, peinado y coloración de cabello.',
        'Habilidad para interpretar las necesidades y preferencias de los clientes y ofrecer soluciones adecuadas.',
        'Creatividad y sentido estético para crear estilos únicos y atractivos.',
        'Destreza manual y atención al detalle para realizar cortes y peinados precisos.',
      ],
    },
  },
];
