import React from 'react';
import ReactMarkdown from 'react-markdown';
import DataVisualization from './DataVisualization';

interface MessageContentProps {
  content: string;
}

const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
  // Regular expression to find visualization markers in the markdown
  // Format: ```visualization:type:title\nJSON_DATA\n```
  const visualizationRegex = /```visualization:(chart|table):(.*?)\n([\s\S]*?)\n```/g;
  
  // Replace visualization markers with placeholders and collect visualization data
  const visualizations: Array<{
    type: 'chart' | 'table';
    title: string;
    data: any;
    placeholder: string;
  }> = [];
  
  let placeholderIndex = 0;
  const contentWithPlaceholders = content.replace(visualizationRegex, (match, type, title, dataString) => {
    const placeholder = `__VISUALIZATION_${placeholderIndex}__`;
    try {
      const data = JSON.parse(dataString);
      visualizations.push({
        type: type as 'chart' | 'table',
        title,
        data,
        placeholder
      });
      placeholderIndex++;
      return placeholder;
    } catch (error) {
      console.error('Failed to parse visualization data:', error);
      return match; // Keep original if parsing fails
    }
  });
  
  // Split content by placeholders to intersperse with visualizations
  const contentParts = contentWithPlaceholders.split(/(__VISUALIZATION_\d+__)/);
  
  return (
    <div className="prose dark:prose-invert max-w-none">
      {contentParts.map((part, index) => {
        if (part.startsWith('__VISUALIZATION_')) {
          const vizIndex = parseInt(part.match(/__VISUALIZATION_(\d+)__/)?.[1] || '0', 10);
          const viz = visualizations[vizIndex];
          if (viz) {
            return (
              <div key={index} className="my-4">
                <DataVisualization
                  type={viz.type}
                  title={viz.title}
                  data={viz.data}
                />
              </div>
            );
          }
          return null;
        }
        return <ReactMarkdown key={index}>{part}</ReactMarkdown>;
      })}
    </div>
  );
};

export default MessageContent;