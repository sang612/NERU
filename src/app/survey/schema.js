import * as yup from 'yup';

export const schema = yup.object().shape({
  Q1: yup.string().required('* 私たちは答えが必要です。'),
  Q2: yup.string().required('* 私たちは答えが必要です。'),
  Q3: yup.string().required('* 私たちは答えが必要です。'),
  Q4: yup.string().required('* 私たちは答えが必要です。'),
  Q5: yup.string().optional(),
  Q6: yup.string().required('* 私たちは答えが必要です。'),
  Q7: yup.string().required('* 私たちは答えが必要です。'),
  Q8: yup.string().required('* 私たちは答えが必要です。'),
  Q9: yup.string().required('* 私たちは答えが必要です。'),
  Q10: yup
    .string()
    .nullable()
    .when('Q9', {
      is: (val) => val === 'いいえ',
      then: (schema) => schema.required('* 私たちは答えが必要です。'),
    }),
  Q11: yup
    .string()
    .nullable()
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
      is: (val) => val === 'いいえ',
      then: (schema) => schema.required('* 私たちは答えが必要です。'),
    }),
});
