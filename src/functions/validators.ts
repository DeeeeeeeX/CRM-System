export const validateToDoLength = (value?: string) => {
  const noSpaceValue = value?.trim();
  if (!noSpaceValue || noSpaceValue.length < 2) {
    return Promise.reject(new Error('must be at least 2 characters'));
  }
  if (noSpaceValue.length > 64) {
    return Promise.reject(new Error('cannot be longer than 64 characters'));
  }
  return Promise.resolve();
};

export const validateUserName = (userName?: string): Promise<void> => {
  if (userName && userName.match(/^([a-zа-яё]){1,60}$/i)) {
    return Promise.resolve();
  }
  return Promise.reject(
    new Error('The username must contain from 1 to 60 characters of the Russian/Latin alphabet.'),
  );
};

export const validateLogin = (login?: string): Promise<void> => {
  if (login && login.match(/^([a-z]){2,60}$/i)) {
    return Promise.resolve();
  }
  return Promise.reject(
    new Error('The username must contain from 2 to 60 characters of the Latin alphabet.'),
  );
};

export const validateEmail = (email?: string): Promise<void> => {
  if (
    email &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  ) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Please enter a valid email address.'));
};

export const validateNumberPhone = (numberPhone?: string): Promise<void> => {
  if (numberPhone && numberPhone.match(/^\+\d{6,18}$/)) {
    return Promise.resolve();
  }
  if (!numberPhone) {
    return Promise.resolve();
  }
  return Promise.reject(
    new Error('The phone number must begin with + and contain from 6 to 18 digits.'),
  );
};
