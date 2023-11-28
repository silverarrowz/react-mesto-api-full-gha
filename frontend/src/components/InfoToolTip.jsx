import iconSuccess from "../images/auth-success-icon.svg";
import iconError from "../images/auth-error-icon.svg";

const InfoToolTip = (props) => {
    return (
        <section className={`popup popup_type_info ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    className="popup__close-btn"
                    type="button"
                    aria-label="закрыть окно"
                    onClick={props.onClose} />

                {props.isAuthSuccess ?
                    <div className="info-tool-tip">
                        <img
                            className="info-tool-tip__icon"
                            src={iconSuccess}
                            alt="Вы успешно зарегистрировались" />

                        <h1 className="info-tool-tip__title">
                            Вы успешно зарегистрировались!
                        </h1>
                    </div>
                    :
                    <div className="info-tool-tip">
                        <img
                            className="info-tool-tip__icon"
                            src={iconError}
                            alt="Что-то пошло не так" />

                        <h1 className="info-tool-tip__title">
                            Что-то пошло не так! Попробуйте ещё раз.
                        </h1>
                    </div>
                }

            </div>
        </section>
    );
};

export default InfoToolTip;