export function setupToggleButton() {
  const chatToggleButton = document.querySelector(
    '#n8n-chat-widget-2 .chat-window-toggle'
  );

  // 1) Create the “By ClosedBy.ai” link
  const closedByLink = document.createElement('a');
  closedByLink.href              = 'https://closedby.ai/';
  closedByLink.textContent       = 'By ClosedBy.ai';
  closedByLink.target            = '_blank';
  closedByLink.rel               = 'noopener';
  closedByLink.style.display     = 'none';       // hide by default
  closedByLink.style.marginLeft  = '8px';
  closedByLink.style.fontSize    = '12px';
  closedByLink.style.color       = '#666';
  closedByLink.style.textDecoration = 'none';

  // 2) Insert it immediately after the toggle button
  chatToggleButton.parentNode.insertBefore(
    closedByLink,
    chatToggleButton.nextSibling
  );

  // 3) Wire up your open/close toggle
  let chatOpened = false;
  chatToggleButton.addEventListener('click', () => {
    chatOpened = !chatOpened;
    // only toggle the link now
    closedByLink.style.display = chatOpened ? 'inline-block' : 'none';
  });
}
