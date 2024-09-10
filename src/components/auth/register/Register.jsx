import { Link } from "react-router-dom";
import "../register/register.css";
import React from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const Register = () => {
    const navigate = useNavigate();

    //validation schema using yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
    });

    //formik hook form management
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/register`, values);
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate('/login')
                }
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.message);
                }
            }
        }
    });

    return (
        <div className="register-container">
            <div className="form-section">
                <h3 className="formHeading">Create Your Account</h3>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} type="text" name="name" placeholder="Name" />
                        {formik.touched.name && formik.errors.name && <p className="errors">{formik.errors.name}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" placeholder="Email" />
                        {formik.touched.email && formik.errors.email && <p className="errors">{formik.errors.email}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type="password" name="password" placeholder="Password" />
                            {formik.touched.password && formik.errors.password && <span className="errors">{formik.errors.password}</span>}
                            {/* <button type="button" className="show-password">SHOW</button> */}
                        </div>
                    </div>
                    <button type="submit" className="sign-in-button">Sign up </button>
                </form>
                <button className="sign-in-other">Sign in with Google</button>
                <p className="sign-up-prompt">Already have an account? <Link className="link" to={'/login'}>Login Here</Link> </p>
            </div>
        </div>
    );
};

export default Register;
