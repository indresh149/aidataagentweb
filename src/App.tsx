import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { Message } from './types';
import { v4 as uuidv4 } from './utils/uuid';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add welcome message if no saved messages
      const welcomeMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: `# Welcome to the AI Data Agent 📊

I'm designed to answer complex business questions from our database. Here are some examples of what you can ask:

- What's the revenue trend for the last 6 months broken down by product category?
- Who are our top 10 customers by total purchase value?
- Compare sales performance across different regions
- Which products have the highest profit margin but lowest sales volume?

Feel free to ask complex analytical questions, and I'll provide insights with visualizations.`,
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const addMessage = (role: 'user' | 'assistant', content: string, isLoading: boolean = false) => {
    const newMessage: Message = {
      id: uuidv4(),
      role,
      content,
      timestamp: Date.now(),
      isLoading
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage.id;
  };

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === id ? { ...message, ...updates } : message
      )
    );
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <ChatInterface 
            messages={messages}
            addMessage={addMessage}
            updateMessage={updateMessage}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        </main>
        <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          AI Data Agent © {new Date().getFullYear()} | SQL Analytics Interface
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;