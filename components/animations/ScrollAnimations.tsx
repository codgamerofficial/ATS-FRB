'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX } as any}
    />
  );
}

export function ParallaxContainer({ children, speed = 0.5 }: { children: React.ReactNode; speed?: number }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  return (
    <motion.div style={{ y } as any}>
      {children}
    </motion.div>
  );
}

export function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollSlide({ children, direction = 'left', delay = 0 }: { 
  children: React.ReactNode; 
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}) {
  const variants = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    up: { y: -100, opacity: 0 },
    down: { y: 100, opacity: 0 }
  };

  return (
    <motion.div
      initial={variants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollScale({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -10 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay,
        ease: "backOut"
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStagger({ children, staggerDelay = 0.1 }: { 
  children: React.ReactNode; 
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border border-purple-500/10 rounded-lg"
          style={{
            width: 50 + Math.random() * 100,
            height: 50 + Math.random() * 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Glowing Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xl"
          style={{
            width: 100 + Math.random() * 200,
            height: 100 + Math.random() * 200,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1],
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

export function ScrollMouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed w-6 h-6 bg-cyan-400/30 rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
      } as any}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    />
  );
}

export function ScrollWaveEffect() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -300]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"
        style={{ y: y1 } as any}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tl from-purple-500/3 to-pink-500/3"
        style={{ y: y2 } as any}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-pink-500/2 to-cyan-500/2"
        style={{ y: y3 } as any}
      />
    </div>
  );
}