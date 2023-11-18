import React, {useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../components/Message";
import {addToCart, removeFromCart} from "../actions/cartActions";

function CartScreen(props) {
    const {id} = useParams()
    const location = useLocation();
    const qty = location.search ? Number(new URLSearchParams(location.search).get('qty')) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const cartItems = cart.cartItems || []
    const navigate = useNavigate()
    console.log(cartItems)
    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        navigate('/shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant={"info"}>Your Cart is empty <Link to='/'>Go back</Link></Message>
                ) : (
                    <ListGroup variant={"flush"}>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} a lt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qty}
                                                      onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                            {item.countInStock > 0 ? (
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                            ) : (
                                                <option value={0}>Out of Stock</option>
                                            )}
                                        </Form.Control>

                                    </Col>
                                    <Col md={1}>
                                        <Button type='button' variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}><i
                                            className='fas fa-trash'></i></Button>
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems ? cartItems.reduce((acc, item) => acc + item.qty, 0) : 0})</h2>

                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block w-100' onClick={checkoutHandler}
                                    disabled={cartItems.length === 0}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>


                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;
