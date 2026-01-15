import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const slides = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-featured-slides';

  slides.forEach((slide, index) => {
    const slideEl = document.createElement('div');
    slideEl.className = `carousel-featured-slide ${index === 0 ? 'active' : ''}`;

    while (slide.firstElementChild) {
      const child = slide.firstElementChild;
      if (child.querySelector('picture')) {
        child.className = 'carousel-featured-image';
      } else {
        child.className = 'carousel-featured-content';
      }
      slideEl.append(child);
    }
    wrapper.append(slideEl);
  });

  // Optimize images
  wrapper.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '1200' }]));
  });

  // Add navigation dots
  const nav = document.createElement('div');
  nav.className = 'carousel-featured-nav';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `carousel-featured-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      wrapper.querySelectorAll('.carousel-featured-slide').forEach((s, i) => {
        s.classList.toggle('active', i === index);
      });
      nav.querySelectorAll('.carousel-featured-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
    });
    nav.append(dot);
  });

  block.replaceChildren(wrapper, nav);
}
