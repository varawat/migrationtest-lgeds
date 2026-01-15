/* global WebImporter */

/**
 * Parser for columns-hero-images block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Two side-by-side images
 *
 * Source HTML Pattern (from cleaned.html):
 * <div class="grid-layout grid-gap-md">
 *   <img src="..." />
 *   <img src="..." />
 * </div>
 *
 * Generated: 2026-01-15
 */
export default function parse(element, { document }) {
  // Extract images from the grid layout
  // VALIDATED: Found img elements in grid-layout in captured DOM
  const images = Array.from(element.querySelectorAll('img'));

  // Build cells array - two images in one row (side by side)
  const cells = [];

  if (images.length >= 2) {
    // Two columns: one image per column
    cells.push([images[0], images[1]]);
  } else if (images.length === 1) {
    // Single image fallback
    cells.push([images[0]]);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Columns-Hero-Images',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
