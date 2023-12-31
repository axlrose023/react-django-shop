import React from 'react';
import {Card} from "react-bootstrap";
import Rating from "./Rating";
import {Link} from "react-router-dom";

function Product({_id, image, name, rating, numReviews, price}) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${_id}`}>
                <Card.Img src={image}/>
            </Link>
            <Card.Body>
                <Link to={`/product/${_id}`}>
                    <Card.Title as="div">
                        <strong>{name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={rating} text={`${numReviews} reviews`} color={'#f8e825'}/>
                    </div>
                </Card.Text>
                <Card.Text as="h3">${price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;