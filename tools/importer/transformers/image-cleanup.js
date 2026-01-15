/**
 * Image Cleanup Transformer
 * Fixes image sources and removes tracking pixels
 */
export default function transform(document) {
  // Remove tracking pixels (1x1 images, analytics images)
  const trackingImages = document.querySelectorAll(
    'img[width="1"], img[height="1"], img[src*="pixel"], img[src*="tracking"], img[src*="analytics"], img[src*="adservice"]'
  );
  trackingImages.forEach(el => el.remove());

  // Fix lazy-loaded images
  const lazyImages = document.querySelectorAll('img[data-src], img[data-lazy-src]');
  lazyImages.forEach(img => {
    const realSrc = img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
    if (realSrc) {
      img.setAttribute('src', realSrc);
    }
  });

  // Convert picture elements to simple img for import
  const pictures = document.querySelectorAll('picture');
  pictures.forEach(picture => {
    const img = picture.querySelector('img');
    if (img) {
      picture.replaceWith(img);
    }
  });

  // Fix relative image URLs
  const images = document.querySelectorAll('img[src^="/"]');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src && src.startsWith('/') && !src.startsWith('//')) {
      img.setAttribute('src', `https://www.lg.com${src}`);
    }
  });

  return document;
}
