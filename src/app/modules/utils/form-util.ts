import { FormValues } from './types/stringUtilInterface';

export default class FormUtil {
  formValidator(
    formData: FormValues,
    minPasswordLength = 1,
    rePass: string | null = null
  ) {
    if (Object.keys(formData).length === 0) {
      throw new Error('Form must be filled!');
    }

    // let emailPattern =
    //   /^(?!\.)[-\w\!\#\.\(\)\$\%\&\'\*\+\/\=\?\"\'\^\[\]\`\{\|\}\~]+?(?<!\.)@(?!\.)[-\w\!\#\.\(\)\$\%\&\'\*\+\/\=\?\"\'\^\[\]\`\{\|\}\~]+?\.[-\w\!\#\.\(\)\$\%\&\'\*\+\/\=\?\"\'\^\[\]\`\{\|\}\~]+(?<!\.)$/g;
    let emailPattern =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;

    for (let key in formData) {
      if (formData[key as keyof FormValues] === '') {
        throw new Error(`${key} must be filled!`);
      }

      if (key === 'email') {
        if (!emailPattern.test(formData[key as keyof FormValues])) {
          throw new Error('Please enter a valid email');
        }
        emailPattern.lastIndex = 0;
      } else if (
        key === 'password' &&
        formData[key as keyof FormValues].length <
          Math.max(1, minPasswordLength)
      ) {
        throw new Error(
          `Password must be at least ${minPasswordLength} characters long!`
        );
      }
    }
    return true;
  }

  valueConverter(value: string) {
    if (typeof value === 'string') {
      value = value.toLowerCase();
      if (['true', 'false'].includes(value)) {
        return value === 'true' ? true : false;
      } else if (!isNaN(Number(value))) {
        return Number(value);
      } else {
        return value;
      }
    }
    return null;
  }

  formKeys({ formKeys = {}, empty = false } = {}) {
    const iterator = Array.isArray(formKeys)
      ? [...formKeys]
      : Object.keys(formKeys);
    return iterator.reduce((acc, curr) => {
      acc[curr] = empty ? '' : curr;
      return acc;
    }, {});
  }
}
