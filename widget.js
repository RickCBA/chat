// widget.js
(async function() {
  // Get practice ID from script tag
  const scriptTag = document.currentScript;
  const practiceId = scriptTag.getAttribute('data-practice-id');
  
  if (!practiceId) {
    console.error('Chat widget requires a practice ID');
    return;
  }
  
  // Get the base URL from the current script
  const baseUrl = new URL(scriptTag.src).origin;
  
  // Create global config object
  window.widgetConfig = {
    practiceId,
    sessionId: crypto.randomUUID(),
    baseUrl
  };
  
  // Load configuration
  try {
    // Import the config loader with absolute URL
    const { loadWidgetConfig } = await import(`${baseUrl}/config-loader.js`);
    
    // Load configuration
    window.widgetConfig.config = await loadWidgetConfig(practiceId);
    
    // Load widget resources
    loadWidgetResources();
  } catch (error) {
    console.error('Error loading widget:', error);
  }
  
  function loadWidgetResources() {
    // Add CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${baseUrl}/style.css`;
    document.head.appendChild(link);
    
    // Add dynamic CSS
    const style = document.createElement('style');
    style.textContent = generateDynamicCSS(window.widgetConfig.config);
    document.head.appendChild(style);
    
    // Load main script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `${baseUrl}/main.js`;
    document.body.appendChild(script);
  }
  
  function generateDynamicCSS(config) {
    return `
      :root {
        --primary-color: ${config.colors.primary};
        --secondary-color: ${config.colors.secondary};
        --text-color: ${config.colors.text};
        --background-color: ${config.colors.background};
      }
      
      #n8n-chat-widget-2 {
        ${config.behavior.position === 'bottom-right' ? 'right: 20px; bottom: 20px;' : ''}
        ${config.behavior.position === 'bottom-left' ? 'left: 20px; bottom: 20px;' : ''}
        ${config.behavior.position === 'top-right' ? 'right: 20px; top: 20px;' : ''}
        ${config.behavior.position === 'top-left' ? 'left: 20px; top: 20px;' : ''}
      }
    `;
  }
})();
