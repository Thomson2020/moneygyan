import { InView } from '@/components/core/in-view';

// Removed the 'interface' block completely
export function FadeInUp({ children, delay = 0 }) {
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      }}
      viewOptions={{ 
        once: true, 
        margin: '0px 0px -100px 0px' 
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.215, 0.610, 0.355, 1], 
        delay: delay 
      }}
    >
      {children}
    </InView>
  );
}