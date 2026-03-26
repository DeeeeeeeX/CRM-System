export const validating = (value?: string)  => {
  const noSpaceValue = value?.trim()
  if (!noSpaceValue || noSpaceValue.length < 2) {
    return Promise.reject(new Error('must be at least 2 characters'));
  }
  if (noSpaceValue.length > 64) {
    return Promise.reject(new Error('cannot be longer than 64 characters'));
  }
  return Promise.resolve();
}