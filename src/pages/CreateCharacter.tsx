import { useState } from 'react';
import { Typography, Input, TextArea, Button, Radio, RadioGroup, Toast, Tag, Space } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { ParentSize } from '@visx/responsive';
import '../App.css';
import { generatePersona } from '../services/personaService';
import type { PersonaResponse } from '../types/persona';
import RadarChart from '../components/RadarChart';

const CreateCharacter = () => {
  const { t } = useTranslation();
  const [toast, toastContextHolder] = Toast.useToast() as [any, any];
  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [ifOriginal, setIfOriginal] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [personaResult, setPersonaResult] = useState<PersonaResponse | null>(null);

  const bigFiveData = personaResult ? [
    { label: t('openness'), value: personaResult.personality.openness },
    { label: t('conscientiousness'), value: personaResult.personality.conscientiousness },
    { label: t('extraversion'), value: personaResult.personality.extraversion },
    { label: t('agreeableness'), value: personaResult.personality.agreeableness },
    { label: t('neuroticism'), value: personaResult.personality.neuroticism },
  ] : [];

  const handleNext = async () => {
    if (!name || !description) {
      toast.warning(t('please_fill_all_fields') || '请填写完整信息');
      return;
    }

    setLoading(true);
    try {
      const response = await generatePersona({
        name,
        gender,
        if_original: ifOriginal,
        description
      });
      console.log('Persona created:', response);
      setPersonaResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 最外层：确保卡片在屏幕正中间
    <div className="create-character-bg flex items-center justify-center min-h-screen py-10 px-4">
      {toastContextHolder}
      
      {/* 卡片容器：
          1. 增加 relative 以便定位
          2. 使用 py-12 px-6 等统一内边距，去掉子元素硬编码的 margin
          3. min-h-[600px] 确保卡片有一个基础高度，这样垂直居中才有效果
      */}
      <div className="
        character-container 
        flex flex-col 
        items-center justify-center
        w-[95vw] md:w-[70vw] lg:w-[60vw] max-w-[800px]
        min-h-[600px] h-auto
        border border-gray-200 bg-white shadow-lg rounded-xl
        p-8 md:p-14
        relative
      ">
        {!personaResult ? (
          /* --- 输入模式：包裹所有内容以实现整体居中 --- */
          <div className="w-full flex flex-col items-center justify-center gap-8 flex-1">
            
            {/* --- [1. 标题 Block] --- */}
            {/* 移除 h-32 mt-16，改用简单的文本居中 */}
            <div className="text-center">
              <Typography.Title 
                heading={2} 
                style={{ 
                  margin: 0, 
                  fontFamily: '"Songti SC", "Noto Serif SC", serif', 
                  color: '#4a3b32',
                  fontWeight: 600,
                  fontSize: '2rem'
                }}
              >
                {t('create_char_title') || '创建你的助手角色'}
              </Typography.Title>
            </div>

            {/* --- 表单区域组：统一宽度的容器 --- */}
            <div className="w-full max-w-md flex flex-col gap-6">
              
              {/* --- [2. 角色名称] --- */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-[#8c7b70] font-serif tracking-widest">
                  {t('char_name')}
                </span>
                <Input 
                  placeholder={t('char_name_placeholder')} 
                  value={name} 
                  onChange={setName}
                  className="paper-input w-full text-center" 
                />
              </div>

              {/* --- [3. 角色性别] --- */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-[#8c7b70] font-serif tracking-widest">
                  {t('char_gender')}
                </span>
                <RadioGroup 
                  type="button" 
                  buttonSize="large"
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)}
                  className="paper-radio-group flex justify-center w-full"
                >
                  <Radio value="male">{t('gender_male')}</Radio>
                  <Radio value="female">{t('gender_female')}</Radio>
                  <Radio value="other">{t('gender_other')}</Radio>
                </RadioGroup>
              </div>

              {/* --- [4. 是否原创] --- */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-[#8c7b70] font-serif tracking-widest">
                  {t('is_original')}
                </span>
                <RadioGroup 
                  type="button" 
                  buttonSize="large"
                  value={ifOriginal} 
                  onChange={(e) => setIfOriginal(e.target.value)}
                  className="paper-radio-group flex justify-center w-full"
                >
                  <Radio value={true}>{t('original_yes')}</Radio>
                  <Radio value={false}>{t('original_no')}</Radio>
                </RadioGroup>
              </div>

              {/* --- [5. 角色描述] --- */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-[#8c7b70] font-serif tracking-widest">
                  {t('char_desc')}
                </span>
                <TextArea 
                  placeholder={t('char_desc_placeholder')} 
                  value={description} 
                  onChange={setDescription}
                  rows={5} 
                  className="paper-input w-full resize-none"
                />
              </div>

              {/* --- [6. 按钮] --- */}
              <div className="pt-2">
                <Button 
                  block 
                  theme="solid" 
                  size="large"
                  className="paper-button w-full h-12 text-lg"
                  onClick={handleNext}
                  loading={loading}
                >
                  {t('next_step')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* --- 结果模式：同样垂直水平居中 --- */
          <div className="w-full flex flex-col items-center justify-center gap-8 flex-1 animate-fadeIn">
            
            {/* 头部信息 */}
            <div className="flex flex-col items-center gap-2 text-center">
              <Typography.Title heading={2} style={{ color: '#4a3b32', fontFamily: '"Songti SC", serif', margin: 0 }}>
                {personaResult.name}
              </Typography.Title>
              <Typography.Text type="secondary" className="tracking-wide">
                {personaResult.gender === 'female' ? t('gender_female') : personaResult.gender === 'male' ? t('gender_male') : t('gender_other')}
              </Typography.Text>
            </div>

            {/* 雷达图 */}
            <div className="flex flex-col items-center gap-4 w-full">
              <Typography.Title heading={5} style={{ borderBottom: '1px solid #eee', paddingBottom: '4px', color: '#8c7b70' }}>
                {t('big_five')}
              </Typography.Title>
              <div className="w-full h-[280px] max-w-[400px] flex items-center justify-center">
                <ParentSize>
                  {({ width, height }) => (
                    <RadarChart 
                      width={width} 
                      height={height} 
                      data={bigFiveData} 
                    />
                  )}
                </ParentSize>
              </div>
            </div>

            {/* 性格标签 */}
            <div className="flex flex-col items-center gap-4 w-full max-w-lg">
              <Typography.Title heading={5} style={{ borderBottom: '1px solid #eee', paddingBottom: '4px', color: '#8c7b70' }}>
                {t('generated_traits')}
              </Typography.Title>
              <div className="flex flex-wrap justify-center gap-2">
                {personaResult.personality.traits.map((trait, index) => (
                  <Tag 
                    key={index} 
                    size="large" 
                    style={{ 
                      backgroundColor: '#f5f2f0', 
                      color: '#4a3b32', 
                      border: '1px solid #d9d0c7',
                      padding: '4px 12px',
                      fontSize: '14px'
                    }}
                  >
                    {trait}
                  </Tag>
                ))}
              </div>
            </div>

            {/* 返回按钮 */}
            <div className="mt-2">
              <Button 
                theme="borderless" 
                onClick={() => setPersonaResult(null)}
                style={{ color: '#8c7b70' }}
              >
                {t('back_to_edit')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCharacter;