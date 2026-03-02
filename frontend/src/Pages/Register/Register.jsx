import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/axiosInstance";
import styles from "./Register.module.css";


const Register = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Minimum 3 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Minimum 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
    });

    return (
        <div className={`container ${styles.container}`}>
            <div className={`card shadow ${styles.card}`}>
                <h3 className="text-center mb-3">Create Account</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        try {
                            setLoading(true);
                            setError("");

                            await API.post("/register", {
                                name: values.name,
                                email: values.email,
                                password: values.password,
                            });

                            navigate("/");
                        } catch (err) {
                            setError(err.response?.data?.message || "Registration failed");
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            {/* Name */}
                            <div className="mb-3">
                                <Field
                                    name="name"
                                    placeholder="Full Name"
                                    className={`form-control ${errors.name && touched.name ? "is-invalid" : ""
                                        }`}
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className={`form-control ${errors.email && touched.email ? "is-invalid" : ""
                                        }`}
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
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className={`form-control ${errors.password && touched.password ? "is-invalid" : ""
                                        }`}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-3">
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className={`form-control ${errors.confirmPassword && touched.confirmPassword
                                        ? "is-invalid"
                                        : ""
                                        }`}
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Register"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="mt-3 text-center">
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register