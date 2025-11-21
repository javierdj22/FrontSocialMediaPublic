import axios from 'axios';
import type { AxiosInstance } from 'axios';

const baseURL =
  import.meta.env.VITE_API_URL?.toString() ?? 'http://localhost:4000/api';

let client: AxiosInstance | null = null;

const createClient = () => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    // No timeout para esperar indefinidamente
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error.response?.data?.message ??
        error.message ??
        'Error de comunicación con el backend';
      return Promise.reject(new Error(message));
    },
  );

  return instance;
};

export const useApi = () => {
  if (!client) {
    client = createClient();
  }
  return client;
};

// Ejemplo de cómo usar AbortController para una petición específica:
export const getWithCancel = async (url: string) => {
  const controller = new AbortController();

  try {
    const response = await useApi().get(url, {
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error);
    } else {
      throw error;
    }
  } finally {
    // Si quieres, puedes cancelar manualmente después de un tiempo:
    // controller.abort();
  }
};
