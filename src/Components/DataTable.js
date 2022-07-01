import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Pagination from "react-bootstrap/Pagination";
import { useQuery } from "react-query";
import Loading from "./Loading";
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi";

const formatDollars = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

const formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = Number(str).toString();

  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return null;
};
const DataTable = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState([]);
  // console.log(search);
  const [pageCount, setPageCount] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  // MODAL
  const values = [true, "xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  //UPDATE MODAL
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editing, setEditing] = useState();
  // console.log(editing);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleUpdateModalShow = (mail) => {
    handleUpdateConfirm(mail);
    setShowUpdateModal(true);
  };
  const handleUpdateConfirm = (mail) => {
    updateBill(mail);
    setEditing(mail);
  };

  //DELETE MODAL
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingOrder, setDeletingOrder] = useState();
  const handleClose = () => setShowDeleteModal(false);
  const handleModalOpen = (id) => {
    setShowDeleteModal(true);
    setDeletingOrder(id);
  };
  const handleConfirm = (id) => {
    handleDelete(id);
  };
  const {
    isLoading,
    error,
    data: searchData,
    refetch,
  } = useQuery(["amount"], () =>
    fetch("https://pay-bill-2022.herokuapp.com/bill-list").then((res) =>
      res.json()
    )
  );
  // console.log(searchData);

  // LOAD DATA BY PAGE
  useEffect(() => {
    fetch(`https://pay-bill-2022.herokuapp.com/bills?page=${page}&size=${10}`)
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
      });
    // refetch();
  }, [page, bills]);

  // GET TOTAL BILLS NUMBER
  useEffect(() => {
    fetch("https://pay-bill-2022.herokuapp.com/billsCount")
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        setCount(count);
        const pages = Math.ceil(count / 10);
        setPageCount(pages);
      });
  }, [count]);
  if (isLoading) {
    return <Loading />;
  }

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePre = () => {
    setPage(page - 1);
  };

  const handleSearch = (text) => {
    const filtered = searchData.result.filter((data) =>
      data.name.toLowerCase().includes(text.toLowerCase())
    );
    // console.log(filtered);
    // setBills(filtered);
  };

  // DELETE BILL
  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://pay-bill-2022.herokuapp.com/bills/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          toast.success("Successfully deleted");
          reset();
          refetch();
          handleClose();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    reset();
  };
  const updateBill = (data) => {
    console.log(data);
    fetch(`https://pay-bill-2022.herokuapp.com/bills/${data.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        reset();
        alert("item Updated successfully!!!");
      });
    refetch();
    handleUpdateModalClose();
  };

  // ADD NEW BILL
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
            refetch();
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
    <section>
      <div className="container py-1">
        {/* ADD NEW BILL SECTION  */}
        <div className="py-4">
          <div className=" row align-items-center justify-content-between">
            <div className="col-lg-2">
              <h4>Billing</h4>
            </div>
            <div className="col-lg-6">
              <Form.Control
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                className="rounded-0 "
                placeholder="Search"
              />
            </div>
            <div className="col-lg-3 text-end">
              <button
                key={values}
                onClick={() => handleShow(values)}
                className="btn btn-success border-0 bg-gradient rounded-0 px-4"
              >
                Add New Bill
              </button>
            </div>
          </div>
        </div>

        {/*  UPDATE MODAL  */}
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
            <Form>
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
                  {...register("email", {})}
                  value={editing}
                  readOnly
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
              onClick={handleSubmit(updateBill)}
              type="submit"
              variant="primary"
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/*  DELETE MODAL  */}
        <>
          <Modal centered show={showDeleteModal} onHide={handleClose}>
            <Modal.Header className="border-0" closeButton></Modal.Header>
            <Modal.Body className="text-center">
              Are you sure? you want to{" "}
              <span className="text-danger">Cancel Order</span>
            </Modal.Body>
            <Modal.Footer className="border-0 text-center justify-content-center pb-5">
              <Button
                className="rounded-0 btn-outline-success alert-success py-2 px-5"
                variant="secondary"
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                className="rounded-0 btn-danger py-2 px-5"
                variant="primary"
                onClick={() => handleConfirm(deletingOrder)}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        {/* ADD NEW BILL MODAL */}
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Bill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-lg-5 mx-auto justify-content-center align-items-center">
              <div className=" p-5">
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

                  <Button
                    className="rounded-0 btn btn-success border-0gb-gradient px-5"
                    type="submit"
                  >
                    Add Bill
                  </Button>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* DATA TABLE SECTION  */}
        <Table bordered hover>
          <thead className="bg-dark text-white border-dark">
            <tr>
              <th className="border-end">Billing ID</th>
              <th className="border-end border-white">Full Name</th>
              <th className="border-end border-white">Email</th>
              <th className="border-end border-white">Phone</th>
              <th className="border-end border-white">Paid Amount</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {bills.map((bill, index) => (
              <tr key={bill._id}>
                <td>{bill._id}</td>
                <td>{bill.name}</td>
                <td>{bill.email}</td>
                <td>{formatPhoneNumber(bill.phoneNumber)}</td>
                <td>{formatDollars(bill.amount)}</td>
                <td className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={() => handleUpdateModalShow(bill.email)}
                    className="btn btn-success rounded-0 bg-gradient border-0 w-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleModalOpen(bill._id)}
                    className="btn btn-danger rounded-0 border-0 bg-gradient w-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* PAGINATION AREA  */}
        <div className="mx-auto text-center">
          <Pagination className="justify-content-center">
            <Pagination.Prev className="border-0 m-1" onClick={handlePre}>
              <HiOutlineArrowNarrowLeft />
            </Pagination.Prev>
            {[...Array(pageCount).keys()].map((number, index) => (
              <Pagination.Item
                className="border-0 m-1"
                key={index}
                active={page === number}
                onClick={() => setPage(number)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next className="m-1" onClick={handleNext}>
              <HiOutlineArrowNarrowRight />
            </Pagination.Next>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default DataTable;
