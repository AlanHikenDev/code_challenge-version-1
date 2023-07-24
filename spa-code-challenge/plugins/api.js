export default function ({ $axios }, inject) {
    //const url = location.host.split('.')
    let api_subdominio = 'http://code_challenge.test/' //aqui configuramos la url basica para axios
    //let host =  api_subdominio 
      
    console.log('host', api_subdominio)
    $axios.setBaseURL(api_subdominio)
    $axios.defaults.withCredentials = true;
  }
  