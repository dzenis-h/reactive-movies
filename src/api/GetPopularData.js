import axios from 'axios';
import { end_url, api_key } from '../config/config';

export default async function getPopular(
  dataType,
  searchTerm,
  keyword,
  offset = 1
) {
  try {
    let params = '';

    searchTerm === 'search' && keyword !== ''
      ? (params = `search/${dataType}?api_key=${api_key}&query=${keyword}&include_adult=false`)
      : (params = `${dataType}/popular?api_key=${api_key}`);

    params += '&language=en-US&page=' + offset;
    const { data } = await axios.get(end_url + params);
    return data;
  } catch (error) {
    console.log(error);
  }
}
