import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import API from '../../api/axiosInstance';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    // navigation
    const navigate = useNavigate();
    // loading for api response
    const [loading, setLoading] = useState(false);
    // error handler for error message
    const [error, setError] = useState("");

    // validation for email&Password
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is Required"),
        password: Yup.string().min(6).required("Password is Required"),
    });

    return (
        <>
            {/* Login container Block */}
            <div className={`container ${styles.container}`}>
                <div className="card shadow p-4">
                    <h3 className="text-center mb-3">Login</h3>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {/* Formik Library for handling form manages */}
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            try {
                                setLoading(true);
                                const res = await API.post("/login", values);
                                localStorage.setItem("token", res.data.token);
                                navigate("/dashboard");
                            } catch (err) {
                                setError(err.response?.data?.message || "Login failed");
                            } finally {
                                setLoading(false);
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {/* Email */}
                                <div className="mb-3">
                                    <Field
                                        name="email"
                                        className={`form-control ${errors.email && touched.email ? "is-invalid" : ""
                                            }`}
                                        placeholder="Email"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <Field
                                        type="password"
                                        name="password"
                                        className={`form-control ${errors.password && touched.password ? "is-invalid" : ""
                                            }`}
                                        placeholder="Password"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    {loading ? "Loading..." : "Login"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <p className="mt-3 text-center">
                        Don't have account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;