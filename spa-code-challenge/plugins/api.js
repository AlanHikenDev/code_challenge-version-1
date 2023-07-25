export default function ({ $axios }, inject) {
    let api_subdominio = 'https://api-code.alandev.tech/' //aqui configuramos la url basica para axios
      
    console.log('host', api_subdominio)
    $axios.setBaseURL(api_subdominio)
    $axios.defaults.withCredentials = true;
  }
  