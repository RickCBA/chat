export function setupToggleButton() {
  const chatToggleButton = document.querySelector(
    '#n8n-chat-widget-2 .chat-window-toggle'
  );

  // 1️⃣ Create a <span> pill wrapper instead of an <a>
  const closedByPill = document.createElement('span');
  closedByPill.classList.add('closedby-pill');
  // we'll toggle this on/off via CSS when .open is present
  closedByPill.style.display = 'none';

  // 2️⃣ Add the “⚡️By ” text
  closedByPill.appendChild(document.createTextNode('⚡️By\u00A0'));

  // 3️⃣ Create the real link, just for the domain
  const closedByLink = document.createElement('a');
  closedByLink.href        = 'https://closedby.ai/';
  closedByLink.textContent = 'ClosedBy.ai';
  closedByLink.target      = '_blank';
  closedByLink.rel         = 'noopener';
  closedByLink.classList.add('closedby-link');
  // make it inherit the pill’s text-color
  closedByLink.style.color           = 'inherit';
  closedByLink.style.textDecoration  = 'none';

  closedByPill.appendChild(closedByLink);

  // 4️⃣ Insert the pill into the toggle button
  chatToggleButton.appendChild(closedByPill);

  // 5️⃣ Toggle visibility on click
  let chatOpened = false;
  chatToggleButton.addEventListener('click', () => {
    chatOpened = !chatOpened;
    chatToggleButton.classList.toggle('open', chatOpened);
    closedByPill.style.display = chatOpened ? 'inline-block' : 'none';
  });
}
