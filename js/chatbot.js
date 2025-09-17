/**
 * DBT Sahayak - Intelligent Chatbot Assistant
 * Helps users with DBT and Aadhaar-related queries
 */

class DBTSahayakChatbot {
  constructor() {
    this.isOpen = false;
    this.messageHistory = [];
    this.isTyping = false;
    
    // Initialize elements
    this.initializeElements();
    
    // Bind events
    this.bindEvents();
    
    // Initialize knowledge base
    this.initializeKnowledgeBase();
    
    // Show initial notification
    this.showNotification();
  }
  
  initializeElements() {
    this.chatToggle = document.getElementById('chatbot-toggle');
    this.chatWindow = document.getElementById('chatbot-window');
    this.chatClose = document.getElementById('chatbot-close');
    this.messagesContainer = document.getElementById('chatbot-messages');
    this.messageInput = document.getElementById('chatbot-message-input');
    this.sendButton = document.getElementById('chatbot-send');
    this.notification = document.getElementById('chat-notification');
    this.quickActions = document.querySelectorAll('.quick-action');
  }
  
  bindEvents() {
    // Toggle chat window
    this.chatToggle.addEventListener('click', () => this.toggleChat());
    this.chatClose.addEventListener('click', () => this.closeChat());
    
    // Send message events
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Quick action buttons
    this.quickActions.forEach(action => {
      action.addEventListener('click', () => {
        const message = action.getAttribute('data-message');
        this.sendUserMessage(message);
      });
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !e.target.closest('#chatbot-container')) {
        // Don't close immediately, let user interact
      }
    });
    
