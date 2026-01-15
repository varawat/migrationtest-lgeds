/* global WebImporter */

/**
 * LG Site Cleanup Transformer
 * Purpose: Remove site-specific elements that shouldn't be imported
 * Applies to: www.lg.com (all templates including /de/lg-experience, /fr/lg-experience)
 * Generated: 2026-01-15
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow
 * - LG Experience France page (lg.com/fr/lg-experience)
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent dialogs
    // EXTRACTED: Found in captured DOM <div id="onetrust-consent-sdk">
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '.onetrust-pc-dark-filter',
      '[class*="cookie"]',
      '#CybotCookiebotDialog'
    ]);

    // Remove navigation and header elements
    // EXTRACTED: Found header, gnb (global nav), lnb (local nav) in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'header',
      'nav',
      '.gnb',
      '.lnb',
      '.mega-menu',
      '.c-gnb-wrap',
      '.c-header',
      '.header-wrap'
    ]);

    // Remove footer elements
    // EXTRACTED: Found footer class patterns in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'footer',
      '.footer',
      '.site-footer',
      '.c-footer'
    ]);

    // Remove popup/modal overlays that may block content
    WebImporter.DOMUtils.remove(element, [
      '.modal',
      '.popup',
      '.c-notification-banner',
      '.c-popup'
    ]);

    // Re-enable scrolling if disabled
    if (element.style && element.style.overflow === 'hidden') {
      element.setAttribute('style', 'overflow: scroll;');
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove tracking scripts and iframes
    WebImporter.DOMUtils.remove(element, [
      'script',
      'style',
      'noscript',
      'link[rel="stylesheet"]',
      'iframe[src*="analytics"]',
      'iframe[src*="tracking"]',
      'iframe[src*="adservice"]'
    ]);

    // Remove social share widgets
    // EXTRACTED: Found social-share class patterns in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.social-share',
      '.share-buttons',
      '.c-social-icons'
    ]);

    // Remove hidden elements
    WebImporter.DOMUtils.remove(element, [
      '.hidden',
      '.sr-only',
      '[aria-hidden="true"]'
    ]);

    // Clean up tracking attributes
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-analytics');
      el.removeAttribute('data-gtm');
    });
  }
}
