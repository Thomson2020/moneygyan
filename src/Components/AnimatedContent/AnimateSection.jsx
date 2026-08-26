import AnimatedContent from "./AnimatedContent";

export default function AnimateSection({ children }) {
  return (
    <AnimatedContent
      distance={70}
      direction="vertical"
      duration={0.8}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      threshold={0.15}
    >
      {children}
    </AnimatedContent>
  );
}