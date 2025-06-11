import { centerChatWindow } from './helper/centerChatWindow.js';

export function setupToggleButton(config) {
  // 1) grab the wrapper (our “overlay”)
  const overlay = document.querySelector('.chat-window-wrapper');
  const chatToggleButton = document.querySelector(
    '#n8n-chat-widget-2 .chat-window-toggle'
  );

  // 2) inject the real <a> (hidden by default)
  const brandingLink = document.createElement('a');
  brandingLink.href        = 'https://closedby.ai';
  brandingLink.target      = '_blank';
  brandingLink.rel         = 'noopener';
  brandingLink.className   = 'chat-toggle-branding';
  brandingLink.textContent = '⚡ By Closedby.ai';
  brandingLink.style.display = 'none';
  chatToggleButton.parentNode.insertBefore(
    brandingLink,
    chatToggleButton.nextSibling
  );

  let manualClicked = false;
  let chatOpened    = false;

  chatToggleButton.addEventListener('click', () => {
    manualClicked = true;
    chatOpened    = !chatOpened;

    // show/hide the wrapper
    overlay.style.display = chatOpened ? 'flex' : 'none';

    // toggle an “open” flag on the button (for CSS, if you want)
    chatToggleButton.classList.toggle('open', chatOpened);

    // show/hide our real <a>
    brandingLink.style.display = chatOpened ? 'block' : 'none';

    if (chatOpened) {
      centerChatWindow();
    }
  });

  // 3) auto-open after delay, unless user already clicked
  if (config.behavior.autoOpen) {
    setTimeout(() => {
      if (!manualClicked && !chatOpened) {
        chatToggleButton.click();
      }
    }, config.behavior.autoOpenDelay || 4000);
  }
}
