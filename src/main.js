import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery, showNotification } from './js/render-functions';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

function showLoadingIndicator() {
  loader.style.display = 'block';
}

function hideLoadingIndicator() {
  loader.style.display = 'none';
}

function showLoadMoreButton() {
  loadMoreBtn.hidden = false;
}

function hideLoadMoreButton() {
  loadMoreBtn.hidden = true;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const queryInput = event.target.elements.query;
  const query = queryInput.value.trim();
  
  if (!query) {
    showNotification('error', 'Please enter a search term.');
    return;
  }

  clearGallery();
  currentPage = 1;
  currentQuery = query;
  queryInput.value = '';
  hideLoadMoreButton();
  showLoadingIndicator();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showNotification('error', 'No images matching your search query. Try again!');
      return;
    }

    renderGallery(data.hits);
    lightbox.refresh();
    showLoadMoreButton();

    if (data.hits.length < 15 || currentPage * 15 >= totalHits) {
      hideLoadMoreButton();
      showNotification('info', "We're sorry, but you've reached the end of search results.");
    }

  } catch (error) {
    showNotification('error', 'Failed to fetch images.');
  } finally {
    hideLoadingIndicator();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoadingIndicator();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderGallery(data.hits);
    lightbox.refresh();

    smoothScroll();

    if (currentPage * 15 >= totalHits) {
      hideLoadMoreButton();
      showNotification('info', "We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    showNotification('error', 'Failed to load more images.');
  } finally {
    hideLoadingIndicator();
  }
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}