import { useContext,useState } from "react";
import { Form, Alert, Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext';
import {useMutation} from 'react-query'
import { API } from '../config/api';
import logo from "../assets/images/Logo.png"

export default function Login(){
    let navigate = useNavigate();

    const title = 'Login';
    document.title = 'Talenta Indonesia | ' + title;

    const [state, dispatch] = useContext(UserContext);
    

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
    email: '',
    password: '',
    });

    const { email, password } = form;

    const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = useMutation(async (e) => {
    try {
        e.preventDefault();

        const config = {
        headers: {
            'Content-type': 'application/json',
        },
        };

        const body = JSON.stringify(form);

        const response = await API.post('/login', body, config);

        console.log(response.data?.data?.user?.status === 'admin')
        console.log(response.data?.data?.user)
        localStorage.setItem("token", response.data?.data?.user?.token)
        if (response.data?.data?.user?.status === 'admin') {
            navigate('/landing');
        } else {
            navigate('/landing');
        }
        if (response?.status === 200) {

        // Send data to useContext
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data.data,
        });

        const alert = (
            <Alert variant="success" className="py-1">
            Login success
            </Alert>
        );
        setMessage(alert);
        }
    } catch (error) {
        const alert = (
        <Alert variant="danger" className="py-1">
            Login failed
        </Alert>
        );
        setMessage(alert);
        console.log(error);
    }
    });

return(
    <>
    <Container className="p-login">
        <img src={logo}/>
        <div className="login">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <h3 className="login-name">Login</h3>
                    {message && message}
                    <Form.Group className="mb-3 text-white"  controlId="formGroupEmail">
                        <Form.Control  
                            value={email}
                            name="email"
                            onChange={handleChange} 
                            type="email" 
                            placeholder="Email" 
                            style={{background:"#395B64",color: "#2C3333"}} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 text-white" controlId="formGroupPassword">
                        <Form.Control  
                            value={password} 
                            name="password" 
                            onChange={handleChange} 
                            type="password" 
                            placeholder="Password"  
                            style={{background:"#395B64",color: "#2C3333"}} 
                        />
                    </Form.Group>
                <Button type="submit"className="btn-login">Login</Button>
            </form>
        </div>
    </Container>
    </>
)
}
