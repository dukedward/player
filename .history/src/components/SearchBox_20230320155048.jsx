import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={submitHandler} >
            <label for="search">Username:</label>
            <input type="text" id="search" name="search" />
        </form>
    )
}

export default SearchBox

        // <Form onSubmit={submitHandler}>
        //     <Row>
        //         <Col md={7}>
        //             <Form.Control
        //                 type='text'
        //                 name='q'
        //                 onChange={(e) => setKeyword(e.target.value)}
        //                 placeholder='Search products...'
        //                 className='mr-sm-2 ml-sm-5'
        //             ></Form.Control>
        //         </Col>
        //         <Col>
        //             <Button type='submit' className='btn-outline-smoke p-2'>
        //                 Search
        //             </Button>
        //         </Col>
        //     </Row>
        // </Form>