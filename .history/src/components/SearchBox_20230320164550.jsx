import React, { useState } from 'react'

const SearchBox = () => {
    const [username, setUsername] = useState('')
    const enterHandler = (e) => {
        e.preventDefault()
        if (e.key === 'Enter') {
            setUsername(e.target.value)
        }
    }

    return (
        <div  >
            <input type="text" id="search" name="search" placeholder='Search Username' onKeyDown={enterHandler} />
            {/* <button onClick={}>Submit</button> */}
        </div>
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