import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInputs {
  firstName: string;
  age: number;
}

const removeExtraSpace = (s: string) => s.trim().split(/ +/).join(' ');

const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().positive().integer(),
});

const FormExample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: IFormInputs) => {
    const returnedData = {
      firstName: removeExtraSpace(data.firstName),
      age: data.age,
    };
    const valid = await schema.isValid(returnedData);
    if (valid) {
      console.log(returnedData);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='firstName-id'>First Name</label>
        <input type='text' id='firstName-id' {...register('firstName')} />
        <p>{errors.firstName?.message}</p>
      </div>
      <div>
        <label htmlFor='age-id'>Age</label>
        <input type='text' id='age-id' {...register('age')} />
        <p>{errors.age?.message}</p>
      </div>
      <input type='submit' />
    </form>
  );
};

export default FormExample;
