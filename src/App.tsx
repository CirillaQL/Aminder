import { useState } from 'react';
import { Button, Modal, ButtonGroup } from '@douyinfe/semi-ui';
import { IconSetting, IconUser } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { AIConfigForm } from './components/AIConfigForm';
import { Typewriter } from './components/Typewriter';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div 
      className="min-h-screen mesh-bg text-gray-800 box-border flex flex-col relative overflow-hidden transition-colors duration-500"
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      {/* Navbar / Header Area */}
      <div 
        className="absolute top-0 right-0 flex gap-3 p-4 z-50"
        style={{ position: 'absolute', top: 0, right: 0 }}
      >
          <ButtonGroup theme='borderless' type='primary'>
            <Button onClick={() => changeLanguage('en')}>EN</Button>
            <Button onClick={() => changeLanguage('zh')}>中文</Button>
          </ButtonGroup>
          <Button theme='borderless' type='primary' icon={<IconUser />} onClick={() => console.log('Login clicked')}>Login</Button>
      </div>

      {/* Main Content Area - Centered Title */}
      <div className="flex flex-col items-center justify-center flex-1 w-full h-full z-10">
        <h1 className="aminder-title mt-[-5rem] font-dancing-script">
           Aminder
        </h1>
        <Typewriter 
          text="Your proactive AI companion that knows your schedule." 
          speed={50}
          delay={500}
          className="text-8xl md:text-4xl text-gray-700 font-thin mt-8 tracking-wide font-playfair-display"
        />
      </div>

      {/* Footer Controls (AI Config) */}
      <div 
        className="absolute bottom-0 right-0 p-4 z-50"
        style={{ position: 'absolute', bottom: 0, right: 0 }}
      >
           <Button 
            onClick={() => setVisible(true)} 
            icon={<IconSetting />}
            theme='borderless'
            type='primary'
            size='large'
          />
      </div>

      {/* Modal */}
      <Modal
          title={t('modal_title')}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          bodyStyle={{ overflow: 'auto' }}
          okText={t('ok')}
          cancelText={t('cancel')}
        >
          <AIConfigForm />
      </Modal>
    </div>
  )
}

export default App
