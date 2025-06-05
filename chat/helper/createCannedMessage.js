export function createCannedMessage(cannedMessages = []) {
  const div = document.createElement('div');
  div.className = 'chat-message chat-message-from-bot my-canned-bot-message';
  
  let buttonsHTML = '';
  
  // Use provided canned messages or fallback to defaults
  const messages = cannedMessages.length > 0 ? cannedMessages : [
    { text: "How do you help?", value: "Describe the scale of the problem and how you solve it!" },
    { text: "How do you close leads?", value: "Can you explain the impact of delayed engagement on leads?" }
  ];
  
  messages.forEach(message => {
    buttonsHTML += `<button data-message="${message.text}" data-send="${message.value}">${message.text}</button>`;
  });
  
  div.innerHTML = `
      <div style="position: relative;">
        <div class="canned-messages-grid">
          ${buttonsHTML}
        </div>
      </div>`;
      
  // Add event listeners to buttons
  setTimeout(() => {
    const buttons = div.querySelectorAll('.canned-messages-grid button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const messageText = button.getAttribute('data-send');
        const chatInputField = document.querySelector(
          '#n8n-chat-widget-2 textarea'
        );
        if (chatInputField) {
          chatInputField.value = messageText;
          chatInputField.dispatchEvent(new Event('input', { bubbles: true }));
          // delay to give widget time to activate send button
          setTimeout(() => {
            const sendButton = document.querySelector(
              '#n8n-chat-widget-2 .chat-footer button'
            );
            if (sendButton) sendButton.click();
          }, 150);
        }
      });
    });
  }, 100);
  
  return div;
}
