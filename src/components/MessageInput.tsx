import React, { useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';

interface MessageInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  handleSubmit,
  isProcessing
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the textarea on component mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Handle ctrl+enter to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !isProcessing) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="rounded-lg shadow-md bg-white dark:bg-gray-800 p-2 flex items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a business question..."
          className="flex-1 resize-none overflow-y-auto max-h-32 p-2 bg-transparent focus:outline-none dark:text-white"
          rows={1}
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={!input.trim() || isProcessing}
          className={`ml-2 p-2 rounded-full 
            ${!input.trim() || isProcessing
              ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
            } transition-colors duration-200`}
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
        Press Ctrl+Enter to send
      </p>
    </form>
  );
};

export default MessageInput;