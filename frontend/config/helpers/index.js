export const isNullOrUndefined = (value) => value === null || value === undefined;
export const isNullOrWhiteSpace = (value) => isNullOrUndefined(value) || value === '';
export const isFullObjectAndValues = (object) => {
  return Object.values(object).every((value) => !isNullOrWhiteSpace(value) || value > 0 || value?.length > 0  )
    && Object.keys(object).length === Object.values(object).length;
};