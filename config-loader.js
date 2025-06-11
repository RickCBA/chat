// config-loader.js
export async function loadWidgetConfig(practiceId) {
  try {
    const response = await fetch(`https://closedbyrick.app.n8n.cloud/webhook/widget-config?practice_id=${practiceId}` );
    if (!response.ok) throw new Error('Failed to load widget configuration');
    return await response.json();
  } catch (error) {
    console.error('Error loading widget configuration:', error);
    // Return default configuration
    return {
      colors: {
        primary: '#4f46e5',
        secondary: '#ffffff',
        text: '#000000',
        background: '#ffffff'
      },
      content: {
        welcomeMessage: 'Hello, how can I help?',
        privacyPolicy: 'We may store personal data and use it to contact you.',
        privacyPolicyLink: 'https://closedby.ai/legal/#privacy-policy',
        cannedMessages: [
          { text: 'How do you help?', value: 'Describe how you can help me' },
          { text: 'Book appointment', value: 'I want to book an appointment' }
        ]
      },
      behavior: {
        autoOpen: true,
        autoOpenDelay: 5000,
        position: 'bottom-right'
      },
      branding: {
        logo: 'https://raw.githubusercontent.com/RickCBA/widget-centered/8b12518cc4d3732b69f9b179b4e5973e992dd1fd/Alan%20avatar.jpg',
        title: 'Chat with us'
      }
    };
  }
}
