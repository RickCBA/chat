import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

export function initChat(sessionId ) {
  // Get config from global object
  const config = window.widgetConfig.config;
  const practiceId = window.widgetConfig.practiceId;
  
  // Get User ID and Phone from vapiUserData
  const currentUserId = (typeof vapiUserData !== 'undefined' && vapiUserData.UUID !== null)
    ? vapiUserData.UUID
    : null;
  const currentUserPhone = (typeof vapiUserData !== 'undefined' && vapiUserData.phone)
    ? vapiUserData.phone
    : null;
    
  // Construct Webhook URL with userId & phone parameters
  let webhookUrl = "https://closedbyrick.app.n8n.cloud/webhook/425716f6-8ec3-4d6c-b02a-59c22e6c0842";
  let queryParams = [];
  
  // Add practice_id to the webhook URL
  queryParams.push(`practice_id=${encodeURIComponent(practiceId )}`);
  
  if (currentUserId !== null) {
    queryParams.push(`userId=${encodeURIComponent(currentUserId)}`);
  }
  if (currentUserPhone !== null) {
    queryParams.push(`phone=${encodeURIComponent(currentUserPhone)}`);
  }
  if (queryParams.length > 0) {
    webhookUrl += `?${queryParams.join('&')}`;
  }
  
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
        action: 'sendMessage',
        sessionId,
        chatInput: config.content.welcomeMessage || 'Hello! How can I help?',
      });
    },
    i18n: {
      en: {
        title: config.branding.title || '',
        subtitle: '',
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
