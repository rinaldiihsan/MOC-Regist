import React from 'react';
import Form from '../components/Register/Form';
import MeshImage from '../components/MeshImage';

const Register = () => {
  return (
    <section className="font-poppins flex h-full flex-col laptop:flex-row">
      <Form />
      <MeshImage />
    </section>
  );
};

export default Register;
