// main.js
(async function() {
  const baseUrl = window.widgetConfig.baseUrl;
  
  // Import modules with absolute URLs
  const { initChat } = await import(`${baseUrl}/chat/initChat.js`);
  const { setupToggleButton } = await import(`${baseUrl}/chat/toggleButton.js`);
  const { refreshButton } = await import(`${baseUrl}/chat/refreshButton.js`);
  const { getInitialMessages } = await import(`${baseUrl}/chat/cannedMessages.js`);
  
  const sessionId = window.widgetConfig.sessionId;
  window.chatInstance = null;
  
  initChat(sessionId); // Function to create chat instance
  setupToggleButton(config); // Function to set Toggle button
  refreshButton(getInitialMessages); // Function to trigger getInitialMessages()
  getInitialMessages(); // Function to get initial messages on load
})();
