import { useRef, useEffect, useState, useCallback } from 'react';
import './InteractivePortrait.css';

const MAX_TILT = 8.5; // Subtle, elegant max tilt angle in degrees
const LERP_FACTOR = 0.085; // Smooth exponential damping

const FLOATING_INFO = [
  {
    id: 'it',
    label: 'IT Undergraduate',
    positionClass: 'badge-top-left',
    staggerDelay: '0ms',
  },
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    positionClass: 'badge-top-right',
    staggerDelay: '60ms',
  },
  {
    id: 'swe',
    label: 'Software Engineering',
    positionClass: 'badge-bottom-left',
    staggerDelay: '120ms',
  },
  {
    id: 'exp',
    label: 'Building Intelligent Experiences',
    positionClass: 'badge-bottom-right',
    staggerDelay: '180ms',
  },
];

/**
 * InteractivePortrait
 * Premium, interactive 3D portrait experience:
 * - Fluid physics-based 3D tilt tracking cursor via requestAnimationFrame (0 React re-renders on move)
 * - True stereoscopic 3D parallax on floating personal information badges
 * - Specular radial light reflection (glare) following cursor angle
 * - Dynamic optical shadow casting opposite to cursor
 * - Mobile-friendly tap-to-reveal support & prefers-reduced-motion compliance
 */
