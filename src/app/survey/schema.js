import * as yup from 'yup';

export const schema = yup.object().shape({
  Q1: yup.date().required('入力してください。'),
  Q2: yup
    .string()
    .required('* 私たちは答えが必要です。')
    .test('is-valid-number', '* 60-270までの数字で入力してください。', function (value) {
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 60 && numValue <= 270;
    }),
  Q3: yup
    .string()
    .required('* 私たちは答えが必要です。')
    .test('is-valid-number', '* 2-600までの数字で入力してください。', function (value) {
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 2 && numValue <= 600;
    }),
  Q4: yup.string().required('* 私たちは答えが必要です。'),
  Q5: yup
    .string()
    .optional()
    .test('is-valid-number', '* 空欄または1-24までの数字で入力してください。', function (value) {
      if (!value) return true;
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 1 && numValue <= 24;
    }),
  Q6: yup.string().required('* 私たちは答えが必要です。'),
  Q7: yup
    .string()
    .required('* 私たちは答えが必要です。')
    .test('is-valid-number', '* 飲酒日数は0-7までの数字で入力してください。', function (value) {
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 0 && numValue <= 7;
    }),
  Q8: yup
    .string()
    .required('* 私たちは答えが必要です。')
    .test('is-valid-number', '* 酒量は0-20までの数字で入力してください。', function (value) {
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 0 && numValue <= 20;
    }),
  Q9: yup.string().required('* 私たちは答えが必要です。'),
  Q10: yup
    .string()
    .nullable()
    .test('is-valid-number', '* 0-70までの数字で入力してください。', function (value) {
      if (!value) return true;
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 0 && numValue <= 70;
    })
    .when('Q9', {
      is: (val) => val === 'いいえ',
      then: (schema) => schema.required('* 私たちは答えが必要です。'),
    }),
  Q11: yup
    .string()
    .nullable()
    .test('is-valid-number', '* 1-80までの数字で入力してください。', function (value) {
      if (!value) return true;
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 1 && numValue <= 80;
    })
    .when('Q9', {
      is: (val) => val === 'はい',
      then: (schema) => schema.required('* 私たちは答えが必要です。'),
    }),
  Q12: yup.string().required('* 私たちは答えが必要です。'),
  Q13: yup.string().required('* 私たちは答えが必要です。'),
  Q14: yup.string().required('* 私たちは答えが必要です。'),
  Q15: yup.string().required('* 私たちは答えが必要です。'),
  Q16: yup.string().required('* 私たちは答えが必要です。'),
  Q17: yup.string().required('* 私たちは答えが必要です。'),
  Q18: yup.string().required('* 私たちは答えが必要です。'),
  Q19: yup.string().required('* 私たちは答えが必要です。'),
  Q20: yup.string().required('* 私たちは答えが必要です。'),
  Q21: yup
    .string()
    .nullable()
    .test('is-valid-number', '* 5-200までの数字で入力してください。', function (value) {
      if (!value) return true;
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 5 && numValue <= 200;
    })
    .when('Q20', {
      is: (val) => val === 'あり',
      then: (schema) => schema.required('* 私たちは答えが必要です。'),
    }),
  Q22: yup.string().required('* 私たちは答えが必要です。'),
  Q23: yup.string().required('* 私たちは答えが必要です。'),
  Q24: yup.string().required('* 私たちは答えが必要です。'),
  Q25: yup
    .string()
    .nullable()
    .when('Q24', {
      is: (val) => val === 'はい',
      then: (schema) => schema.required('* 私たちは答えが必要です。'),
    }),
  Q26: yup
    .string()
    .nullable()
    .test('is-valid-number', '* 1-70までの数字で入力してください。', function (value) {
      if (!value) return true;
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 1 && numValue <= 70;
    })
    .when('Q25', {
      is: (val) => val === 'はい',
      then: (schema) => schema.required('* 私たちは答えが必要です。'),
    }),
  Q27: yup.string().required('* 私たちは答えが必要です。'),
  Q28: yup
    .string()
    .nullable()
    .when('Q27', {
      is: (val) => val === 'はい',
      then: (schema) => schema.required('* 私たちは答えが必要です。'),
    }),
  Q29: yup.string().required('* 私たちは答えが必要です。'),
  Q30: yup.string().required('* 私たちは答えが必要です。'),
  Q31: yup.string().required('* 私たちは答えが必要です。'),
  Q32: yup.string().required('* 私たちは答えが必要です。'),
  Q33: yup
    .string()
    .nullable()
    .when('Q32', {
      is: (val) => val === 'はい',
      then: (schema) => schema.required('* 私たちは答えが必要です。'),
    }),
});
