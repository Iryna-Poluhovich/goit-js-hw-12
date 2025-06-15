import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50805377-c760a6bd689a5892724b0890e';

const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
