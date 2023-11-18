import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen() {
    const [qty, setQty] = useState(1)
    const {id} = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);
    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }
    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            {loading ?
                <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <div><h1>{product.name}</h1>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid/>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`}
                                                color="#f8e825"/>
                                    </ListGroup.Item>
                                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                                    <ListGroup.Item>
                                        Status: <span
                                        style={{color: product.countInStock > 0 ? 'green' : 'red'}}>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs='auto' className='my-1'>Qty</Col>
                                                <Col>
                                                    <Form.Control as="select" value={qty}
                                                                  onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button onClick={addToCartHandler} className='btn-block'
                                                disabled={product.countInStock === 0}
                                                type="button">Add to
                                            Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row></div>
                )}

        </div>
    );
}

export default ProductScreen;