    // Hide notification when chat is opened
    this.chatToggle.addEventListener('click', () => {
      this.hideNotification();
    });
  }
  
  initializeKnowledgeBase() {
    this.knowledgeBase = {
      greetings: [
        "Hello! I'm your DBT Sahayak Assistant. How can I help you with DBT and Aadhaar-related queries today?",
        "Hi there! I'm here to help you understand DBT-enabled accounts and Aadhaar linking. What would you like to know?",
        "Welcome! I can assist you with anything related to DBT accounts, Aadhaar linking, and student benefits. How may I help?"
      ],
      
      dbtBasics: {
        keywords: ['what is dbt', 'dbt meaning', 'direct benefit transfer', 'dbt definition'],
        response: `🏦 **Direct Benefit Transfer (DBT)** is a government initiative to transfer subsidies and benefits directly to beneficiaries' bank accounts.

**Key Points:**
• Eliminates middlemen and reduces corruption
• Ensures timely delivery of benefits
• Provides transparency in benefit distribution
• Requires Aadhaar-seeded bank account

**For students:** DBT helps you receive scholarships, education allowances, and skill development funds directly in your account!`
      },
      
      difference: {
        keywords: ['difference', 'aadhaar linked vs dbt', 'aadhaar vs dbt', 'what\'s the difference'],
        response: `🤔 **Great question! Here's the key difference:**

**🏦 Aadhaar-Linked Account:**
• Your Aadhaar number is connected to your bank account
• Bank can verify your identity
• Basic requirement for account opening

**💰 DBT-Enabled Account:**
• Your account is designated to receive government benefits
• Specifically configured for Direct Benefit Transfers
• Requires additional activation beyond Aadhaar linking

**Think of it this way:** Aadhaar-linking is like having an ID card, while DBT-enabling is like getting a VIP pass for government benefits! 🎟️`
      },
      
      checkStatus: {
        keywords: ['check status', 'how to check', 'verify account', 'check dbt status'],
        response: `✅ **Here's how to check if your account is DBT-enabled:**

**Method 1: PFMS Website**
• Visit pfms.nic.in
• Click "Know Your Payment"
• Enter your Aadhaar number
• View your account status

**Method 2: Bank Visit**
• Visit your bank branch
• Ask for "DBT status verification"
• They can check and enable if needed

**Method 3: Call Banking Helpline**
• Call your bank's customer care
• Provide Aadhaar and account details
• Request DBT status check

**Pro Tip:** Keep your Aadhaar card and bank passbook handy when checking! 📋`
      },
      
      enableDbt: {
        keywords: ['enable dbt', 'activate dbt', 'how to enable', 'dbt activation', 'enable dbt account'],
        response: `🚀 **Follow these steps to enable DBT on your account:**

**Step 1: Gather Documents**
• Aadhaar card (original + photocopy)
• Bank passbook or account statement
• Valid ID proof

**Step 2: Visit Bank Branch**
• Go to your account's home branch
• Meet the bank manager or DBT officer
• Submit DBT enabling request

**Step 3: Fill Form**
• Complete the DBT consent form
• Provide mobile number for updates
• Sign all required documents

**Step 4: Verification**
• Bank will verify your documents
• Process typically takes 5-10 working days
• You'll receive SMS confirmation

**💡 It's completely FREE! Banks don't charge for this service.**`
      },
      
      benefits: {
        keywords: ['benefits', 'advantages', 'why dbt', 'student benefits'],
        response: `🌟 **Amazing benefits of DBT-enabled accounts:**

**For Students:**
• 🎓 Direct scholarship deposits
• 📚 Education loan subsidies
• 💻 Skill development funding
• 🍽️ Meal allowance transfers

**General Benefits:**
• ⚡ Faster benefit delivery
• 💰 No middleman commissions
• 🔒 Secure and transparent
• 📱 SMS notifications for transfers
• 🎯 Reduced paperwork

**Financial Advantages:**
• Zero transaction fees
• Instant credit to account
• Better fund tracking
• Reduced corruption

**Your future depends on timely benefits - DBT ensures you never miss out! 🚀**`
      },
      
      documents: {
        keywords: ['documents required', 'what documents', 'papers needed', 'requirements'],
        response: `📋 **Documents needed for DBT enabling:**

**Essential Documents:**
• ✅ Original Aadhaar card
• ✅ Photocopy of Aadhaar card
• ✅ Bank passbook (first page)
• ✅ Account statement (recent)

**Additional Requirements:**
• 📱 Active mobile number
• 🆔 Photo ID proof (if needed)
• ✍️ Signature specimen
• 🏠 Address proof (if address changed)

**For Students - Extra Documents:**
• 📜 Student ID card
• 🏫 College/school certificate
• 🎓 Enrollment proof

**💡 Pro Tip:** Make multiple photocopies beforehand to avoid delays!`
      },
      
      problems: {
        keywords: ['problem', 'issue', 'not working', 'trouble', 'error'],
        response: `🔧 **Common DBT issues and solutions:**

**Issue 1: Benefits Not Received**
• Check account DBT status
• Verify Aadhaar linking
• Contact bank immediately
• Update mobile number

**Issue 2: Wrong Account Credit**
• Report to bank within 24 hours
• File written complaint
• Contact scheme administrator
• Keep all receipts

**Issue 3: Account Not DBT-Enabled**
• Visit bank branch
• Submit enabling request
• Follow up after 7 days
• Get confirmation receipt

**Issue 4: Aadhaar Mismatch**
• Update Aadhaar details
• Re-submit bank documents
• Wait for verification

**Need help? Contact your bank's customer care or visit the branch! 🆘**`
      },
      
      timeline: {
        keywords: ['how long', 'time taken', 'duration', 'when will'],
        response: `⏰ **DBT Processing Timeline:**

**Account Enabling:**
• Bank processing: 5-10 working days
• System updates: 2-3 days
• SMS confirmation: Within 24 hours

**First Benefit Transfer:**
• After enabling: 1-2 cycles
• Scholarship timing: As per scheme
• Monthly benefits: Next month
• One-time payments: 15-30 days

**Document Processing:**
• Aadhaar verification: 1-2 days
• Bank KYC update: 3-5 days
• System integration: 2-7 days

**🚨 Important:** Start the process early! Don't wait until benefit disbursement dates.

**Tracking:** Use PFMS website to monitor your application status! 📊`
      },
      
      help: {
        keywords: ['help', 'support', 'contact', 'assistance'],
        response: `🆘 **Get help with DBT queries:**

**Bank Support:**
• Visit your bank branch
• Call customer care helpline
• Use mobile banking chat
• Email customer support

**Government Helplines:**
• PFMS Helpline: 1800-118-111
• Aadhaar Helpline: 1947
• Banking Ombudsman: File complaint
• District Collector Office

**Online Resources:**
• 🌐 pfms.nic.in - Official PFMS site
• 📱 DBT Bharat app
• 💻 Your bank's website
• 📧 Email support portals

**Student Specific:**
• College/school admin office
• Education department helpline
• Scholarship portal support
• Student welfare office

**Remember: I'm also here 24/7 to help you! 🤖**`
      }
    };
    
    this.quickResponses = [
      "I can help you with that! Let me provide you with detailed information.",
      "Great question! Here's what you need to know:",
      "That's an important topic! Let me explain:",
      "I'm glad you asked! Here are the details:",
      "Perfect timing for this question! Here's the answer:"
    ];
  }
  
  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }
  
  openChat() {
    this.isOpen = true;
    this.chatWindow.classList.remove('hidden');
    this.messageInput.focus();
    this.hideNotification();
  }
  
  closeChat() {
    this.isOpen = false;
    this.chatWindow.classList.add('hidden');
  }
  
  showNotification() {
    if (this.notification) {
      this.notification.style.display = 'flex';
    }
  }
  
  hideNotification() {
    if (this.notification) {
      this.notification.style.display = 'none';
    }
  }
  
  sendMessage() {
    const message = this.messageInput.value.trim();
    if (message && !this.isTyping) {
      this.sendUserMessage(message);
      this.messageInput.value = '';
    }
  }
  
  sendUserMessage(message) {
    // Add user message to chat
    this.addMessage(message, 'user');
    
    // Process and respond
    setTimeout(() => {
      this.processMessage(message);
    }, 500);
  }
  
  addMessage(content, sender = 'bot', isHtml = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'bot' ? '🤖' : '👤';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (isHtml) {
      contentDiv.innerHTML = content;
    } else {
      // Convert markdown-style formatting to HTML
      const formattedContent = this.formatMessage(content);
      contentDiv.innerHTML = formattedContent;
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
    
    // Store in history
    this.messageHistory.push({ content, sender, timestamp: Date.now() });
  }
  
  formatMessage(text) {
    // Convert markdown-style formatting to HTML
    let formatted = text
      // Bold text **text** -> <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Bullet points • -> <li>
      .replace(/^• (.*$)/gim, '<li>$1</li>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    
    // Wrap in paragraph tags if it contains line breaks
    if (formatted.includes('<br>') || formatted.includes('</p>')) {
      formatted = '<p>' + formatted + '</p>';
    }
    
    // Handle bullet point lists
    if (formatted.includes('<li>')) {
      formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }
    
    return formatted;
  }
  
  processMessage(message) {
    this.showTypingIndicator();
    
    // Simulate processing delay
    setTimeout(() => {
      this.hideTypingIndicator();
      
      const response = this.generateResponse(message);
      this.addMessage(response);
    }, 1000 + Math.random() * 1500); // 1-2.5 second delay
  }
  
  generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for greetings
    if (this.isGreeting(lowerMessage)) {
      return this.getRandomGreeting();
    }
    
    // Check knowledge base
    for (const [key, knowledge] of Object.entries(this.knowledgeBase)) {
      if (knowledge.keywords) {
        for (const keyword of knowledge.keywords) {
          if (lowerMessage.includes(keyword.toLowerCase())) {
            return knowledge.response;
          }
        }
      }
    }
    
    // Check for thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! 😊 I'm here whenever you need help with DBT or Aadhaar-related questions. Is there anything else you'd like to know?";
    }
    
    // Check for goodbye
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Goodbye! 👋 Remember, I'm always here to help you with your DBT and Aadhaar queries. Feel free to come back anytime you need assistance!";
    }
    
    // Default response for unrecognized queries
    return this.getDefaultResponse(lowerMessage);
  }
  
  isGreeting(message) {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste'];
    return greetings.some(greeting => message.includes(greeting));
  }
  
  getRandomGreeting() {
    return this.knowledgeBase.greetings[Math.floor(Math.random() * this.knowledgeBase.greetings.length)];
  }
  
  getDefaultResponse(message) {
    const suggestions = [
      "I'd be happy to help! Here are some topics I can assist with:\n\n• **DBT vs Aadhaar-linked accounts** - Understanding the difference\n• **Checking account status** - How to verify if your account is DBT-enabled\n• **Enabling DBT** - Step-by-step process\n• **Student benefits** - Scholarships and allowances\n• **Common issues** - Troubleshooting problems\n\nWhat would you like to know more about?",
      
      "I'm here to help with DBT and Aadhaar queries! You can ask me about:\n\n🏦 **Account Status** - Check if your account is ready for benefits\n💰 **Enable DBT** - How to activate your account for transfers\n📋 **Required Documents** - What you need for the process\n⚡ **Benefits** - What you can receive through DBT\n🆘 **Support** - Get help with issues\n\nFeel free to ask anything!"
    ];
    
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }
  
  showTypingIndicator() {
    this.isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-message';
    typingDiv.id = 'typing-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(contentDiv);
    
    this.messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();
  }
  
  hideTypingIndicator() {
    this.isTyping = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DBTSahayakChatbot();
});

// Add some helpful utility functions
window.DBTSahayakUtils = {
  // Function to get current time
  getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  },
  
  // Function to validate Aadhaar number format
  isValidAadhaarFormat(aadhaar) {
    const cleaned = aadhaar.replace(/\s/g, '');
    return /^\d{12}$/.test(cleaned);
  },
  
  // Function to mask Aadhaar number for display
  maskAadhaar(aadhaar) {
    const cleaned = aadhaar.replace(/\s/g, '');
    if (cleaned.length === 12) {
      return `XXXX XXXX ${cleaned.slice(-4)}`;
    }
    return aadhaar;
  },
  
  // Function to format phone number
  formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 5)}XXXXX`;
    }
    return phone;
  }
};