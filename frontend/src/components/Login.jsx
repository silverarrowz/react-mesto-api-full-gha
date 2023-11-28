import { useState } from "react";
import * as api from "../utils/apiAuth";
import { useNavigate } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const Login = ({ handleLogin, setUserEmail, setInfoToolTipOpen, setAuthSuccess }) => {

    const { values, handleChange, errors, resetForm, isSubmitBtnDisabled, setSubmitBtnDisabled } = useFormAndValidation();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        api.authorize(values.email, values.password)
            .then((data) => {
                if (data) {
                    setUserEmail(values.email);
                    handleLogin();
                    navigate("/");
                    localStorage.setItem("jwt", data.token);
                }
            })
            .catch((err) => {
                setAuthSuccess(false);
                setInfoToolTipOpen(true);
                console.error(err);
            })
            .finally(() => {
                resetForm();
                setIsLoading(false);
            })
    }

    return (
        <div className="auth__container">
            <h2 className="popup__title auth__title">
                Вход
            </h2>

            <form
                onSubmit={handleSubmit}
                className="form auth__form"
                name="signin">

                <label className="form__field auth__form-field">
                    <input
                        onChange={handleChange}
                        value={values.email || ''}
                        className={`form__item auth__form-item ${errors.email && 'form__item_type_error'} ${errors.email && 'auth__form-item_type_error'}`}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        minLength="4"
                        required />
                    <span className="form__error form__error_field_email" id="email-error">
                        {errors.email}
                    </span>
                </label>

                <label className="form__field auth__form-field">
                    <input
                        onChange={handleChange}
                        value={values.password || ''}
                        className={`form__item auth__form-item ${errors.password && 'form__item_type_error'} ${errors.password && 'auth__form-item_type_error'}`}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Пароль"
                        minLength="2"
                        required />
                    <span className="form__error form__error_field_password" id="password-error">
                        {errors.password}
                    </span>
                </label>

                <button
                    className={`form__save-btn auth__submit-btn ${isSubmitBtnDisabled && 'form__save-btn_disabled'}`}
                    type="submit"
                    aria-label="Войти">
                    {isLoading ? 'Подождите...' : 'Войти'}
                </button>
            </form>
        </div>
    )
}

export default Login;