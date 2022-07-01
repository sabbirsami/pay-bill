import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
    let navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        setLoginError(" Email & Password don't match! Please try again.");
        const password = data.password;
        const email = data.email;
        fetch(`http://localhost:5000/registration/${email}`)
            .then((res) => res.json())
            .then((result) => {
                if (email === result.email && password == result.password) {
                    navigate("/billing");
                }
                console.log(result);
            });

        reset();
    };
    return (
        <div>
            <div className="py-5">
                <div className="container">
                    <p className="display-5 text-center">
                        <i>Pay Bill</i>
                    </p>
                    <div className="row">
                        <div className="col-lg-5 mx-auto">
                            <div className="py-lg-5">
                                <div className="p-5 shadow rounded-3 bg-light">
                                    <h2 className="pt-3 pb-4">Log In</h2>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Email is Required",
                                                    },
                                                    pattern: {
                                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                                        message:
                                                            "Provide a valid Email",
                                                    },
                                                })}
                                                className="border-bottom border-0 rounded-3"
                                                type="email"
                                                placeholder="name@example.com"
                                            />
                                            <p className="text-danger">
                                                {errors.email?.type ===
                                                    "required" && (
                                                    <small className="text-danger">
                                                        {errors.email.message}
                                                    </small>
                                                )}

                                                {errors.email?.type ===
                                                    "pattern" && (
                                                    <small className="text-danger">
                                                        {errors.email.message}
                                                    </small>
                                                )}
                                            </p>
                                        </FloatingLabel>
                                        <FloatingLabel
                                            controlId="floatingPassword"
                                            label="Password"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                {...register("password", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Password is Required",
                                                    },
                                                    minLength: {
                                                        value: 6,
                                                        message:
                                                            "Must be 6 characters or longer",
                                                    },
                                                })}
                                                className="border-bottom border-0 rounded-3"
                                                type="password"
                                                placeholder="Password"
                                            />
                                            <p className="text-danger">
                                                {errors.email?.type ===
                                                    "required" && (
                                                    <small className="text-danger">
                                                        {
                                                            errors.password
                                                                .message
                                                        }
                                                    </small>
                                                )}

                                                {errors.email?.type ===
                                                    "minLength" && (
                                                    <small className="text-danger">
                                                        {
                                                            errors.password
                                                                .message
                                                        }
                                                    </small>
                                                )}
                                            </p>
                                        </FloatingLabel>
                                        <p>
                                            <small className="text-danger">
                                                {loginError}
                                            </small>
                                        </p>

                                        <div className="py-3 row justify-content-between align-items-center">
                                            <div className="col-lg-5">
                                                <button
                                                    className="rounded-3 px-5 py-2 btn btn-outline-success"
                                                    type="submit"
                                                >
                                                    Log In
                                                </button>
                                            </div>
                                            <div className="col-lg-7">
                                                <p className="mt-3">
                                                    Don't have an account?{" "}
                                                    <Link
                                                        className="text-success"
                                                        to={"/registration"}
                                                    >
                                                        Sign Up
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
