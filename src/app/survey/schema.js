import * as yup from 'yup';

export const schema = yup.object().shape({
  Q1: yup.string().required('入力してください。'),
  Q2: yup
    .string()
    .required('* 入力してください。')
    .test('is-valid-number', '* 60-270までの数字で入力してください。', function (value) {
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 60 && numValue <= 270;
    }),
  Q3: yup
    .string()
    .required('* 入力してください。')
    .test('is-valid-number', '* 2-600までの数字で入力してください。', function (value) {
      const numValue = parseInt(value);
      return !isNaN(numValue) && numValue >= 2 && numValue <= 600;
    }),
  Q4: yup.string().required('* 入力してください。'),
  Q5: yup.string().required('* 入力してください。'),
  Q6: yup.string().required('* 入力してください。'),
  Q7: yup.string().required('* 入力してください。'),
  Q8: yup.string().required('* 入力してください。'),
  Q9: yup.string().required('* 入力してください。'),
  Q10: yup.string().required('* 入力してください。'),
  Q11: yup.array().required('* 入力してください。'),
  Q12: yup.string().required('* 入力してください。'),
  Q13: yup
    .string()
    .nullable()
    .when('Q12', {
      is: (val) => val === 'はい',
      then: (schema) => schema.required('* 入力してください。'),
    }),
  Q14: yup.string().required('* 入力してください。'),
  Q15: yup.string().required('* 入力してください。'),
  Q16: yup.string().required('* 入力してください。'),
  Q17: yup.string().required('* 入力してください。'),
  Q18: yup.string().required('* 入力してください。'),
});
