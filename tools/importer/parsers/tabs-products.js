/**
 * Tabs-Products Parser
 * Parses tabbed product category navigation into AEM block table format
 *
 * Expected input: DOM element containing tabs with product grids
 * Output: Array of table cells for Tabs-Products block
 */

/**
 * Parse tabs container into table cells
 * @param {Element} element - The tabs container element
 * @returns {Array} Array of arrays representing table rows (one per tab)
 */
export function parse(element) {
  const rows = [];

  // Find tab buttons/labels
  const tabButtons = element.querySelectorAll(
    '.tab-button, .tab-label, [role="tab"], button[data-tab], .nav-tab'
  );

  // Find tab panels/content
  const tabPanels = element.querySelectorAll(
    '.tab-panel, .tab-content, [role="tabpanel"], .tab-pane'
  );

  if (tabButtons.length === 0) {
    // No structured tabs found, try alternative parsing
    const sections = element.querySelectorAll('[data-category], .category-section');
    sections.forEach(section => {
      const tabData = parseTabSection(section);
      if (tabData) {
        rows.push(tabData);
      }
    });
  } else {
    // Parse each tab
    tabButtons.forEach((button, index) => {
      const panel = tabPanels[index] || null;
      const tabData = parseTab(button, panel);
      if (tabData) {
        rows.push(tabData);
      }
    });
  }

  return rows;
}

/**
 * Parse individual tab and its content
 * @param {Element} button - Tab button element
 * @param {Element} panel - Tab panel element (optional)
 * @returns {Array} [labelCell, contentCell] for the row
 */
function parseTab(button, panel) {
  // Extract tab label
  const label = button.textContent.trim();
  if (!label) return null;

  // Extract items from panel
  let contentCell = '';

  if (panel) {
    const items = panel.querySelectorAll(
      '.product-item, .category-item, a, .item'
    );

    const itemsMarkdown = [];
    items.forEach(item => {
      const img = item.querySelector('img');
      const text = item.querySelector('.title, .name, span, p');
      const link = item.href || item.querySelector('a')?.href;

      const itemText = text ? text.textContent.trim() : '';
      const imgSrc = img ? img.src : '';
      const imgAlt = img ? (img.alt || itemText) : '';

      if (link && imgSrc) {
        itemsMarkdown.push(`[![${imgAlt}](${imgSrc})](${link}) ${itemText}`);
      } else if (link) {
        itemsMarkdown.push(`[${itemText}](${link})`);
      } else if (imgSrc) {
        itemsMarkdown.push(`![${imgAlt}](${imgSrc}) ${itemText}`);
      } else if (itemText) {
        itemsMarkdown.push(itemText);
      }
    });

    contentCell = itemsMarkdown.join('\n');
  }

  return [label, contentCell];
}

/**
 * Parse a category section as a tab alternative
 * @param {Element} section - Section element with category data
 * @returns {Array} [labelCell, contentCell] for the row
 */
function parseTabSection(section) {
  const label = section.getAttribute('data-category') ||
                section.querySelector('.category-title')?.textContent?.trim() ||
                'Category';

  const items = section.querySelectorAll('a, .item');
  const itemsMarkdown = [];

  items.forEach(item => {
    const img = item.querySelector('img');
    const text = item.textContent.trim();
    const link = item.href || item.querySelector('a')?.href;

    if (link && img) {
      itemsMarkdown.push(`[![${img.alt || text}](${img.src})](${link}) ${text}`);
    } else if (link) {
      itemsMarkdown.push(`[${text}](${link})`);
    }
  });

  return [label, itemsMarkdown.join('\n')];
}

/**
 * Get the block name for this parser
 * @returns {string} Block name with variant
 */
export function getBlockName() {
  return 'Tabs-Products';
}

export default { parse, getBlockName };
