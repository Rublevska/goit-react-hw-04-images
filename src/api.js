import axios from 'axios';

const API_KEY = '39900013-82e79eee519eb27086eb14dd9';
const BASE_URL = 'https://pixabay.com/api/';

export const FetchImages = async (requestWord, pageNumber = 1) => {
  const params = {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    q: requestWord,
    page: pageNumber,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
};
