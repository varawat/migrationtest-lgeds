/**
 * LG Site Cleanup Transformer
 * Removes site-specific elements that shouldn't be imported
 */
export default function transform(document) {
  // Remove navigation and header elements
  const navElements = document.querySelectorAll(
    'header, nav, .header, .navigation, .gnb, .lnb, .mega-menu'
  );
  navElements.forEach(el => el.remove());

  // Remove footer elements
  const footerElements = document.querySelectorAll(
    'footer, .footer, .site-footer'
  );
  footerElements.forEach(el => el.remove());

  // Remove cookie banners and popups
  const popupElements = document.querySelectorAll(
    '.cookie-banner, .onetrust-consent, .popup, .modal, [id*="cookie"]'
  );
  popupElements.forEach(el => el.remove());

  // Remove scripts and styles
  const scriptElements = document.querySelectorAll(
    'script, style, noscript, iframe[src*="analytics"], iframe[src*="tracking"]'
  );
  scriptElements.forEach(el => el.remove());

  // Remove social share widgets
  const socialElements = document.querySelectorAll(
    '.social-share, .share-buttons, [class*="social-"]'
  );
  socialElements.forEach(el => el.remove());

  // Remove hidden elements
  const hiddenElements = document.querySelectorAll(
    '[style*="display: none"], [style*="visibility: hidden"], .hidden, .sr-only'
  );
  hiddenElements.forEach(el => el.remove());

  // Remove empty elements
  const emptyElements = document.querySelectorAll('div:empty, span:empty, p:empty');
  emptyElements.forEach(el => {
    if (!el.querySelector('img, picture, video, iframe')) {
      el.remove();
    }
  });

  return document;
}
