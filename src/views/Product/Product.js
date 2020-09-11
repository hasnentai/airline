import React, { Component, useState } from 'react';
import "./Product.scss";
import ProductImage from "../../assets/img/product.png";
import Save from "../../assets/img/save.svg";
import Delete from "../../assets/img/delete.svg";
import Edit from "../../assets/img/edit.svg";
import UploadTemplate from "./Upload";
import * as XLSX from "xlsx";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const Product = () => {
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState({});

    const toggle = () => setModal(!modal);
    const [products, setProducts] = useState([{
        "Product Name": "ANA Shareholder Benefit Number Guide (Valid until: November 30, 2020)",
        "Price": 3000,
        "validity": "May 2020"
    }])
    let fileUpload = (event) => {

        let input = event.target;
        let reader = new FileReader();
        reader.onload = function () {
            let fileData = reader.result;
            let wb = XLSX.read(fileData, { type: 'binary' });

            wb.SheetNames.forEach(function (sheetName) {
                let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
                console.log(JSON.stringify(rowObj))
                setProducts(rowObj)
            })
        };
        reader.readAsBinaryString(input.files[0]);

    };
    const deleteItem = (item, i) => {
        products.splice(i, 1)
        setProducts(products);
    }
    const editItem = (item, i) => {
        setModal(!modal);
    }
    return (
        <React.Fragment>
            {products.map((item, i) =>
                <div className="box_cart" key={i}>
                    <div className="box_detail">
                        <p>
                            <img src={ProductImage} style={{ width: '140px' }} />
                        </p>
                        <ul className="box_info">
                            <li>
                                <h6>Product</h6>
                                <p className="product-info">
                                    {item["Product Name"]}
                                </p>
                            </li>
                            <li>
                                <h6>Product Price</h6>
                                <p>
                                    ¥  {item["Price"]}
                                </p>
                            </li>
                            <li>
                                <h6>Validity</h6>
                                <p>
                                    {item["validity"]}
                                </p>
                            </li>
                            <li className="action">
                                <h6>Actions</h6>
                                <p>
                                    {/* <img width="15px" src={Save} /> */}
                                    <img src={Edit} onClick={() => editItem(item, i)} />
                                    <img src={Delete} onClick={() => deleteItem(item, i)} />
                                </p>
                            </li>
                        </ul>
                    </div>

                </div>
            )}
            <div className="upload-wrap">
                <h5>Upload Products:</h5>
                <UploadTemplate fileUpload={fileUpload} />
            </div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Edit Product Details</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label for="pname" sm={2}>Product Name</Label>
                            <Col sm={10}>
                                <Input type="text" name="pname" id="pname" placeholder="Please enter the name of the product" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="price" sm={2}>Product Price</Label>
                            <Col sm={10}>
                                <Input type="number" name="number" id="price" placeholder="Please enter product price" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="validity" sm={2}>Validity</Label>
                            <Col sm={10}>
                                <Input
                                    type="date"
                                    name="date"
                                    id="validity"
                                    placeholder="Validity"
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}


export default Product;