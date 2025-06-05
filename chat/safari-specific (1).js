// Safari iOS margin fix for chat widget
// This script ensures the margin is applied correctly for both manual and auto-popup scenarios

document.addEventListener('DOMContentLoaded', function() {
  // Check if browser is Safari on iOS
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (isSafari && isIOS && window.innerWidth <= 480) {
    // Add Safari-specific class to body
    document.body.classList.add('safari-ios');
    
    // Function to apply margin fix to chat footer
    const applySafariMarginFix = () => {
      const chatFooter = document.querySelector('#n8n-chat-widget-2 .chat-footer');
      if (chatFooter) {
        chatFooter.style.marginBottom = '20svh';
        
        // Force a reflow to ensure the style is applied
        void chatFooter.offsetHeight;
      }
    };
    
    // Apply fix immediately for any existing elements
    applySafariMarginFix();
    
    // Set up a MutationObserver to watch for changes in the DOM
    // This will catch both manual and auto-popup scenarios
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          // Check if our target element exists after DOM changes
          const chatFooter = document.querySelector('#n8n-chat-widget-2 .chat-footer');
          if (chatFooter) {
            // Apply the fix with a slight delay to ensure animations complete
            setTimeout(applySafariMarginFix, 100);
          }
        }
      });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Also apply the fix after the auto-popup timeout
    // This ensures it works even if the MutationObserver misses something
    setTimeout(applySafariMarginFix, 2600); // 2500ms (auto-popup time) + 100ms buffer
  }
});
