/* global WebImporter */

/**
 * Transformer for WKND Trendsetters website cleanup
 * Purpose: Remove navigation, footer, and non-content elements
 * Applies to: wknd-trendsetters.site (all templates)
 * Generated: 2026-01-15
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow (cleaned.html)
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove navigation
    // EXTRACTED: Found <div class="nav secondary-nav"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.nav.secondary-nav',
      '.nav-container',
      '.w-nav-menu'
    ]);

    // Remove footer elements
    // EXTRACTED: Found footer elements in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'footer',
      '.footer-section',
      '.w-footer'
    ]);

    // Re-enable scrolling if disabled
    if (element.style.overflow === 'hidden') {
      element.setAttribute('style', 'overflow: scroll;');
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Clean up tracking attributes
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('data-w-id');
      el.removeAttribute('data-wf-page');
      el.removeAttribute('data-wf-site');
    });

    // Remove remaining unwanted elements
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      'noscript',
      'source'
    ]);
  }
}
