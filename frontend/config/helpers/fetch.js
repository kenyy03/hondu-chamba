import { enviroment } from "../enviroment";
import { enqueueSnackbar } from "notistack";


export const getUserInfo = async ({ receiverId, token }) => {
  try {
    const url = `${enviroment.DEV_BASE_API_URL}/user-by-id?_id=${receiverId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    if (!response.ok) {
      enqueueSnackbar(`${response.statusText}`, { variant: 'error' });
      return;
    }
    const { data = {} } = await response.json();
    return data;
  } catch (error) {
    return { message: error.message };
  }
};