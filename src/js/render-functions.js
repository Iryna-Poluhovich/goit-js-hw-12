import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      img => `
    <li class="photo-card">
      <a href="${img.largeImageURL}">
        <div class="gallery-image">
          <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        </div>
        <div class="info">
          <p class="info-card"><b>Likes</b> ${img.likes}</p>
          <p class="info-card"><b>Views</b> ${img.views}</p>
          <p class="info-card"><b>Comments</b> ${img.comments}</p>
          <p class="info-card"><b>Downloads</b> ${img.downloads}</p>
        </div>
      </a>
    </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}