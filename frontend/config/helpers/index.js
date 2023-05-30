export const isFullObjectAndValues = (object) => {
  return Object.values(object).every((value) => value !== '')
    && Object.keys(object).length === Object.values(object).length;
};