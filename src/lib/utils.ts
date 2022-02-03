
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export const parseDimension = (client?: DOMRect) => {
    const h = client?.height || 0;
    const w = client?.width || 0;
  
    const y = client?.y || 0;
    const x = client?.x || 0;
  
    return {
      x: x + w / 2,
      y: y + h / 2,
      h,
      w,
    };
  };