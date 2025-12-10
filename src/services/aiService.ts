// src/services/aiService.ts

/**
 * 定义获取模型列表的接口参数
 */
export interface GetModelListParams {
  baseURL: string;
  apiKey: string;
  provider: string; // 新增：用于区分不同的 API 处理逻辑
}

/**
 * 从指定的 baseURL 获取支持的模型列表。
 *
 * @param params GetModelListParams 包含 baseURL, apiKey, provider
 * @returns Promise<string[]> 模型的 ID 字符串数组
 */
export async function fetchSupportedModels(params: GetModelListParams): Promise<string[]> {
  const { baseURL, apiKey, provider } = params;
  
  // 移除末尾的斜杠，避免拼接错误
  const cleanBaseURL = baseURL.replace(/\/+$/, '');

  try {
    let url = '';
    let headers: Record<string, string> = {};
    let processResponse: (data: any) => string[] = () => [];

    switch (provider) {
      case 'gemini':
        // Gemini API: https://ai.google.dev/api/rest/v1beta/models/list
        // 默认 baseURL: https://generativelanguage.googleapis.com
        url = `${cleanBaseURL}/v1beta/models?key=${apiKey}`;
        // Gemini 不需要 Authorization header，key 在 URL 中
        processResponse = (data) => {
          if (data.models && Array.isArray(data.models)) {
            return data.models.map((m: any) => m.name.replace('models/', ''));
          }
          return [];
        };
        break;

      case 'anthropic':
        // Anthropic 目前官方 API 不支持列出模型列表。
        // 返回常用模型列表作为 fallback，或者如果用户使用的是代理/OpenRouter 也可以尝试通用逻辑
        console.warn('Anthropic API does not strictly support listing models via endpoint. Returning defaults.');
        return [
          'claude-3-opus-20240229',
          'claude-3-sonnet-20240229',
          'claude-3-haiku-20240229',
          'claude-2.1',
          'claude-2.0'
        ];

      case 'openai':
      case 'deepseek':
      case 'openrouter':
      default:
        // OpenAI 兼容格式 (包括 DeepSeek, OpenRouter 等)
        // GET /models
        url = `${cleanBaseURL}/models`;
        headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        };
        
        // OpenRouter 特殊处理：可能需要额外的 header
        if (provider === 'openrouter') {
          headers['HTTP-Referer'] = window.location.origin; // Optional
          headers['X-Title'] = 'Aminder'; // Optional
        }

        processResponse = (data) => {
          if (data.data && Array.isArray(data.data)) {
            return data.data.map((m: any) => m.id);
          }
          return [];
        };
        break;
    }

    console.log(`Fetching models for ${provider} from ${url}...`);

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch models: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const models = processResponse(data);
    
    // 简单的去重和排序
    return Array.from(new Set(models)).sort();

  } catch (error) {
    console.error(`Error fetching models from ${baseURL}:`, error);
    throw error;
  }
}

