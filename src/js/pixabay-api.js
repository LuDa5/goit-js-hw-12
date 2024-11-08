const API_KEY = '46887087-5e19c9c0c2a23badfaaee9a20';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch images');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}




