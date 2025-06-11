import { centerChatWindow } from './helper/centerChatWindow.js';

export function setupToggleButton(config) {
  // 1) Grab the actual window, not the wrapper
  const chatWindow        = document.querySelector('#n8n-chat-widget-2 .chat-window');
  const chatToggleButton  = document.querySelector('#n8n-chat-widget-2 .chat-window-toggle');

  // 2) Inject your real <a> pill (hidden by default)
  const brandingLink = document.createElement('a');
  brandingLink.href         = 'https://closedby.ai';
  brandingLink.target       = '_blank';
  brandingLink.rel          = 'noopener';
  brandingLink.className    = 'chat-toggle-branding';
  brandingLink.textContent  = '⚡ By Closedby.ai';
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

    // SHOW/HIDE only the chat window
    chatWindow.style.display = chatOpened ? 'flex' : 'none';

    // toggle an “open” flag on the button for CSS hooks if you want
    chatToggleButton.classList.toggle('open', chatOpened);

    // show/hide our branding <a>
    brandingLink.style.display = chatOpened ? 'block' : 'none';

    if (chatOpened) {
      centerChatWindow();
    }
  });

  // 3) Auto-open logic: only fire if user hasn't already clicked
  if (config.behavior.autoOpen) {
    setTimeout(() => {
      if (!manualClicked && !chatOpened) {
        chatToggleButton.click();
      }
    }, config.behavior.autoOpenDelay ?? 4000);
  }
}
