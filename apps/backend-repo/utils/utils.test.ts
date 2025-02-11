import { generateResponse } from '.';

describe('generateResponse', () => {
  it('should return success response when success is true', () => {
    const data = { id: 1, name: 'Test' };
    const result = generateResponse(true, data);

    expect(result).toEqual({
      success: true,
      data,
    });
  });

  it('should return error response with given code and message when success is false', () => {
    const error = { code: 400, message: 'Bad Request' };
    const result = generateResponse(false, error);

    expect(result).toEqual({
      success: false,
      error: {
        code: 400,
        message: 'Bad Request',
      },
    });
  });

  it('should return default error response when success is false and no code/message provided', () => {
    const error = {};
    const result = generateResponse(false, error);

    expect(result).toEqual({
      success: false,
      error: {
        code: 500,
        message: 'Unknown error',
      },
    });
  });
});