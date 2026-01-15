/**
 * Carousel-Featured Parser
 * Parses hero carousel slides into AEM block table format
 *
 * Expected input: DOM element containing carousel slides
 * Output: Array of table cells for Carousel-Featured block
 */

/**
 * Parse individual slide content
 * @param {Element} slide - Individual slide element
 * @returns {Array} [imageCell, contentCell] for the row
 */
function parseSlide(slide) {
  // Extract image
  const img = slide.querySelector('img');
  const imageHtml = img ? `![${img.alt || ''}](${img.src})` : '';

  // Extract category tag
  const categoryEl = slide.querySelector('.category, .tag, [class*="category"], [class*="tag"]');
  const category = categoryEl ? `**${categoryEl.textContent.trim()}**` : '';

  // Extract title/headline
  const titleEl = slide.querySelector('h1, h2, h3, .title, .headline');
  const title = titleEl ? titleEl.textContent.trim() : '';

  // Extract link
  const linkEl = slide.querySelector('a[href]');
  const link = linkEl ? linkEl.href : '';

  if (!title) return null;

  // Build content cell
  let contentCell = '';
  if (category) contentCell += `${category}\n\n`;
  if (link) {
    contentCell += `### [${title}](${link})`;
  } else {
    contentCell += `### ${title}`;
  }

  return [imageHtml, contentCell];
}

/**
 * Parse a carousel slide element into table cells
 * @param {Element} element - The carousel slide element
 * @returns {Array} Array of arrays representing table rows
 */
export function parse(element) {
  const rows = [];

  // Find all slides
  const slides = element.querySelectorAll('.hero-slide, .carousel-item, .slide, [data-slide]');

  if (slides.length === 0) {
    // Single slide - treat element itself as slide
    const slideData = parseSlide(element);
    if (slideData) {
      rows.push(slideData);
    }
  } else {
    // Multiple slides
    slides.forEach((slide) => {
      const slideData = parseSlide(slide);
      if (slideData) {
        rows.push(slideData);
      }
    });
  }

  return rows;
}

/**
 * Get the block name for this parser
 * @returns {string} Block name with variant
 */
export function getBlockName() {
  return 'Carousel-Featured';
}

export default { parse, getBlockName };
