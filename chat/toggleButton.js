export function setupToggleButton() {
  const chatToggleButton = document.querySelector(
    '#n8n-chat-widget-2 .chat-window-toggle'
  );

  // 1) Create the link once:
  const closedByLink = document.createElement('a');
  closedByLink.href           = 'https://closedby.ai/';
  closedByLink.textContent    = 'By ClosedBy.ai';
  closedByLink.target         = '_blank';
  closedByLink.rel            = 'noopener';
  closedByLink.classList.add('closedby-link');
  // hide by default; CSS will flip this when we add `.open` to the toggle:
  closedByLink.style.display  = 'none';

  // 2) Append it *inside* your existing toggle element:
  chatToggleButton.appendChild(closedByLink);

  let chatOpened = false;
  chatToggleButton.addEventListener('click', () => {
    chatOpened = !chatOpened;

    // 3) Toggle an “open” class on the toggle container:
    chatToggleButton.classList.toggle('open', chatOpened);

    // 4) Optionally, if you *also* still want to show/hide via inline:
    closedByLink.style.display = chatOpened ? 'block' : 'none';
  });
}
