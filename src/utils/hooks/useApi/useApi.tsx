import axios from 'axios';

export const useApi = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  const get = async <T,>(url: string): Promise<T> => {
    const response = await api.get(url, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    return response.data;
  };

  const post = async <T, B>(url: string, data?: B): Promise<T> => {
    const response = await api.post(url, data, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    return response.data;
  };

  const put = async <T, B>(url: string, data?: B): Promise<T> => {
    const response = await api.put(url, data, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    return response.data;
  };

  const patch = async <T, B>(url: string, data?: B): Promise<T> => {
    const response = await api.patch(url, data, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    return response.data;
  };

  const del = async <T,>(url: string): Promise<T> => {
    const response = await api.delete(url, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    return response.data;
  };

  return {
    get,
    post,
    put,
    patch,
    del,
  };
};
