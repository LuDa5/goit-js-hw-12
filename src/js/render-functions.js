import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <a class="gallery-item" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p><strong>Likes:</strong> ${likes}</p>
        <p><strong>Views:</strong> ${views}</p>
        <p><strong>Comments:</strong> ${comments}</p>
        <p><strong>Downloads:</strong> ${downloads}</p>
      </div>
    </a>
  `).join('');
  
  gallery.insertAdjacentHTML('beforeend', markup); 
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showNotification(type, message) {
  if (type === 'error') {
    iziToast.error({ title: 'Error', message });
  } else {
    iziToast.success({ title: 'Success', message });
  }
}