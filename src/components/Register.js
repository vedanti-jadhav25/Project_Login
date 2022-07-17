import { Button, Form, Alert } from 'react-bootstrap';
import { Link, } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
    const [registered, setRegistered] = useState(false);
    const [validated, setValidated] = useState();
    const [valid, setValid] = useState(true);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        if (/^\w{5,20}$/.test(form.password.value)) {
            setValid(true);
            setValidated(true);
            const user = {
                username: form.username.value,
                email: form.email.value,
                password: form.password.value
            };
            axios.post("http://localhost:4000/register", user)
                .then(res => {
                    console.log(res);
                    setRegistered(true);
                    localStorage.setItem("username", res.data.user.username);
                    localStorage.setItem("email", res.data.user.email);
                })
                .catch(err => {
                    console.log("An error occured: ", err.response);
                })
        } else {
            setValid(false);
        }
    };

    return (
        <div id="form">
            <h2 id="formtitle">Create Your Account</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
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
                        isInvalid={!valid}
                        required
                    />
                    {
                        valid ? ""
                             :
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid password
                            </Form.Control.Feedback>
                    }
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 5-20 characters long, contain letters and numbers,
                        and must not contain spaces, or emojis.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            <p id="loginlink">Already have an account? <Link to="/">Log In</Link></p>

            <Alert variant="success" show={registered}>
                <Alert.Heading>Registration Successful!</Alert.Heading>
                <p>
                    You can go to your profile <Alert.Link href="/profile">here</Alert.Link>
                </p>
            </Alert>
        </div>
    );
}

export default Register;