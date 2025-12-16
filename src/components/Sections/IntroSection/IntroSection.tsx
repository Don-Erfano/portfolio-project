'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const IntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLImageElement>(null);
  const userImageRef = useRef<HTMLImageElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      linesRef.current.forEach((line) => {
        gsap.set(line, {
          x: gsap.utils.random(0, window.innerWidth),
          y: gsap.utils.random(0, window.innerHeight),
          rotation: gsap.utils.random(0, 360),
          width: gsap.utils.random(500, 700),
          height: 1,
          opacity: 0,
        });

        gsap.to(line, {
          opacity: 'random(0.2, 0.6)',
          duration: 'random(2, 4)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to(line, {
          x: `+=${gsap.utils.random(-200, 200)}`,
          y: `+=${gsap.utils.random(-200, 200)}`,
          rotation: `+=${gsap.utils.random(-90, 90)}`,
          duration: 'random(10, 20)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      tl.fromTo(
        nameRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' },
      );

      tl.fromTo(
        userImageRef.current,
        { y: 500, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
        '-=1',
      );

      tl.fromTo(
        descRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      );
      const xTo = gsap.quickTo(cursorRef.current, 'x', {
        duration: 0.6,
        ease: 'power3',
      });
      const yTo = gsap.quickTo(cursorRef.current, 'y', {
        duration: 0.6,
        ease: 'power3',
      });

      let isVisible = false;

      const onMove = (e: MouseEvent) => {
        if (!isVisible && cursorRef.current) {
          gsap.to(cursorRef.current, { opacity: 1, duration: 0.5 });
          isVisible = true;
        }
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener('mousemove', onMove);

      return () => {
        window.removeEventListener('mousemove', onMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array.from(Array(2))].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) linesRef.current[i] = el;
            }}
            className="absolute bg-red-600/50"
          />
        ))}
      </div>

      <div
        ref={cursorRef}
        className="absolute w-125 h-125 rounded-full pointer-events-none z-0 mix-blend-screen blur-[80px] opacity-0"
        style={{
          background:
            'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, rgba(220, 38, 38, 0) 70%)',
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center z-0">
        <img
          ref={nameRef}
          src="/assets/NameSvg.svg"
          alt="AM MARV HARD"
          className="w-[90%] md:w-[80%] max-w-6xl object-contain opacity-0"
        />
      </div>

      <div className="absolute bottom-0 z-10 flex h-full items-end justify-center">
        <Image
          ref={userImageRef}
          src="/assets/main Home image.webp"
          alt="Marv Portrait"
          width={800}
          height={1200}
          className="h-full w-auto object-contain opacity-0"
          priority
        />
      </div>

      <div
        ref={descRef}
        className="absolute left-8 bottom-24 md:left-20 md:bottom-32 z-20 max-w-sm opacity-0"
      >
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          Design Shapes Meaning{' '}
          <span className="w-2 h-2 bg-white rounded-full inline-block"></span>
        </h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          I’m a multidisciplinary designer specializing in graphic design,
          UI/UX, 3D art, and animation. With over{' '}
          <span className="text-orange-500 font-semibold">6 years</span> of
          experience, I craft visual solutions that blend creativity, clarity,
          and impact.
        </p>
      </div>
    </div>
  );
};

export default IntroSection;
