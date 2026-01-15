export default function decorate(block) {
  const tabList = document.createElement('div');
  tabList.className = 'tabs-products-list';
  tabList.setAttribute('role', 'tablist');

  const tabPanels = document.createElement('div');
  tabPanels.className = 'tabs-products-panels';

  [...block.children].forEach((row, index) => {
    const tabLabel = row.children[0]?.textContent?.trim() || `Tab ${index + 1}`;
    const tabContent = row.children[1];

    // Create tab button
    const tab = document.createElement('button');
    tab.className = `tabs-products-tab ${index === 0 ? 'active' : ''}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', index === 0);
    tab.setAttribute('aria-controls', `panel-${index}`);
    tab.textContent = tabLabel;

    // Create tab panel
    const panel = document.createElement('div');
    panel.className = `tabs-products-panel ${index === 0 ? 'active' : ''}`;
    panel.setAttribute('role', 'tabpanel');
    panel.id = `panel-${index}`;
    if (tabContent) {
      panel.innerHTML = tabContent.innerHTML;
    }

    // Tab click handler
    tab.addEventListener('click', () => {
      tabList.querySelectorAll('.tabs-products-tab').forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', false);
      });
      tabPanels.querySelectorAll('.tabs-products-panel').forEach((p) => {
        p.classList.remove('active');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', true);
      panel.classList.add('active');
    });

    tabList.append(tab);
    tabPanels.append(panel);
  });

  block.replaceChildren(tabList, tabPanels);
}
