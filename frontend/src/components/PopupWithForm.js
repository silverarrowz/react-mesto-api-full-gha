import React from "react";

function PopupWithForm(props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button
                    className="popup__close-btn"
                    type="button"
                    aria-label="закрыть окно"
                    onClick={props.onClose} />

                <h2 className="popup__title">{props.title}</h2>

                <form
                    className={`form form_type_${props.name}`}
                    name={props.name}
                    onSubmit={props.onSubmit}
                    noValidate>
                    {props.children}
                    <button
                        className="form__save-btn"
                        type="submit"
                        name="popupBtn"
                        aria-label={props.buttonText}>
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;