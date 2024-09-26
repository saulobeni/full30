
import Form from "@/components/Form";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const [showError, setShowError] = useState({
        emailError: false,
        passwordError: false
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleError = () => {
        setShowError({
            emailError: false,
            passwordError: false
        });

        if (!email) {
            setShowError(previousValue => ({ ...previousValue, emailError: true }));
        }
        if (!password) {
            setShowError(previousValue => ({ ...previousValue, passwordError: true }));
        }
    }

    const handleChange = (setState, value) => {
        setState(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleError();

        if (!email || !password) {
            return;
        }

        try {
            const response = await fetch('http://localhost:3333/user/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userId', data.userId);

                navigate('../Admin/dashboard') 
                
            } else {
                console.error('Erro ao fazer login:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="m-auto w-25 mt-5">
            <div className="mb-3">
                <label htmlFor="" className="form-label">Email</label>
                <input type="email"
                    className="form-control"
                    value={email}
                    onBlur={() => handleError()}
                    onChange={event => handleChange(setEmail, event.target.value)} />
                <div className={showError.emailError ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                    Campo obrigatorio
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Senha</label>
                <input type="password"
                    className="form-control"
                    onBlur={() => handleError()}
                    value={password}
                    onChange={event => handleChange(setPassword, event.target.value)} />
                <div className={showError.passwordError ? 'invalid-feedback d-block' : 'invalid-feedback'}>
                    Campo obrigatorio
                </div>
            </div>
            <div className="mb-3">
                <button className="btn btn-primary w-100">Entrar</button>
            </div>
        </Form>
    );
}