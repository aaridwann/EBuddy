import { getErrorCode } from './index';

describe('getErrorCode', () => {
  it('should correct extract value', () => {
    const error = {
      payload: { response: { data: { error: { code: 'ERROR_CODE_CORRECT' } } } },
    };

    expect(getErrorCode(error as any)).toBe('ERROR_CODE_CORRECT');
  });
});