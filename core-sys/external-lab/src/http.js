import axios from 'axios';
export default axios.create({
  baseURL: 'http://127.0.0.1:7000/api',
  // baseURL: 'https://newgreatdoc.macrohealthplus.org/api',
  headers: {
    'databaseName' : 'mhpdemocom'
  },
});