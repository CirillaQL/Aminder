import { useState } from 'react';
import { Select, Input, Button, Toast } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { fetchSupportedModels } from '../services/aiService';

// 定义支持的 Provider
const PROVIDERS = [
  { value: 'gemini', label: 'Gemini', defaultBaseURL: 'https://generativelanguage.googleapis.com' },
  { value: 'openai', label: 'OpenAI', defaultBaseURL: 'https://api.openai.com/v1' },
  { value: 'anthropic', label: 'Anthropic', defaultBaseURL: 'https://api.anthropic.com' },
  { value: 'deepseek', label: 'DeepSeek', defaultBaseURL: 'https://api.deepseek.com' },
  { value: 'openrouter', label: 'OpenRouter', defaultBaseURL: 'https://openrouter.ai/api/v1' },
];

export const AIConfigForm = () => {
  const { t } = useTranslation();
  
  const [provider, setProvider] = useState<string | number | any[]>('');
  const [apiKey, setApiKey] = useState('');
  const [baseURL, setBaseURL] = useState('');
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | number | any[]>('');
  const [loading, setLoading] = useState(false);

  const handleProviderChange = (value: any) => {
    setProvider(value);
    const selected = PROVIDERS.find(p => p.value === value);
    if (selected) {
      setBaseURL(selected.defaultBaseURL);
    }
    // 清空模型选择，因为 Provider 变了
    setModels([]);
    setSelectedModel('');
  };

  const handleFetchModels = async () => {
    if (!baseURL || !apiKey) {
      Toast.warning(t('enter_api_key')); 
      return;
    }
    setLoading(true);
    try {
      const fetchedModels = await fetchSupportedModels({ 
        baseURL: baseURL as string, 
        apiKey,
        provider: provider as string
      });
      setModels(fetchedModels);
      if (fetchedModels.length > 0) {
        setSelectedModel(fetchedModels[0]);
      }
      Toast.success(t('models_fetched'));
    } catch (error) {
      console.error(error);
      Toast.error(t('fetch_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '10px 0' }}>
       <div style={{ marginBottom: 16 }}>
         <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>{t('provider')}</label>
         <Select 
           style={{ width: '100%' }} 
           placeholder={t('select_provider')}
           onChange={handleProviderChange}
           value={provider}
           optionList={PROVIDERS}
         />
       </div>

       <div style={{ marginBottom: 16 }}>
         <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>{t('api_key')}</label>
         <Input 
           mode="password" 
           placeholder={t('enter_api_key')} 
           value={apiKey} 
           onChange={setApiKey} 
         />
       </div>

       <div style={{ marginBottom: 16 }}>
         <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>{t('base_url')}</label>
         <Input 
           placeholder={t('enter_base_url')} 
           value={baseURL} 
           onChange={setBaseURL} 
         />
       </div>

       <div style={{ marginBottom: 16 }}>
         <Button 
           loading={loading} 
           onClick={handleFetchModels} 
           theme='light' 
           type='primary'
           block
           disabled={!apiKey}
         >
           {t('fetch_models')}
         </Button>
       </div>

       <div style={{ marginBottom: 16 }}>
         <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>{t('model')}</label>
         <Select 
           style={{ width: '100%' }} 
           placeholder={t('select_model')}
           value={selectedModel}
           onChange={(v: any) => setSelectedModel(v)}
           optionList={models.map(m => ({ value: m, label: m }))}
           disabled={models.length === 0}
         />
       </div>
    </div>
  );
};
