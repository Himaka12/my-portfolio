/**
 * Native, zero-overhead smooth scrolling utility
 * Uses native browser compositor scrolling without hijacking user input (mouse wheel, trackpad, keys).
 */

const NAVBAR_HEIGHT = 76;

/**
 * Smoothly scrolls to a target element or vertical scroll offset.
 * Fully native, runs on the browser's compositor thread with 0 CPU overhead.
 *
 * @param {string|Element|number} target - Selector, DOM element, or pixel number
 * @param {object} [options] - Optional custom offset or behavior
 */
export function scrollTo(target, options = {}) {
  const customOffset = options.offset !== undefined ? options.offset : -NAVBAR_HEIGHT;

  if (typeof target === 'number') {
    window.scrollTo({
      top: Math.max(0, target + customOffset),
      behavior: 'smooth',
    });
    return;
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  const targetTop = el.getBoundingClientRect().top + window.scrollY + customOffset;
  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth',
  });
}
