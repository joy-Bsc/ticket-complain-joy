import React, { useRef } from 'react'
import { Container,Row } from 'react-bootstrap';
import { CreateCompliantRequest, UpdateCompliantRequest } from '../../APIRequest/APIRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDetails } from '../../helper/SessionHelper';

function CreateCompliant() {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params.id);
    

    const nameRef = useRef();
    const descriptionRef = useRef();

    const user = getUserDetails();
    console.log(user);
    
    

     const handleSubmit = (e) => {
        e.preventDefault();
        const userId = user.id;
        const name =  nameRef.current.value;
        const description =  descriptionRef.current.value;

        console.log(name, description, userId);

        CreateCompliantRequest(userId,name, description )
        .then((res) => {
            console.log(res.message);
            if (res.message === 'Ticket created successfully') {
                navigate('/');
            }

        }).catch((err) => {
            console.log(err);
        }
    );
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const ticketId = params.id;
        const name =  nameRef.current.value;
        const description =  descriptionRef.current.value;

        console.log(name, description, ticketId);

       UpdateCompliantRequest( ticketId, name, description )
        .then((res) => {
            console.log(res.message);
            if (res.message === 'Ticket updated successfully') {
                navigate('/');
            }

        }).catch((err) => {
            console.log(err);
        }
    );
    }

  return (
    <Container fluid={true} className='mt-6 content-body'>
    <Row className='d-flex justify-content-center'>
        <div className='col-12 col-lg-8 col-sm-12 col-md-8 p-2'>
            <div className='card'>
                <div className='card-body'>
                    { params.id ? <h5>Update Compliant</h5> : <h5>Create Compliant</h5>}
                    <br />
                    <input ref={nameRef} placeholder='Compliant Name' className='form-control animated fadeInUp' type="text" />
                    <br />
                    <textarea ref={descriptionRef} rows={5}  placeholder='Compliant Description' className='form-control animated fadeInUp' type='text'/>
                    <br />
                    { params.id ? <button onClick={handleUpdate} className='btn w-100 animated fadeInUp float-end btn-primary'>Update</button> : <button onClick={handleSubmit} className='btn w-100 animated fadeInUp float-end btn-primary'>Create</button>}
                </div>
            </div>
        </div>
    </Row>
</Container>
  )
}

export default CreateCompliant