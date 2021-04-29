import axios from 'axios';
import { end_url, api_key } from '../config/config';

export default async function getCredits(dataType, id) {
  try {
    let endPoint = `${end_url}${dataType}/${id}/credits?api_key=${api_key}&language=en-US&page=1`;
    const { data } = await axios.get(endPoint);
    return data;
  } catch (error) {
    console.log(error);
  }
}
