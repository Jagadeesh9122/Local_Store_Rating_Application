import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/LoginPage.css';

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
            <Navbar/>
            <div className="login-card" >
                <h2 className='login-header'>Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-row">
                        <div >
                            <label>Email</label>
                            <input name="email" value={formik.values.email} onChange={formik.handleChange} list="admin-owner-id" placeholder='type admin/owner/user'/>
                            <datalist id="admin-owner-id">
                                <option value="admin@example.com"/>
                                <option value="owner1@example.com"/>
                                <option value="user1@example.com"/>
                                </datalist>
                            {formik.touched.email && formik.errors.email && <div className='error'>{formik.errors.email}</div>}
                        </div>
                        <div>
                            <label>Password</label>
                            <input name="password" type="password" value={formik.values.password} onChange={formik.handleChange} placeholder='type Admin/Owner/User + @1234' />
                            
                            {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}
                        </div>
                         <button type="submit" disabled={formik.isSubmitting}>Login</button>
                    </div>
                </form>
                <p className="account-text">
                    Don't have an account? <Link to="/signup">Signup</Link>
                </p>
            </div>
        </div>

    );
}
