import {register} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

function RegisterScreen(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
    const navigate = useNavigate()
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect]);

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type='name' placeholder='Enter Name' value={name}
                                  onChange={(e) => setName((e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control required type='email' placeholder='Enter Email' value={email}
                                  onChange={(e) => setEmail((e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type='password' placeholder='Enter Password' value={password}
                                  onChange={(e) => setPassword((e.target.value))}></Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword}
                                  onChange={(e) => setConfirmPassword((e.target.value))}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account?<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;