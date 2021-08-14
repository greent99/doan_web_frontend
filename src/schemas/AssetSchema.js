import * as Yup from 'yup';

export const AddAndUpdateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .max(255)
    .test('name', 'Invalid name', (value) => {
      if (value) {
        const str = value.replace(/\s\s+/g, ' ');
        return str === value;
      }
      return true;
    })
    .test('name', 'Invalid name', (value) => {
      if (value) {
        return !value.slice(-1).includes(' ');
      }
      return true;
    }),
});
