import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme/index';
import createEmotionCache from '@/config/createEmotionCache';
import '@/styles/globals.css';
import { GlobalProvider } from '@/redux/globalProvider';
import { SnackbarProvider } from 'notistack';
import { Global } from '@emotion/react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const ScrollStyles = () => (
  <Global 
    styles={`                                        
      /* Estilos para motores Webkit y blink (Chrome, Safari, Opera... )*/

      body::-webkit-scrollbar {
        -webkit-appearance: none;
      }

      body::-webkit-scrollbar:vertical {
        width:10px;
      }

      body::-webkit-scrollbar-button:increment, body::-webkit-scrollbar-button {
        display: none;
      } 

      body::-webkit-scrollbar:horizontal {
        height: 10px;
      }

      body::-webkit-scrollbar-thumb {
        background-color: #797979;
        border-radius: 20px;
        border: 2px solid #f1f2f3;
      }

      body::-webkit-scrollbar-track {
        border-radius: 10px;  
      }
    `}
  />
);

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <GlobalProvider>
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
              <ScrollStyles />
              <Component {...pageProps} />
            </SnackbarProvider>
          </GlobalProvider>
        </ChakraProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};