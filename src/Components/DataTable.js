import React from "react";
import Table from "react-bootstrap/Table";
const DataTable = () => {
    return (
        <div>
            <div className="container py-4">
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
        </div>
    );
};

export default DataTable;
