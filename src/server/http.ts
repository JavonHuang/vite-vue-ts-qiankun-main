import axios, { AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL
});

// 请求拦截
http.interceptors.request.use((request) => request, (error) => Promise.reject(error));

// 响应拦截
http.interceptors.response.use((response) => response, (err) => Promise.reject(err));

interface Ihttp{ 
  method: 'post' | 'get',
  url: string, data: any,
  config?: AxiosRequestConfig
}



const request=(params:Ihttp)=>{ 
  let fetch:any = null

  switch (params.method) {
    case 'post': {
      fetch = http.post(params.url, params.data, params.config)
      break
    }
    case 'get': {
      fetch = http.get(params.url,params.config)
      break
    }
  }
  return fetch;
}


export default request;