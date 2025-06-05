import { createCannedMessage } from './helper/createCannedMessage.js';
import { createTypingIndicator } from './helper/createTypingIndicator.js';
import { createTypingMessage } from './helper/createTypingMessage.js';

export async function getInitialMessages() {
  // Get config from global object
  const config = window.widgetConfig.config;
  
  setTimeout(() => {
    const chatMessagesList = document.querySelector(
      '#n8n-chat-widget-2 .chat-body .chat-messages-list'
    );
    if (chatMessagesList) {
      const message = createTypingMessage();
      const message2 = createTypingMessage();
      const cannedMsgDiv = createCannedMessage(config.content.cannedMessages);
      const typingDiv = createTypingIndicator();
      const typingDiv2 = createTypingIndicator();
      
      // Insert first message: with typing indicator
      message.appendChild(typingDiv);
      if (chatMessagesList && chatMessagesList.firstChild) {
        chatMessagesList.insertBefore(message, chatMessagesList.firstChild);
      }
      
      //  Replace typing in first message, insert second message with typing
      setTimeout(() => {
        message.removeChild(typingDiv);
        message.classList.remove(
          'chat-message-typing',
          'chat-message-typing-animation-bouncing'
        );
        message.innerHTML = `<p style="margin: 0; font-style: italic;">${config.content.privacyPolicy} <a href="${config.content.privacyPolicyLink}" target="_blank" style="color: inherit; text-decoration: underline;">Privacy Policy</a> </p>`;
        
        // First message: typing indicator
        message2.appendChild(typingDiv2);
        if (
          chatMessagesList &&
          chatMessagesList.firstChild.nextSibling.nextSibling
        ) {
          chatMessagesList.insertBefore(
            message2,
            chatMessagesList.firstChild.nextSibling
          );
        }
      }, 3500);
      
      //  Replace typing in second message
      setTimeout(() => {
        message2.removeChild(typingDiv2);
        message2.classList.remove(
          'chat-message-typing',
          'chat-message-typing-animation-bouncing'
        );
        message2.innerHTML = `<p style="margin: 0"> ${config.content.welcomeMessage}</p>`;
      }, 4500);
      
      // Show canned message options and enable scroll-Y automatically
      setTimeout(() => {
        const chatWindow = document.querySelector(
          '#n8n-chat-widget-2 .chat-body'
        );
        if (cannedMsgDiv && chatMessagesList && chatWindow) {
          chatMessagesList.insertBefore(
            cannedMsgDiv,
            chatMessagesList.firstChild.nextSibling.nextSibling
          );
        }
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 5000);
    }
  }, 500);
}
