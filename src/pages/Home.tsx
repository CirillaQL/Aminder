import { useState, type WheelEvent } from 'react';
import { Modal } from '@douyinfe/semi-ui';
import { IconArrowDown } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AIConfigForm } from '../components/AIConfigForm';
import { Typewriter } from '../components/Typewriter';
import '../App.css';

const Home = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const goToNextPage = () => {
    // Check login status logic would go here.
    // Navigate to create character page.
    navigate('/createCharacter');
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (visible) return; // Prevent navigation if modal is open
    // Threshold to prevent accidental triggers
    if (e.deltaY > 30) {
      goToNextPage();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="min-h-screen mesh-bg text-gray-800 box-border flex flex-col relative overflow-hidden transition-colors duration-500"
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
      onWheel={handleWheel}
    >


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
          <div className="scroll-down-arrow" onClick={goToNextPage}>
            <IconArrowDown size="extra-large" />
          </div>
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
    </motion.div>
  )
}

export default Home;
