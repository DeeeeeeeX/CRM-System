export const validating = (value)  => {
  if (value?.trim().length < 2) {
    return Promise.reject(new Error('must be at least 2 characters'));
  }
  if (value?.trim().length > 64) {
    return Promise.reject(new Error('cannot be longer than 64 characters'));
  }
  return Promise.resolve();
}