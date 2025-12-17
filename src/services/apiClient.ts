/**
 * 通用 API 请求类
 * 用于统一处理向后端发送的请求
 */

const BASE_URL = 'http://localhost:8000';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * 核心请求方法
   * @param endpoint API 端点 (例如 '/users')
   * @param options 请求配置
   */
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...init } = options;
    
    // 处理 URL 和查询参数
    let url = `${this.baseURL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    // 设置默认 Headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      // 这里可以预留 token 的位置，例如:
      // ...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}),
      ...init.headers,
    };

    try {
      const response = await fetch(url, {
        ...init,
        headers,
      });

      if (!response.ok) {
        // 尝试解析错误信息
        let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // 忽略解析错误，使用默认 statusText
        }
        throw new Error(errorMessage);
      }

      // 处理 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      // 解析 JSON
      return await response.json();
    } catch (error) {
      console.error(`API Request failed: ${url}`, error);
      throw error;
    }
  }

  /**
   * GET 请求
   * @param endpoint API 端点
   * @param params 查询参数
   * @param options 其他 fetch 配置
   */
  public get<T>(endpoint: string, params?: RequestOptions['params'], options?: Omit<RequestOptions, 'params' | 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET', params });
  }

  /**
   * POST 请求
   * @param endpoint API 端点
   * @param data 请求体数据
   * @param options 其他 fetch 配置
   */
  public post<T>(endpoint: string, data?: any, options?: Omit<RequestOptions, 'body' | 'method'>): Promise<T> {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined 
    });
  }

  /**
   * PUT 请求
   * @param endpoint API 端点
   * @param data 请求体数据
   * @param options 其他 fetch 配置
   */
  public put<T>(endpoint: string, data?: any, options?: Omit<RequestOptions, 'body' | 'method'>): Promise<T> {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined 
    });
  }

  /**
   * DELETE 请求
   * @param endpoint API 端点
   * @param params 查询参数
   * @param options 其他 fetch 配置
   */
  public delete<T>(endpoint: string, params?: RequestOptions['params'], options?: Omit<RequestOptions, 'params' | 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE', params });
  }
}

// 导出默认实例
export const apiClient = new ApiClient(BASE_URL);

// 导出类以便创建其他实例 (如果需要连接其他服务)
export { ApiClient };
