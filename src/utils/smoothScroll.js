import Lenis from 'lenis';

let lenisInstance = null;

/**
 * Initializes Lenis smooth scrolling with premium inertia and responsive behavior.
 * Respects user's prefers-reduced-motion accessibility preference.
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    autoRaf: true,
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple/Awwwards signature exponential ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    syncTouch: false, // Preserves native responsive touch momentum on touchscreens
    respectReducedMotion: true,
  });

  return lenisInstance;
}

/**
 * Returns current Lenis instance if initialized.
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * Smoothly scrolls to target element, selector, or position offset.
 * Falls back gracefully to native window.scrollTo when Lenis is inactive.
 */
export function scrollTo(target, options = {}) {
  const defaultOffset = -76; // Offset for sticky navbar
  const resolvedOffset = options.offset !== undefined ? options.offset : defaultOffset;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: resolvedOffset,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    });
    return;
  }

  // Native fallback
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + resolvedOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

/**
 * Safely cleans up Lenis instance.
 */
export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
