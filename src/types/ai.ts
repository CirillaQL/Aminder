// src/types/ai.ts

/**
 * 通用的 AI Provider 配置接口
 */
export interface AIProviderConfig {
  /** API 密钥 */
  apiKey: string;
  model: string[]; // 支持或可用的模型名称列表 (e.g., ['gemini-pro'], ['gpt-4', 'gpt-3.5-turbo'])
  /** 可选：基础 URL，用于覆盖默认 API 端点 */
  baseURL?: string;
  /** 可选：其他通用的配置属性 */
  [key: string]: any;
}

/**
 * Gemini Provider 配置
 */
export interface GeminiConfig extends AIProviderConfig {
  model: Array<'gemini-pro' | 'gemini-1.5-flash' | 'gemini-1.5-pro' | string>;
  // Gemini 特有配置，例如 projectId (如果需要的话)
  // projectId?: string;
}

/**
 * OpenAI Provider 配置
 */
export interface OpenAIConfig extends AIProviderConfig {
  model: Array<'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4o' | string>;
  // OpenAI 特有配置，例如 organizationId
  // organizationId?: string;
}

/**
 * Anthropic Provider 配置
 */
export interface AnthropicConfig extends AIProviderConfig {
  model: Array<'claude-3-opus-20240229' | 'claude-3-sonnet-20240229' | 'claude-3-haiku-20240229' | string>;
  // Anthropic 特有配置
}

/**
 * DeepSeek Provider 配置
 */
export interface DeepSeekConfig extends AIProviderConfig {
  model: Array<'deepseek-chat' | 'deepseek-coder' | string>;
  // DeepSeek 特有配置
}

/**
 * OpenRouter Provider 配置
 * OpenRouter 是一个聚合了多种模型的平台，其配置可能更灵活
 */
export interface OpenRouterConfig extends AIProviderConfig {
  // OpenRouter 的模型可以是任何它支持的模型
  model: string[];
  // OpenRouter 通常会通过 API Key 来识别用户和计费
}

export interface CustomAIProviderConfig extends AIProviderConfig {
  // 自定义模型名称
  model: string[];
  // 其他自定义配置
}

/**
 * 联合类型，表示所有支持的 AI Provider 配置
 */
export type SupportedAIProviderConfig =
  | GeminiConfig
  | OpenAIConfig
  | AnthropicConfig
  | DeepSeekConfig
  | OpenRouterConfig;

// 示例：定义请求的通用结构，这可以根据实际的 AI API 请求体进行调整
export interface AIChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export interface AIChatRequest {
  messages: AIChatMessage[];
  max_tokens?: number;
  temperature?: number;
  // 其他通用的请求参数
  [key: string]: any;
}

// 示例：定义响应的通用结构
export interface AIChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: AIChatMessage;
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  // 其他通用的响应参数
  [key: string]: any;
}
