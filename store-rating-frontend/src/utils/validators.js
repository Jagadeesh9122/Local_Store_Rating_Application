export const nameRules = { min: 20, max: 60 };
export const addressMax = 400;
export const passwordRegex = /^(?=.{8,16}$)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/;

export function formatAvg(n) {
  if (!n && n !== 0) return '—';
  return (Math.round((n + Number.EPSILON) * 10) / 10).toFixed(1);
}
