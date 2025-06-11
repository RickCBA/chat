// chat/toggleButton.js
import { centerChatWindow } from './helper/centerChatWindow.js';

// assume you have `config` in scope here; if not, pass it into this function.
export function setupToggleButton(config) {
  const overlay          = document.getElementById('chat-overlay');
  const chatToggleButton = document.querySelector(
    '#n8n-chat-widget-2 .chat-window-toggle'
  );

  // 1) Inject a real <a> tag for your “Powered by…” pill
  const brandingLink = document.createElement('a');
  brandingLink.href        = 'https://closedby.ai';
  brandingLink.target      = '_blank';
  brandingLink.rel         = 'noopener';
  brandingLink.className   = 'chat-toggle-branding';
  brandingLink.textContent = '⚡ By Closedby.ai';
  brandingLink.style.display = 'none';
  // put it right after the toggle button in the DOM:
  chatToggleButton.parentNode.insertBefore(
    brandingLink,
    chatToggleButton.nextSibling
  );

  let manualClicked = false;
  let chatOpened    = false;

  chatToggleButton.addEventListener('click', () => {
    manualClicked = true;             // user has now clicked
    chatOpened    = !chatOpened;      // flip open/closed

    // show or hide the overlay:
    overlay.style.display = chatOpened ? 'block' : 'none';

    // tag the button itself with an “open” class:
    chatToggleButton.classList.toggle('open', chatOpened);

    // now show or hide your branding link:
    brandingLink.style.display = chatOpened ? 'block' : 'none';

    if (chatOpened) {
      centerChatWindow();
      // …any other “on open” logic…
    }
  });

  // 2) Re-implement your auto-open here so it won’t fire
  //    if the user has already clicked (manualClicked),
  //    and only if the chat is still closed
  if (config.behavior.autoOpen) {
    setTimeout(() => {
      if (!manualClicked && !chatOpened) {
        chatToggleButton.click();
      }
    }, config.behavior.autoOpenDelay || 4000 /* or 5000 */);
  }
}
