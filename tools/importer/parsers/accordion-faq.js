/* global WebImporter */

/**
 * Parser for accordion-faq block
 *
 * Source: https://wknd-trendsetters.site
 * Base Block: accordion
 *
 * Block Structure:
 * - Each row: [question | answer]
 *
 * Source HTML Pattern (from cleaned.html):
 * <div class="accordion transparent-accordion w-dropdown">
 *   <div class="accordion-toggle w-dropdown-toggle">question</div>
 *   <nav class="accordion-content w-dropdown-list">answer</nav>
 * </div>
 *
 * Generated: 2026-01-15
 */
export default function parse(element, { document }) {
  // This parser handles a single accordion item
  // VALIDATED: Found accordion structure in captured DOM

  // Extract question (toggle element)
  const questionEl = element.querySelector('.accordion-toggle, .w-dropdown-toggle');
  const question = questionEl ? questionEl.textContent.trim() : '';

  // Extract answer (content element)
  const answerEl = element.querySelector('.accordion-content, .w-dropdown-list');
  const answerText = answerEl ? answerEl.textContent.trim() : '';

  // Build cells array - single row with question and answer
  const cells = [];

  if (question && answerText) {
    cells.push([question, answerText]);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Accordion-Faq',
    cells
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
