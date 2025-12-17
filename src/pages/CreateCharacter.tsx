import { useState } from 'react';
import { Typography, Input, TextArea, Button, Radio, RadioGroup } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import '../App.css';

const CreateCharacter = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('female');
  const [description, setDescription] = useState('');

  return (
    <div className="create-character-bg flex items-center justify-center min-h-screen py-10">
      
      {/* 主容器: 
         - flex-col: 纵向排列
         - gap-5: 元素之间的间距
         - 移除了 items-center，子元素默认填满宽度 (stretch)
      */}
      <div className="
        character-container 
        flex flex-col 
        gap-5 
        w-[90vw] md:w-[60vw] max-w-[800px] h-auto
        border border-gray-200 bg-white shadow-lg rounded-lg
      ">
        
        {/* --- [1. 标题 Block] ---
             修改点：
             1. mt-16: 顶部外边距，替代了之前的顶部空 div
             2. h-32: 保持了你想要的大高度
        */}
        <div className="w-full h-32 mt-16 flex items-center justify-center text-center">
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

        {/* --- [2. 角色名称 Block] --- */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-[80%] max-w-md flex flex-col items-center gap-2">
            <span className="text-xs text-[#8c7b70] font-serif tracking-widest">
              {t('char_name') || '角色名称'}
            </span>
            <Input 
              placeholder={t('char_name_placeholder') || '请输入角色名称'} 
              value={name} 
              onChange={setName}
              className="paper-input w-full text-center" 
            />
          </div>
        </div>

        {/* --- [3. 角色性别 Block] --- */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="w-[80%] max-w-md flex flex-col items-center gap-2">
            <span className="text-xs text-[#8c7b70] font-serif tracking-widest">
              {t('char_gender') || '角色性别'}
            </span>
            <RadioGroup 
              type="button" 
              buttonSize="large"
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
              className="paper-radio-group"
            >
              <Radio value="male">{t('gender_male') || '男'}</Radio>
              <Radio value="female">{t('gender_female') || '女'}</Radio>
              <Radio value="other">{t('gender_other') || '其他'}</Radio>
            </RadioGroup>
          </div>
        </div>

        {/* --- [4. 角色描述 Block] ---
             1. py-4: 增加这个区域的上下留白
             2. rows={6}: 增加输入框本身高度
        */}
        <div className="w-full flex flex-col items-center gap-2 py-4">
          <div className="w-[80%] max-w-md flex flex-col items-center gap-2">
            <span className="text-xs text-[#8c7b70] font-serif tracking-widest">
              {t('char_desc') || '角色描述'}
            </span>
            <TextArea 
              placeholder={t('char_desc_placeholder') || '请输入角色描述...'} 
              value={description} 
              onChange={setDescription}
              rows={6} 
              className="paper-input w-full"
            />
          </div>
        </div>

        {/* --- [5. 按钮 Block] ---
             修改点：
             1. mb-16: 底部外边距，替代了之前的底部空 div
        */}
        <div className="w-full flex flex-col items-center mt-2 mb-16">
           <div className="w-[80%] max-w-md">
            <Button 
              block 
              theme="solid" 
              size="large"
              className="paper-button w-full"
            >
              {t('next_step') || '下一步'}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateCharacter;