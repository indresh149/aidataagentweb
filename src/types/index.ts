export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isLoading?: boolean;
  error?: string;
}

export interface QueryResult {
  data: any[];
  columns: string[];
  query: string;
  executionTime: number;
}

export interface VisualizedResult {
  type: 'table' | 'chart';
  data: any;
  title: string;
  description?: string;
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'doughnut';
  data: any;
  options: any;
}

export interface TableData {
  columns: string[];
  rows: any[];
}

export interface AgentResponse {
  answer: string;
  visualizations: VisualizedResult[];
  query?: string;
  rawData?: any;
}