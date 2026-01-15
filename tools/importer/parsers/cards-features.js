/* global WebImporter */

/**
 * Parser for cards-features block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: cards
 *
 * Block Structure:
 * - Each row: Single column with text content (no images)
 *
 * Source HTML Pattern (from cleaned.html):
 * <div class="grid-layout desktop-4-column">
 *   <div>text content</div>
 *   ...
 * </div>
 *
 * Generated: 2026-01-15
 */
export default function parse(element, { document }) {
  // Extract feature items from grid
  // VALIDATED: Found div children with paragraph content in captured DOM
  const items = Array.from(element.querySelectorAll(':scope > div'));

  // Build cells array - one row per feature item
  const cells = [];

  items.forEach((item) => {
    // Get text content from each item
    const text = item.querySelector('p, .paragraph-sm') || item;
    if (text && text.textContent.trim()) {
      cells.push([text.cloneNode(true)]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards-Features',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
