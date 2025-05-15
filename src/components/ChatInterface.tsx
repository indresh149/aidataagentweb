import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import axios from 'axios';

interface ChatInterfaceProps {
  messages: Message[];
  addMessage: (role: 'user' | 'assistant', content: string, isLoading?: boolean) => string;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages,
  addMessage,
  updateMessage,
  isProcessing,
  setIsProcessing
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    // Add user message
    addMessage('user', input);
    
    // Clear input
    setInput('');
    
    // Add loading message for assistant
    const assistantMsgId = addMessage('assistant', '', true);
    
    // Set processing state
    setIsProcessing(true);
    
    try {
      // Call API to get response
      const response = await axios.post('https://aidataagent.onrender.com/api/query', {
        query: input,
        // Send conversation history for context
        history: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      });
      
      // Update assistant message with response
      updateMessage(assistantMsgId, {
        content: response.data.answer,
        isLoading: false
      });
      
    } catch (error) {
      console.error('Error querying data:', error);
      
      // Update assistant message with error
      updateMessage(assistantMsgId, {
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        isLoading: false,
        error: 'Failed to process query'
      });
    } finally {
      // Reset processing state
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white dark:bg-gray-800 shadow-md p-4">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default ChatInterface;