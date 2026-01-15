/* global WebImporter */

/**
 * Parser for tabs-showcase block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: tabs
 *
 * Block Structure:
 * - Each row: [tab label | tab content (heading + image)]
 *
 * Source HTML Pattern (from cleaned.html):
 * <div class="w-tabs">
 *   <div class="w-tab-menu">
 *     <a class="w-tab-link">Tab Label</a>
 *     ...
 *   </div>
 *   <div class="w-tab-content">
 *     <div class="w-tab-pane">content</div>
 *     ...
 *   </div>
 * </div>
 *
 * Generated: 2026-01-15
 */
export default function parse(element, { document }) {
  // Extract tab menu links
  // VALIDATED: Found .w-tab-link elements in captured DOM
  const tabLinks = Array.from(element.querySelectorAll('.w-tab-link, .tab-menu-link-transparent'));

  // Extract tab panes
  // VALIDATED: Found .w-tab-pane elements in captured DOM
  const tabPanes = Array.from(element.querySelectorAll('.w-tab-pane'));

  // Build cells array - one row per tab
  const cells = [];

  tabLinks.forEach((tabLink, index) => {
    const tabLabel = tabLink.textContent.trim();
    const tabPane = tabPanes[index];

    if (tabPane) {
      // Extract heading and image from tab pane
      const heading = tabPane.querySelector('h2, h3, .heading-lg');
      const image = tabPane.querySelector('img');

      // Create content container
      const contentDiv = document.createElement('div');
      if (heading) {
        contentDiv.appendChild(heading.cloneNode(true));
      }
      if (image) {
        contentDiv.appendChild(image.cloneNode(true));
      }

      // Add row: [label | content]
      cells.push([tabLabel, contentDiv]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Tabs-Showcase',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
