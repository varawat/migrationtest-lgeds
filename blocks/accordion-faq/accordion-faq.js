export default function decorate(block) {
  [...block.children].forEach((row) => {
    // Label is the first div
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-faq-item-label';
    summary.append(...label.childNodes);

    // Body is the second div
    const body = row.children[1];
    body.className = 'accordion-faq-item-body';

    // Wrap in details element
    const details = document.createElement('details');
    details.className = 'accordion-faq-item';
    details.append(summary, body);
    row.replaceWith(details);
  });
}