function InteractivePortrait({ imageSrc, alt = 'Portrait in graduation attire' }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const circleRef = useRef(null);
  const imgRef = useRef(null);
  const glareRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  // Mutable animation state stored in ref to ensure 0 React re-renders during mouse movement
  const animState = useRef({
    targetRotX: 0,
    targetRotY: 0,
    currentRotX: 0,
    currentRotY: 0,
    targetGlareX: 50,
    targetGlareY: 50,
    currentGlareX: 50,
    currentGlareY: 50,
    targetScale: 1,
    currentScale: 1,
    isHovered: false,
    rafId: null,
    reducedMotion: false,
  });

  // Respect prefers-reduced-motion
  useEffect(() => {
    const state = animState.current;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    state.reducedMotion = mediaQuery.matches;

    const handleMotionChange = (e) => {
      state.reducedMotion = e.matches;
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Smooth RAF physics loop
  const startAnimation = useCallback(() => {
    const state = animState.current;
    if (state.rafId) return;

    const loop = () => {
      // Linear interpolation towards targets
      state.currentRotX += (state.targetRotX - state.currentRotX) * LERP_FACTOR;
      state.currentRotY += (state.targetRotY - state.currentRotY) * LERP_FACTOR;
      state.currentScale += (state.targetScale - state.currentScale) * LERP_FACTOR;
      state.currentGlareX += (state.targetGlareX - state.currentGlareX) * LERP_FACTOR;
      state.currentGlareY += (state.targetGlareY - state.currentGlareY) * LERP_FACTOR;

      // Apply 3D perspective tilt to the card wrapper
      if (cardRef.current && !state.reducedMotion) {
        cardRef.current.style.transform = `perspective(1100px) rotateX(${state.currentRotX.toFixed(2)}deg) rotateY(${state.currentRotY.toFixed(2)}deg) scale3d(${state.currentScale.toFixed(3)}, ${state.currentScale.toFixed(3)}, 1)`;
      }

      // Dynamic optical shadow casting opposite to tilt angle
      if (circleRef.current && !state.reducedMotion) {
        const shadowX = (-state.currentRotY * 1.8).toFixed(1);
        const shadowY = (state.currentRotX * 1.8 + 18).toFixed(1);
        circleRef.current.style.boxShadow = `${shadowX}px ${shadowY}px 48px rgba(0, 0, 0, 0.09), 0 4px 14px rgba(0, 0, 0, 0.04)`;
      }

      // Gentle multi-plane counter parallax for portrait photo inside the circle
      if (imgRef.current && !state.reducedMotion) {
        const imgShiftX = (-state.currentRotY * 0.65).toFixed(1);
        const imgShiftY = (state.currentRotX * 0.65).toFixed(1);
        imgRef.current.style.transform = `scale(1.03) translate3d(${imgShiftX}px, ${imgShiftY}px, 0)`;
      }

      // Specular radial glare reflection overlay
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${state.currentGlareX.toFixed(1)}% ${state.currentGlareY.toFixed(1)}%, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0) 68%)`;
        glareRef.current.style.opacity = state.isHovered ? '1' : '0';
      }

      // Check if animation has settled
      const deltaRot = Math.abs(state.targetRotX - state.currentRotX) + Math.abs(state.targetRotY - state.currentRotY);
      const deltaScale = Math.abs(state.targetScale - state.currentScale);

      if (state.isHovered || deltaRot > 0.01 || deltaScale > 0.001) {
        state.rafId = requestAnimationFrame(loop);
      } else {
        // Clean resting reset
        state.currentRotX = 0;
        state.currentRotY = 0;
        state.currentScale = 1;
        if (cardRef.current) cardRef.current.style.transform = '';
        if (circleRef.current) circleRef.current.style.boxShadow = '';
        if (imgRef.current) imgRef.current.style.transform = '';
        state.rafId = null;
      }
    };

    state.rafId = requestAnimationFrame(loop);
  }, []);

  const handleMouseEnter = () => {
    animState.current.isHovered = true;
    animState.current.targetScale = 1.015;
    setIsActive(true);
    startAnimation();
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || animState.current.reducedMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized coordinates (-1 to 1) from container center
    const nx = Math.max(-1.15, Math.min(1.15, (x - rect.width / 2) / (rect.width / 2)));
    const ny = Math.max(-1.15, Math.min(1.15, (y - rect.height / 2) / (rect.height / 2)));

    animState.current.targetRotX = -ny * MAX_TILT;
    animState.current.targetRotY = nx * MAX_TILT;
    animState.current.targetGlareX = (nx * 0.5 + 0.5) * 100;
    animState.current.targetGlareY = (ny * 0.5 + 0.5) * 100;

    startAnimation();
  };

  const handleMouseLeave = () => {
    animState.current.isHovered = false;
    animState.current.targetRotX = 0;
    animState.current.targetRotY = 0;
    animState.current.targetScale = 1;
    animState.current.targetGlareX = 50;
    animState.current.targetGlareY = 50;
    setIsActive(false);
    startAnimation();
  };

  // Support tap toggle on mobile/touch devices
  const handleTouchToggle = () => {
    setIsActive((prev) => !prev);
  };

  // Close badges when tapping outside on touch devices
  useEffect(() => {
    const handleDocumentTouch = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('touchstart', handleDocumentTouch, { passive: true });
    return () => {
      document.removeEventListener('touchstart', handleDocumentTouch);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const state = animState.current;
    return () => {
      if (state.rafId) {
        cancelAnimationFrame(state.rafId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="portrait-interactive-container"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchToggle}
      role="region"
      aria-label="Interactive 3D Profile Portrait"
    >
      {/* 3D Tilt Wrapper */}
      <div
        ref={cardRef}
        className={`portrait-3d-wrapper ${isActive ? 'is-active' : ''}`}
      >
        {/* Floating Personal Information Badges */}
        {FLOATING_INFO.map((item) => (
          <div
            key={item.id}
            className={`portrait-floating-badge ${item.positionClass}`}
            style={{
              '--badge-delay': item.staggerDelay,
            }}
            aria-hidden={!isActive}
          >
            <span className="portrait-badge-dot" aria-hidden="true" />
            <span className="portrait-badge-text">{item.label}</span>
          </div>
        ))}

        {/* Dedicated Circular Portrait Area (Clipped 1:1 Circle) */}
        <div ref={circleRef} className="portrait-display-area">
          <img
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            className="portrait-real-img"
            width="450"
            height="450"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />

          {/* Interactive Specular Glare Reflection */}
          <div
            ref={glareRef}
            className="portrait-glare-overlay"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

export default InteractivePortrait;
