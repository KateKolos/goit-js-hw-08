import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);

function createItemsMarkup(items) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}"
            alt="${description}" />
        </a>`;
    })
    .join('');
}

galleryContainer.addEventListener('click', onImageClick);

function onImageClick(evt) {
  evt.preventDefault();

  if (
    evt.target.nodeName !== 'IMG' &&
    !document.querySelector('.simpleLightbox')
  ) {
    return;
  }
  const source = evt.target.dataset.source;

  const instance = SimpleLightbox.create(`
    <img src="${source}" width="800" height="600">`);

  instance.show();

  document.addEventListener('keydown', addKeyboardHandler);

  function addKeyboardHandler(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 100,
  captionType: 'alt',
  //   animationSlide: true,
  //   animationSpeed: 250,
  widthRatio: 0.8,
  heightRatio: 0.9,
});

// var lightbox = new SimpleLightbox(".gallery a", {
//   /* options */
// });
