'use client';

import { FC, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  '/assets/vayu/vayu UI compressed screenshots/vayu 1.webp',
  '/assets/vayu/vayu UI compressed screenshots/vayu 2.webp',
  '/assets/vayu/vayu UI compressed screenshots/vayu 3.webp',
  '/assets/vayu/vayu UI compressed screenshots/vayu 4.webp',
  '/assets/vayu/vayu UI compressed screenshots/vayu 5.webp',
];

const Design: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        headerRef.current,
        {
          top: '60%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          scale: 0.8,
          opacity: 0,
        },
        {
          top: '15%',
          left: '10%',
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
      );

      const spreadConfig = [
        { xPercent: -130, rotate: 0, scale: 1, zIndex: 1 },
        { xPercent: -65, rotate: 0, scale: 1, zIndex: 2 },
        { xPercent: 0, rotate: 0, scale: 1, zIndex: 3 },
        { xPercent: 65, rotate: 0, scale: 1, zIndex: 2 },
        { xPercent: 130, rotate: 0, scale: 1, zIndex: 1 },
      ];

      cardsRef.current.forEach((card, index) => {
        tl.fromTo(
          card,
          {
            x: -window.innerWidth * 0.8,
            y: -window.innerHeight * 0.8,
            rotation: -30,
            opacity: 0,
            scale: 0.6,
          },
          {
            x: 0,
            y: 0,
            xPercent: spreadConfig[index].xPercent,
            rotation: spreadConfig[index].rotate,
            scale: spreadConfig[index].scale,
            zIndex: spreadConfig[index].zIndex,
            opacity: 1,
            duration: 2,
            ease: 'power4.out',
            stagger: 0.1,
          },
          '<',
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    const wideSpreadConfig = [
      { xPercent: -240 },
      { xPercent: -120 },
      { xPercent: 0 },
      { xPercent: 120 },
      { xPercent: 240 },
    ];

    cardsRef.current.forEach((card, index) => {
      gsap.to(card, {
        xPercent: wideSpreadConfig[index].xPercent,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  };

  const handleMouseLeave = () => {
    const overlapConfig = [
      { xPercent: -130 },
      { xPercent: -65 },
      { xPercent: 0 },
      { xPercent: 65 },
      { xPercent: 130 },
    ];

    cardsRef.current.forEach((card, index) => {
      gsap.to(card, {
        xPercent: overlapConfig[index].xPercent,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center text-white"
    >
      <div
        ref={headerRef}
        className="absolute z-20 flex flex-col items-center left-10 gap-2"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-4">
          <Image
            width={40}
            height={40}
            src="/assets/Group 2.svg"
            alt="Logo"
            className=" text-gray-400"
          />
          <h1 className="text-3xl font-bold tracking-tight">Vayu Plan</h1>
        </div>
        <p className="text-gray-400 text-base text-center italic">
          Tripping plan Application
        </p>
      </div>

      <div
        className="relative w-40 md:w-52 aspect-9/19 flex items-center justify-center perspective-[1000px] cursor-pointer z-30"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((src, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 bg-black"
            style={{
              zIndex: 10 - Math.abs(2 - index),
              transform: 'scale(1)',
            }}
          >
            <Image
              src={src}
              alt={`Vayu UI Screen ${index + 1}`}
              fill
              className="object-cover"
              priority={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Design;
