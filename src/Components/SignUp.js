import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const [usersEmail, setUsersEmail] = useState("");
    const [databaseUserEmail, setDatabaseUserEmail] = useState("");
    console.log(databaseUserEmail, usersEmail);

    const [loginError, setLoginError] = useState("");
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();
    let navigate = useNavigate();

    fetch(`http://localhost:5000/registration/${usersEmail}`)
        .then((res) => res.json())
        .then((result) => {
            if (usersEmail !== result.email) {
                setDatabaseUserEmail(result.email);
            }
            console.log(result);
        });

    const onSubmit = (data) => {
        setLoginError(" Email already used.");

        setUsersEmail(data.email);
        if (databaseUserEmail !== usersEmail) {
            fetch("http://localhost:5000/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.acknowledged === true) {
                        navigate("/");
                    }
                    console.log(result);
                });

            reset();
        } else {
            console.log("Here");
        }
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
                                    <h2 className="pt-3 pb-4">Sign Up</h2>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Full Name"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                {...register("name", {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Name is Required",
                                                    },
                                                })}
                                                className="border-bottom border-0 rounded-3"
                                                type="text"
                                                placeholder="name"
                                            />
                                        </FloatingLabel>
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
                                        {loginError}
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

                                        <div className="py-3 row justify-content-between align-items-center">
                                            <div className="col-lg-5">
                                                <button
                                                    className="rounded-3 px-4 py-2 btn btn-outline-success"
                                                    type="submit"
                                                >
                                                    Registration
                                                </button>
                                            </div>
                                            <div className="col-lg-7">
                                                <p className="mt-3">
                                                    Already have an account?{" "}
                                                    <Link
                                                        className="text-success"
                                                        to={"/login"}
                                                    >
                                                        Log In
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

export default SignUp;
