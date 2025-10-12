import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const resp = await api.post('/auth/login', values);
        
        setAuth({ token: resp.data.token, user: resp.data.user });
       
        const role = resp.data.user.role;
        if (role === 'admin') navigate('/admin');
        else if (role === 'owner') navigate('/owner');
        else navigate('/stores');
      } catch (err) {
        alert(err?.response?.data?.msg || 'Login failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container">
        <div  className="card" style={{ maxWidth: 480, margin: '40px auto' }}>
      <h2 >Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
            <div style={{ flex:1 }}>
                  <label>Email</label><br />
          <input name="email" value={formik.values.email} onChange={formik.handleChange} />
          {formik.touched.email && formik.errors.email && <div style={{color:'red'}}>{formik.errors.email}</div>}
        </div>
        <div>
          <label>Password</label><br />
          <input name="password" type="password" value={formik.values.password} onChange={formik.handleChange} />
          {formik.touched.password && formik.errors.password && <div style={{color:'red'}}>{formik.errors.password}</div>}
        </div>
            </div>
        
        <button className="btn" type="submit" disabled={formik.isSubmitting}>Login</button>
      </form>
      <p className="small-muted">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
    </div>
    
  );
}
