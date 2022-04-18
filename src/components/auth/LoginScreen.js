import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    // dispatch
    const dispatch = useDispatch();

    // LOGIN ================================
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: '',
    })
    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = (e) => {
        // TODO: hacer las validaciones
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword))
    }

    // REGISTER ============================
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: '',
        rEmail: "",
        rPassword: "",
        r2Password: ""
    })
    const {rName, rEmail, rPassword, r2Password} = formRegisterValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if(rPassword !== r2Password){
            return Swal.fire('Error', 'Los Passwords deben ser iguales', 'error')
        }
        dispatch(startRegister(rName, rEmail, rPassword));
    }
 
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form autoComplete='off'
                        onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='lEmail'
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='lPassword'
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form autoComplete='off'
                        onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                onChange={handleRegisterInputChange}
                                name='rName'
                                value={rName}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                onChange={handleRegisterInputChange}
                                name='rEmail'
                                value={rEmail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                onChange={handleRegisterInputChange}
                                name='rPassword'
                                value={rPassword}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                onChange={handleRegisterInputChange}
                                name='r2Password'
                                value={r2Password}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}