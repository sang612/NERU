const messageValidatePassword = {
  password: {
    notInput: 'パスワードは必ず入力してください。',
    failRegex: 'パスワード8~32桁で入力してください。',
  },
  newPassword: {
    notInput: '新しいパスワードは必ず入力してください。',
    failRegex: '新しいパスワードは、8文字〜24文字以内で入力してください。',
  },
};
const messageValidateName = {
  firstName: '姓',
  lastName: '名',
  companyName: '会社名',
  departmentName: '部署名',
};
const regexName = /^[a-zA-Zａ-ｚA-Z0-9 ぁ-んァ-ヶー一-龠々]+$/;
const regexNameKatakana = /^([ァ-ン]|ー)+$/;
const regexPassword = /^[0-9a-zA-Zぁ-んァ-ヶー一-龠々]{8,32}$/;
const regexTelPhone = /(^(\d{7,11})+$)/;
//eslint-disable-next-line
const regexEmail =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateCode = (code) => {
  return code?.length >= 1 && code?.length <= 24 ? '' : '社員番号に誤りがあります。';
};

export const validateTelPhone = (tel) => {
  return !tel.trim()
    ? '電話番号は、必ず入力してください。'
    : regexTelPhone.test(tel.trim())
    ? ''
    : `電話番号は10~11桁で入力してください。`;
};
export const validateEmail = (email) =>
  !email.trim()
    ? 'メールアドレスは、必ず入力してください。'
    : regexEmail.test(email.trim())
    ? ''
    : 'メールアドレスは有効なメールアドレスでなければなりません';

export const validateName = (name, type) =>
  !name.trim()
    ? `${messageValidateName[type]}は、必ず入力してください。`
    : !regexName.test(name.trim())
    ? `${messageValidateName[type]}は、使用できる文字を入力してください。`
    : name.trim().length < 31
    ? ''
    : `${messageValidateName[type]}は、30文字以下で入力してください。`;

export const validateNameKatakana = (name, type) =>
  !name.trim()
    ? `${messageValidateName[type]}ふりがな'は、必ず入力してください。`
    : !regexNameKatakana.test(name.trim())
    ? `${messageValidateName[type]}ふりがな'は、使用できる文字を入力してください。`
    : name.trim().length < 31
    ? ''
    : `${messageValidateName[type]}ふりがな'は、30文字以下で入力してください。`;

export const validatePassword = (password, page) =>
  !password.trim()
    ? messageValidatePassword[page].notInput
    : regexPassword.test(password)
    ? ''
    : messageValidatePassword[page].failRegex;

export const validateConfirmPassword = (confirmPassword, password) =>
  !confirmPassword
    ? 'パスワードは必ず入力してください。'
    : confirmPassword === password
    ? ''
    : 'パスワードが一致しません。';

export const validateLogin = (tel, password) => ({
  tel: validateTelPhone(tel),
  password: validatePassword(password, 'password'),
});

export const validateForgotPassword = (confirmPassword, password) => {
  return {
    password: validatePassword(password, 'newPassword'),
    confirmPassword: validateConfirmPassword(confirmPassword, password),
  };
};

export const validateHeight = (height) => {
  if (height === '') {
    return '身長は、必ず入力してください。';
  }
  if (height >= 100 && height <= 250) {
    return '';
  } else {
    return '100-250までの数字で入力してください。';
  }
};
export const validateWeight = (weight) => {
  if (weight === '') {
    return '体重は、必ず入力してください。';
  }
  if (weight >= 30 && weight <= 200) {
    return '';
  } else {
    return '30-200までの数字で入力してください。';
  }
};
export const validateGender = (gender) => {
  if (gender === "Male" || gender === "Female") {
    return "";
  } else {
    return `"gender" は [Male, Female] のいずれかでなければなりません`;
  }
};

export const validateRegister = (
  firstName,
  firstNameKatakana,
  lastName,
  lastNameKatakana,
  email,
  gender,
  numberphone,
  password
) => ({
  firstName: validateName(firstName, 'firstName'),
  firstNameKatakana: validateNameKatakana(firstNameKatakana, 'firstName'),
  lastName: validateName(lastName, 'lastName'),
  lastNameKatakana: validateNameKatakana(lastNameKatakana, 'lastName'),
  email: validateEmail(email),
  gender: validateGender(gender),
  tel: validateTelPhone(numberphone),
  password: validatePassword(password, 'password'),
});
export const validateUpdateUser = (
  firstName,
  firstNameKatakana,
  lastName,
  lastNameKatakana,
  email,
  birthday,
  numberphone,
  code
) => ({
  firstName: validateName(firstName, 'firstName'),
  firstNameKatakana: validateNameKatakana(firstNameKatakana, 'firstName'),
  lastName: validateName(lastName, 'lastName'),
  lastNameKatakana: validateNameKatakana(lastNameKatakana, 'lastName'),
  email: validateEmail(email),
  birthday: birthday ? '' : '生年月日は、必ず指定してください。',
  numberphone: validateTelPhone(numberphone),
  code: validateCode(code),
});
export const validateUpdateAdmin = (
  firstName,
  firstNameKatakana,
  lastName,
  lastNameKatakana,
  email,
  numberphone,
  code
) => ({
  firstName: validateName(firstName, 'firstName'),
  firstNameKatakana: validateNameKatakana(firstNameKatakana, 'firstName'),
  lastName: validateName(lastName, 'lastName'),
  lastNameKatakana: validateNameKatakana(lastNameKatakana, 'lastName'),
  email: validateEmail(email),
  numberphone: validateTelPhone(numberphone),
  code: validateCode(code),
});

export const validateEditProfile = (
  firstName,
  firstNameKatakana,
  lastName,
  lastNameKatakana,
  email,
  height,
  weight,
  birthday,
  code
) => ({
  firstName: validateName(firstName, 'firstName'),
  firstNameKatakana: validateNameKatakana(firstNameKatakana, 'firstName'),
  lastName: validateName(lastName, 'lastName'),
  lastNameKatakana: validateNameKatakana(lastNameKatakana, 'lastName'),
  email: validateEmail(email),
  height: validateHeight(height),
  weight: validateWeight(weight),
  birthday: birthday ? '' : '生年月日は、必ず指定してください。',
  code: validateCode(code),
});
