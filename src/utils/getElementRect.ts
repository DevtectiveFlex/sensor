export function getElementRect(element: HTMLElement | null): DOMRect | null {
  if (!element || typeof window === 'undefined') return null;

  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    x: rect.x,
    y: rect.y,
    toJSON: rect.toJSON.bind(rect),
  }
}