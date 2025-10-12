import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../api/api';
import { passwordRegex } from '../utils/validators';

const schema = yup.object().shape({
  oldPassword: yup.string().required('Required'),
  newPassword: yup.string().matches(passwordRegex, 'Password 8-16 chars, 1 uppercase, 1 special').required('Required'),
});

export default function ChangePasswordPage() {
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
    <div style={{ maxWidth: 480, margin: '30px auto' }}>
      <h3>Change Password</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Old password</label><br />
          <input name="oldPassword" type="password" value={formik.values.oldPassword} onChange={formik.handleChange} />
          {formik.touched.oldPassword && formik.errors.oldPassword && <div style={{color:'red'}}>{formik.errors.oldPassword}</div>}
        </div>
        <div>
          <label>New password</label><br />
          <input name="newPassword" type="password" value={formik.values.newPassword} onChange={formik.handleChange} />
          {formik.touched.newPassword && formik.errors.newPassword && <div style={{color:'red'}}>{formik.errors.newPassword}</div>}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>Update</button>
      </form>
    </div>
  );
}
