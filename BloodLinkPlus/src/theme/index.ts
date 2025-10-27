export { Colors } from './colors';
export { Typography } from './typography';
export { Spacing, BorderRadius, Shadows } from './spacing';

export const Theme = {
  colors: require('./colors').Colors,
  typography: require('./typography').Typography,
  spacing: require('./spacing').Spacing,
  borderRadius: require('./spacing').BorderRadius,
  shadows: require('./spacing').Shadows,
};
