import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
  e.preventDefault();
  const searchText = e.target.elements['search-text'].value.trim();

  if (!searchText) {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = searchText;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  await fetchImages();
}

async function onLoadMore() {
  currentPage += 1;
  await fetchImages(true);
}

async function fetchImages(isLoadMore = false) {
  showLoader();

  try {
    const { hits, totalHits: total } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    totalHits = total;

    if (hits.length === 0 && !isLoadMore) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
    smoothScroll();

    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'An error occurred. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery li');
  if (card && currentPage > 1) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
