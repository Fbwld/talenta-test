import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import DeleteData from "../components/modals/DeleteData";
import { API } from '../config/api';
import noproduct from "../assets/images/noproduct.png"
import logo from "../assets/images/Logo.png"
import BarChart from '../components/barchart/BarChart'

export default function Landing() {
const title = 'Landing';
document.title = 'Talenta Indonesia | ' + title;

let navigate = useNavigate();

const [member, setMember] = useState([]);
const [idDelete, setIdDelete] = useState(null);
const [confirmDelete, setConfirmDelete] = useState(null);

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

    useEffect(()=>{
        async function dataMember(){
        const db = await API.get('/members')
        return setMember(db.data.data.data)
        }
        dataMember();
    },[])
    const addMember = () => {
    navigate('/add-member');
};

const handleUpdate = (id) => {
    navigate('/editcategory/' + id);
};

const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
};

const deleteById = useMutation(async (id) => {
    try {
    await API.delete(`/member/${id}`);
    // refetch();
    } catch (error) {
    console.log(error);
    }
});

useEffect(() => {
    if (confirmDelete) {
    handleClose();
    deleteById.mutate(idDelete);
    setConfirmDelete(null);
    }
}, [confirmDelete]);


console.log(member)
return (
    <>
    <Container className="py-5" style={{height:"87vh"}}>
        <Row>
        <Col xs="6">
            <img className='img-logo'src={logo}/>
            <div className="text-header">Add Member</div>
        </Col>
        <Col xs="6" className="text-end">
            <Button
                onClick={addMember}
                className="btn-add"
                style={{ width: '100px' ,
                background:"#2C3333",
                border:"none",
                color:'black',
                }}
                >
                <b>Add</b>
            </Button>
        </Col>
        <Col xs="12">
            {member?.length !== 0 ? (
            <Table striped hover size="lg" className='bg-dark'>
                <thead>
                <tr className="text-center">
                    <th width="1%" className="text-center">
                    No
                    </th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {member?.map((item, index) => (
                    <tr key={index}>
                    <td width="3%" className="align-middle text-center">{index + 1}</td>
                    <td width="10%"className="align-middle">
                        {item?.name}
                    </td>
                    <td width="40%"className="align-middle" style={{textAlign:"justify"}}>
                        {item?.gender}
                    </td>
                    <td width="10%" className="align-middle">
                    {item?.age}
                    </td>
                    <td width="24%"className="align-middle">
                        <Button
                        onClick={() => {
                            handleUpdate(item?.id);
                        }}
                        className="btn-sm btn-success me-2"
                        style={{ width: '135px' }}
                        >
                        Edit
                        </Button>
                        <Button
                        onClick={() => {
                            handleDelete(item?.id);
                        }}
                        className="btn-sm btn-danger"
                        style={{ width: '135px' }}
                        >
                        Delete
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            ) : (
            <div className="text-center pt-5">
                <img
                src={noproduct}
                className="img-fluid"
                style={{ width: '40%' }}
                alt="empty"
                />
                <div className="mt-3">No data</div>
            </div>
            )}
        </Col>
        </Row>
        <BarChart />
    </Container>
    <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
    />
    </>
)
}
