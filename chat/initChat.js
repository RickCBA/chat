import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

export function initChat(sessionId) {
  // Get config from global object
  const config     = window.widgetConfig.config;
  const practiceId = window.widgetConfig.practiceId;
  
  // Construct Webhook URL with only practiceId
  const webhookUrl = `https://closedbyrick.app.n8n.cloud/webhook/widget-message?practice_id=${encodeURIComponent(practiceId)}`;
  console.log('Using webhookUrl:', webhookUrl);
  
  createChat({
    webhookUrl,
    target: '#n8n-chat-widget-2',
    mode: 'window',
    showWelcomeScreen: false,
    initialMessages: [],
    sessionId,
    loadPreviousSession: false,
    onReady: (chat) => {
      window.chatInstance = chat;
      chat.sendMessage({
        action:   'sendMessage',
        sessionId,
        chatInput: config.content.welcomeMessage || 'Hello! How can I help?',
      });
    },
    i18n: {
      en: {
        title:            config.branding.title || '',
        subtitle:         '',
        inputPlaceholder: 'Type your question...',
      },
    },
  });
  
  // Auto-open behavior if configured
  if (config.behavior.autoOpen) {
    setTimeout(() => {
      const toggleButton = document.querySelector('#n8n-chat-widget-2-toggle');
      if (toggleButton && !document.querySelector('#n8n-chat-widget-2').classList.contains('open')) {
        toggleButton.click();
      }
    }, config.behavior.autoOpenDelay || 5000);
  }
}
