import { Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        
        setValidated(true);
        const user = { 
            email: form.email.value, 
            password: form.password.value 
        };
        axios.post("http://localhost:4000/login", user)
        .then(res => {
            localStorage.setItem("username", res.data.user.username);
            localStorage.setItem("email", res.data.user.email);
            navigate("/profile");
        })
        .catch(err => {
            console.log("An error occured: ", err);
        })
    };

    return (
        <div id="form">
            <h2 id="formtitle">Log in to Your Account</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 5-20 characters long, contain letters and numbers,
                        and must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>
            <p id="registerlink">Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default Login;