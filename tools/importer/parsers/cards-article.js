/**
 * Cards-Article Parser
 * Parses article cards into AEM block table format
 *
 * Expected input: DOM element containing article cards
 * Output: Array of table cells for Cards-Article block
 */

/**
 * Parse individual card content
 * @param {Element} card - Individual card element
 * @returns {Array} [imageCell, contentCell] for the row
 */
function parseCard(card) {
  // Extract image
  const img = card.querySelector('img');
  const imageHtml = img ? `![${img.alt || ''}](${img.src})` : '';

  // Extract category tag
  const categoryEl = card.querySelector(
    '.category, .tag, [class*="category"], [class*="tag"], .label',
  );
  const category = categoryEl ? `**${categoryEl.textContent.trim()}**` : '';

  // Extract title
  const titleEl = card.querySelector('h1, h2, h3, h4, .title, .headline');
  const title = titleEl ? titleEl.textContent.trim() : '';

  // Extract description
  const descEl = card.querySelector('p, .description, .excerpt, .summary');
  const description = descEl ? descEl.textContent.trim() : '';

  // Extract link
  const linkEl = card.querySelector('a[href]');
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

  if (description) {
    contentCell += `\n\n${description}`;
  }

  return [imageHtml, contentCell];
}

/**
 * Parse article cards container into table cells
 * @param {Element} element - The container element with article cards
 * @returns {Array} Array of arrays representing table rows
 */
export function parse(element) {
  const rows = [];

  // Find all article cards
  const cards = element.querySelectorAll(
    '.article-card, .article-tile, .card, .tile, [data-component="article"], article',
  );

  if (cards.length === 0) {
    // Single card - treat element itself as card
    const cardData = parseCard(element);
    if (cardData) {
      rows.push(cardData);
    }
  } else {
    // Multiple cards
    cards.forEach((card) => {
      const cardData = parseCard(card);
      if (cardData) {
        rows.push(cardData);
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
  return 'Cards-Article';
}

export default { parse, getBlockName };
