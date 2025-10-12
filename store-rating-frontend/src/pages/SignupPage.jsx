import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../api/api';
import { nameRules, addressMax, passwordRegex } from '../utils/validators';

const schema = yup.object().shape({
  name: yup.string().min(nameRules.min, `Min ${nameRules.min}`).max(nameRules.max, `Max ${nameRules.max}`).required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  address: yup.string().max(addressMax, `Max ${addressMax}`),
  password: yup.string()
    .matches(passwordRegex, 'Password 8-16 chars, 1 uppercase, 1 special')
    .required('Required'),
});

export default function SignupPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: '', email: '', address: '', password: '' },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await api.post('/auth/signup', values);
        alert('Signup successful — login now');
        navigate('/login');
      } catch (err) {
        alert(err?.response?.data?.msg || 'Signup failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='container'>
         <div className="card" style={{ maxWidth: 560, margin: '40px auto' }}>
      <h2>Sign up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
            <div style={{ flex:1 }}>
          <label>Name</label><br />
          <input className="input" name="name" value={formik.values.name} onChange={formik.handleChange} />
          {formik.touched.name && formik.errors.name && <div style={{color:'red'}}>{formik.errors.name}</div>}
        </div>
        <div>
          <label>Email</label><br />
          <input className="input"  name="email" value={formik.values.email} onChange={formik.handleChange} />
          {formik.touched.email && formik.errors.email && <div style={{color:'red'}}>{formik.errors.email}</div>}
        </div>
        <div>
          <label>Address</label><br />
          <textarea name="address" value={formik.values.address} onChange={formik.handleChange} />
          {formik.touched.address && formik.errors.address && <div style={{color:'red'}}>{formik.errors.address}</div>}
        </div>
        <div>
          <label>Password</label><br />
          <input className="input"  name="password" type="password" value={formik.values.password} onChange={formik.handleChange} />
          {formik.touched.password && formik.errors.password && <div style={{color:'red'}}>{formik.errors.password}</div>}
        </div>
        </div>
        <button className="btn"  type="submit" disabled={formik.isSubmitting}>Signup</button>
      </form>
      <p className="small-muted">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
    </div>
   
  );
}
