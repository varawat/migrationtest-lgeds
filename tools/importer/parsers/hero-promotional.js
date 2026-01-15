/* global WebImporter */

/**
 * Parser for hero-promotional block
 *
 * Source: https://www.lg.com/fr/lg-experience
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Background image
 * - Row 2: Content (heading, description, CTA)
 *
 * Source HTML Pattern:
 * <div class="lg-tile-box js-grid-item">
 *   <div class="tile-box-container">
 *     <a href="...">
 *       <div class="image-container">
 *         <img src="..." alt="...">
 *       </div>
 *     </a>
 *     <div class="tile-content-container">
 *       <p class="category-tag"><a>Category</a></p>
 *       <h3><a>Title</a></h3>
 *       <div class="tile-description"><p><a>Description</a></p></div>
 *     </div>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-15
 */
export default function parse(element, { document }) {
  // Extract background image
  // VALIDATED: Found .image-container img in captured DOM
  const bgImage = element.querySelector('.image-container img') ||
                  element.querySelector('img.js-lazy-image') ||
                  element.querySelector('img');

  // Extract heading
  // VALIDATED: Found h3 with link in captured DOM
  const headingLink = element.querySelector('h3 a') ||
                      element.querySelector('h3');
  const heading = headingLink ? headingLink.textContent.trim() : '';

  // Extract description
  // VALIDATED: Found .tile-description p in captured DOM
  const descriptionEl = element.querySelector('.tile-description p a') ||
                        element.querySelector('.tile-description p') ||
                        element.querySelector('.tile-description');
  const description = descriptionEl ? descriptionEl.textContent.trim() : '';

  // Extract CTA link
  // VALIDATED: Found link in h3 element in captured DOM
  const ctaHref = element.querySelector('h3 a')?.getAttribute('href') ||
                  element.querySelector('.tile-box-container > a')?.getAttribute('href') ||
                  '#';

  // Build cells array matching hero block structure
  const cells = [];

  // Row 1: Background image (if present)
  if (bgImage) {
    const imgClone = bgImage.cloneNode(true);
    cells.push([imgClone]);
  }

  // Row 2: Content cell with heading, description, and CTA
  const contentCell = [];

  // Add heading as H2
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    contentCell.push(h2);
  }

  // Add description as paragraph
  if (description) {
    const p = document.createElement('p');
    p.textContent = description;
    contentCell.push(p);
  }

  // Add CTA button
  if (ctaHref && ctaHref !== '#') {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaHref;
    ctaLink.textContent = 'Découvrir';
    const strong = document.createElement('strong');
    strong.appendChild(ctaLink);
    contentCell.push(strong);
  }

  cells.push(contentCell);

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Promotional', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
