import { FieldErrors } from 'react-hook-form';

/**
 * A custom hook that return an array of error objects with the field name and error message.
 *
 * @param errors - The `FieldErrors` object from `react-hook-form`.
 * @returns An array of error objects with the field name and error message.
 */
function useFormErrors<T extends Record<string, any>>(errors: FieldErrors<T>) {
  const errorList = Object.entries(errors).map(([field, errorDetails]) => {
    return {
      field,
      message: errorDetails?.message || 'Unknown error',
    };
  });

  return errorList;
}

export default useFormErrors;
