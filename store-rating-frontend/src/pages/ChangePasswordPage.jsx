import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../api/api';
import { passwordRegex } from '../utils/validators';
import '../styles/LoginPage.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; 

const schema = yup.object().shape({
  oldPassword: yup.string().required('Required'),
  newPassword: yup.string().matches(passwordRegex, 'Password 8-16 chars, 1 uppercase, 1 special').required('Required'),
});

export default function ChangePasswordPage() {
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: { oldPassword: '', newPassword: '' },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await api.put('/user/password', values);
        alert('Password updated');
        resetForm();
      } catch (err) {
        alert(err?.response?.data?.msg || 'Password change failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='container'>
      <Navbar />
      <div className="login-card" >
        <h3 className="login-header">Change Password</h3>
        <form className ="form-row" onSubmit={formik.handleSubmit}>
          <div>
            <label>Old password</label><br />
            <input name="oldPassword" type="password" value={formik.values.oldPassword} onChange={formik.handleChange} />
            {formik.touched.oldPassword && formik.errors.oldPassword && <div style={{color:'red'}}>{formik.errors.oldPassword}</div>}
          </div>
          <div style={{ marginTop: 10 }}>
            <label >New password</label><br />
            <input name="newPassword" type="password" value={formik.values.newPassword} onChange={formik.handleChange} />
            {formik.touched.newPassword && formik.errors.newPassword && <div style={{color:'red'}}>{formik.errors.newPassword}</div>}
          </div>
          <div className="button-group">
            <button type="submit" disabled={formik.isSubmitting}>Update</button>
          <button
            type="button"
            onClick={() => navigate('/stores')}
          >
            Back
          </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}