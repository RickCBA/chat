// main.js
(async function() {
  const baseUrl   = window.widgetConfig.baseUrl;
  const sessionId = window.widgetConfig.sessionId;

  // 1) import the loader & actually fetch your widget config
  const { loadWidgetConfig } = await import(`${baseUrl}/chat/config-loader.js`);
  const config = await loadWidgetConfig(sessionId);

  // 2) import everything else
  const { initChat }           = await import(`${baseUrl}/chat/initChat.js`);
  const { setupToggleButton }  = await import(`${baseUrl}/chat/toggleButton.js`);
  const { refreshButton }      = await import(`${baseUrl}/chat/refreshButton.js`);
  const { getInitialMessages } = await import(`${baseUrl}/chat/cannedMessages.js`);

  // 3) wire it all up _with_ config in hand
  initChat(config);
  setupToggleButton(config);
  refreshButton(getInitialMessages);
  getInitialMessages();
})();
