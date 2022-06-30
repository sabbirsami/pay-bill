import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
const DataTable = () => {
    return (
        <section>
            <div className="container py-4">
                {/* ADD NEW BILL SECTION  */}
                <div className="py-4">
                    <div className=" row align-items-center justify-content-between">
                        <div className="col-lg-2">
                            <h4>Billing</h4>
                        </div>
                        <div className="col-lg-6">
                            <Form.Control
                                type="text"
                                className="rounded-0 "
                                placeholder="Search"
                            />
                        </div>
                        <div className="col-lg-4 text-end">
                            <button className="btn btn-success border-0 bg-gradient rounded-0 px-4">
                                Add New Bill
                            </button>
                        </div>
                    </div>
                </div>

                {/* DATA TABLE SECTION  */}
                <Table bordered hover>
                    <thead className="bg-dark text-white border-dark">
                        <tr>
                            <th className="border-end">Billing ID</th>
                            <th className="border-end border-white">
                                Full Name
                            </th>
                            <th className="border-end border-white">Email</th>
                            <th className="border-end border-white">Phone</th>
                            <th className="border-end border-white">
                                Paid Amount
                            </th>
                            <th className="">Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr>
                            <td>1</td>
                            <td>Mark Deu</td>
                            <td>Otto@gmail.com</td>
                            <td>+8807410242</td>
                            <td>10242</td>
                            <td className="d-flex align-items-center justify-content-center">
                                <button className="btn btn-success rounded-0 bg-gradient border-0 w-100">
                                    Edit
                                </button>
                                <button className="btn btn-danger rounded-0 border-0 bg-gradient w-100">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Mark Deu</td>
                            <td>Otto@gmail.com</td>
                            <td>+8807410242</td>
                            <td>10242</td>
                            <td className="d-flex align-items-center justify-content-center">
                                <button className="btn btn-success rounded-0 border-0 bg-gradient w-100">
                                    Edit
                                </button>
                                <button className="btn btn-danger rounded-0 border-0 bg-gradient w-100">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Mark Deu</td>
                            <td>Otto@gmail.com</td>
                            <td>+8807410242</td>
                            <td>10242</td>
                            <td className="d-flex align-items-center justify-content-center">
                                <button className="btn btn-success rounded-0 bg-gradient border-0 w-100">
                                    Edit
                                </button>
                                <button className="btn btn-danger rounded-0 bg-gradient border-0 w-100">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </section>
    );
};

export default DataTable;
