import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Row, Col, FormControl, Image } from 'react-bootstrap';
import { CartState } from '../context/CartContext';
import Rating from '../components/Rating';
import { FaTrashAlt } from 'react-icons/fa'

const Cart = () => {
  const { state: {cart},  dispatch} = CartState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price)* curr.qty, 0))
  }, [cart])
 

  
  return (
    <div className='home'>
      <div className="productContainer">
        <ListGroup>
          {
            cart.map((prod) => (
              
              <ListGroup.Item key={prod.id}>
                <Row>
                  <Col md={2}>
                    <Image src={prod.image} alt={prod.name} fluid rounded/>
                  </Col>
                  <Col md={2}>
                  <span>{prod.name}</span>
                  </Col>
                  <Col md={2}>$ {prod.price}</Col>
                  <Col md={2}>
                    <Rating rating={prod.ratings}/>
                  </Col>
                  <Col md={2}>
                  <FormControl 
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                     }
                    >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x+1}>{x + 1}</option>
                    ))}
                  </FormControl>
                  </Col>
                  <Col md={2}>
                  <Button
                      type='button'
                      variant='light'
                      onClick={() => 
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,                    
                          })
                        }>
                        <FaTrashAlt fontSize='20px' />
                      </Button>
                  </Col>
                </Row>
              </ListGroup.Item>

            ))
          }  
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal: ({cart.length}) item(s)</span>
        <span style={{fontWeight: 700, fontSize: 20}}>Total: $ {total}</span>
        <Button type='button' disabled={cart.length === 0}>
          Proceed To Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart