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
  // Extract colors from config
  const primary = config.colors.primary;
  const secondary = config.colors.secondary;
  const text = config.colors.text;
  const logoUrl = config.branding.logo || 'https://raw.githubusercontent.com/RickCBA/widget-centered/8b12518cc4d3732b69f9b179b4e5973e992dd1fd/Alan%20avatar.jpg';
  
  return `
    #n8n-chat-widget-2 {
      --primary-color: ${primary} !important;
      --secondary-color: ${secondary} !important;
      --text-colour: ${text} !important;
      --logo-url: url('${logoUrl}' )
      
      ${config.behavior.position === 'bottom-right' ? 'right: 20px; bottom: 20px;' : ''}
      ${config.behavior.position === 'bottom-left' ? 'left: 20px; bottom: 20px;' : ''}
      ${config.behavior.position === 'top-right' ? 'right: 20px; top: 20px;' : ''}
      ${config.behavior.position === 'top-left' ? 'left: 20px; top: 20px;' : ''}
    }
  `;
}
})();
