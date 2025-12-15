'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const IntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLImageElement>(null);
  const userImageRef = useRef<HTMLImageElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

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
        '-=0.5',
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white"
    >
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
          src="/assets/Group 232331.png"
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
