
export type MessageSource = 'system' | 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageSource;
  content: string;
  timestamp: Date;
}

export type Conversation = {
  messages: Message[];
};


export type AnalysisScore = {
  name: string;
  description: string;
  score: number;
  human_name: string;
  feedback: string;
};

export type ConversationAnalysis = {
  business_acumen?: AnalysisScore;
  user_centricity?: AnalysisScore;
  product_vision?: AnalysisScore;
  clarifying_questions?: AnalysisScore;
  ability_to_discuss_tradeoffs_and_possible_errors?: AnalysisScore;
  passion_and_creativity?: AnalysisScore;
  communication?: AnalysisScore;
  collaboration?: AnalysisScore;
};

export type ConversationOverallAnalysis = {
  conversation: Conversation;
  analysis?: ConversationAnalysis;
  overall_score?: number;
  overall_feedback?: string;
};
