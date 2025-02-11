import { theme } from '@/theme/theme';

describe('MUI Theme Configuration', () => {
  it('should have the correct primary color', () => {
    expect(theme.palette.primary.main).toBe('#1976d2');
  });

  it('should have the correct secondary color', () => {
    expect(theme.palette.secondary.main).toBe('#dc004e');
  });

  it('should have the correct typography font size', () => {
    expect(theme.typography.fontSize).toBe(14);
  });
});
