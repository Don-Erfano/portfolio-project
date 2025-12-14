'use client';

import { FC, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { navItems } from './interface';

const SideNav: FC = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const navRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const INITIAL_HEIGHT = 300;
  const HOVER_HEIGHT = 500;
  const CONTAINER_WIDTH = 100;
  const START_X = 100;
  const END_X = 100;
  const APEX_X = 20;
  const CONTROL_X = -60;
  const state = useRef({ height: INITIAL_HEIGHT });

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };
  const getCurveX = (t: number) => {
    const p0 = START_X;
    const p1 = CONTROL_X;
    const p2 = END_X;
    return Math.pow(1 - t, 2) * p0 + 2 * (1 - t) * t * p1 + Math.pow(t, 2) * p2;
  };

  const updateVisuals = () => {
    if (!navRef.current) return;
    const h = state.current.height;
    navRef.current.style.height = `${h}px`;

    if (pathRef.current) {
      pathRef.current.setAttribute(
        'd',
        `M ${START_X} 0 Q ${CONTROL_X} ${h / 2} ${END_X} ${h}`,
      );
    }
    const padding = 0.2;
    const step = (1 - padding * 2) / (navItems.length - 1);
    navItems.forEach((_, index) => {
      const dot = document.getElementById(`nav-dot-${index}`);
      if (dot) {
        const t = padding + index * step;
        const x = getCurveX(t);
        const y = t * h;
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visibleSectionId = entry.target.id;
            const found = navItems.find(
              (item) => item.sectionId === visibleSectionId,
            );
            if (found) setActiveId(found.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const onEnter = () => {
    gsap.to(state.current, {
      height: HOVER_HEIGHT,
      duration: 0.5,
      ease: 'back.out(1.2)',
      onUpdate: updateVisuals,
    });

    gsap.to('.nav-label', {
      opacity: 1,
      x: 0,
      duration: 0.3,
      stagger: 0.05,
      delay: 0.1,
    });
  };

  const onLeave = () => {
    gsap.to(state.current, {
      height: INITIAL_HEIGHT,
      duration: 0.4,
      ease: 'power3.out',
      onUpdate: updateVisuals,
    });

    gsap.to('.nav-label', {
      opacity: 0,
      x: 20,
      duration: 0.2,
    });
  };

  useEffect(() => {
    updateVisuals();
  }, []);

  return (
    <aside
      ref={navRef}
      className="fixed right-0 top-1/2 z-50 flex items-center justify-end -translate-y-1/2"
      style={{ width: `${CONTAINER_WIDTH}px` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {navItems.map((item, index) => (
          <div
            key={item.id}
            id={`nav-dot-${index}`}
            className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${START_X}px`, top: '50%' }}
            onClick={() => {
              setActiveId(item.id);
              handleScroll(item.sectionId);
            }}
          >
            <span className="nav-label absolute right-full mr-6 text-sm font-bold text-white whitespace-nowrap opacity-0 translate-x-4">
              {item.label}
            </span>
            <div
              className="rounded-full bg-white transition-all duration-300"
              style={{
                width: activeId === item.id ? '14px' : '6px',
                height: activeId === item.id ? '14px' : '6px',
                opacity: activeId === item.id ? 1 : 0.6,
                boxShadow:
                  activeId === item.id
                    ? '0 0 10px rgba(255,255,255,0.8)'
                    : 'none',
              }}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideNav;
