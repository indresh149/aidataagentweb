import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../types';
import MessageContent from './MessageContent';
import LoadingIndicator from './LoadingIndicator';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { role, content, isLoading, error } = message;
  
  // Determine the appropriate styling based on the message role
  const isUser = role === 'user';
  
  return (
    <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[90%] items-start`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center 
          ${isUser ? 'bg-blue-100 dark:bg-blue-900 ml-2' : 'bg-purple-100 dark:bg-purple-900 mr-2'}`}>
          {isUser ? (
            <User className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          ) : (
            <Bot className="h-5 w-5 text-purple-600 dark:text-purple-300" />
          )}
        </div>
        
        {/* Message bubble */}
        <div className={`
          rounded-lg py-2 px-3 shadow-sm
          ${isUser 
            ? 'bg-blue-500 text-white dark:bg-blue-600' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}
          ${error ? 'border-l-4 border-red-500' : ''}
        `}>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <MessageContent content={content} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;