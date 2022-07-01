import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import toast, { Toaster } from "react-hot-toast";

const UpdateModal = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //UPDATE MODAL
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleUpdateModalClose = () => setShowUpdateModal(false);
    const handleUpdateModalShow = () => setShowUpdateModal(true);

    const onSubmit = async (data) => {
        console.log(data);
        fetch("https://pay-bill-2022.herokuapp.com/bills", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result) {
                    console.log(result);
                    if (result.status === "ok") {
                        toast.success("Successfully added");
                        <Toaster />;
                        reset();
                    } else {
                        toast.error("Fail to added");
                    }
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        reset();
    };
    return (
        <Modal
            show={showUpdateModal}
            onHide={handleUpdateModalClose}
            animation={true}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            {...register("name")}
                            type="text"
                            placeholder=""
                            className="rounded-0"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is Required",
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: "Provide a valid Email",
                                },
                            })}
                            type="email"
                            className="rounded-0"
                        />
                        <p className="text-danger">
                            {errors.email?.type === "required" && (
                                <small className="text-danger">
                                    {errors.email.message}
                                </small>
                            )}

                            {errors.email?.type === "minLength" && (
                                <small className="text-danger">
                                    {errors.email.message}
                                </small>
                            )}
                        </p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            className="rounded-0"
                            type="number"
                            {...register("phoneNumber", {
                                required: {
                                    value: true,
                                    message: "Phone Number is Required",
                                },
                                minLength: {
                                    value: 11,
                                    message: "Must be 11 characters",
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Must be 11 characters",
                                },
                            })}
                        />
                        <p className="text-danger">
                            {errors.phoneNumber?.type === "required" && (
                                <small className="text-danger">
                                    {errors.phoneNumber.message}
                                </small>
                            )}

                            {errors.phoneNumber?.type === "minLength" && (
                                <small className="text-danger">
                                    {errors.phoneNumber.message}
                                </small>
                            )}
                            {errors.phoneNumber?.type === "maxLength" && (
                                <small className="text-danger">
                                    {errors.phoneNumber.message}
                                </small>
                            )}
                        </p>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Paid Amount</Form.Label>
                        <Form.Control
                            className="rounded-0"
                            type="number"
                            {...register("amount", {
                                required: {
                                    value: true,
                                    message: "Paid Amount is Required",
                                },
                            })}
                        />
                        <p className="text-danger">
                            {errors.amount?.type === "required" && (
                                <small className="text-danger">
                                    {errors.amount.message}
                                </small>
                            )}
                        </p>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleUpdateModalClose}>
                    Close
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    onClick={handleUpdateModalClose}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateModal;
