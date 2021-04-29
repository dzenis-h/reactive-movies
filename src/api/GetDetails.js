import axios from 'axios';
import { end_url, api_key } from '../config/config';

const getDetails = async (dataType, id) => {
  try {
    let endPoint = `${end_url}${dataType}/${id}?api_key=${api_key}&language=en-US&page=1`;
    const { data } = await axios.get(endPoint);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getDetails;
