import { centerChatWindow } from './helper/centerChatWindow.js';

export function setupToggleButton() {
  const overlay = document.getElementById('chat-overlay');
  const chatToggleButton = document.querySelector(
    '#n8n-chat-widget-2 .chat-window-toggle'
  );

  // 1) Create the “By ClosedBy.ai” link
  const closedByLink = document.createElement('a');
  closedByLink.href = 'https://closedby.ai/';
  closedByLink.textContent = 'By ClosedBy.ai';
  closedByLink.target = '_blank';
  closedByLink.rel = 'noopener';
  // quick inline styles—you can move these into your CSS if you like
  closedByLink.style.display     = 'none';        // hidden until open
  closedByLink.style.marginLeft  = '8px';
  closedByLink.style.fontSize    = '12px';
  closedByLink.style.color       = '#666';
  closedByLink.style.textDecoration = 'none';

  // 2) Stick it right after your toggle button in the DOM
  chatToggleButton.parentNode.insertBefore(
    closedByLink,
    chatToggleButton.nextSibling
  );

  let manualClicked = false;
  let chatOpened    = false;

  chatToggleButton.addEventListener('click', () => {
    manualClicked = true;
    chatOpened    = !chatOpened;

    // show or hide the overlay & link
    overlay.style.display        = chatOpened ? 'block'       : 'none';
    closedByLink.style.display   = chatOpened ? 'inline-block': 'none';

    if (chatOpened) {
      // e.g. centerChatWindow();
    } else {
      // cleanup if needed
    }
  });
}
