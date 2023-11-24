import React from "react";

function ImagePopup(props) {
    return (
        <section className={`popup popup_type_image-preview ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__image-preview">
                <button
                    className="popup__close-btn"
                    type="button"
                    aria-label="Закрыть окно"
                    onClick={props.onClose} />
                <figure className="popup__image-block">
                    <img
                        className="popup__image"
                        src={props.card?.link}
                        alt={props.card?.name} />
                    <figcaption className="popup__image-title">
                        {props.card?.name}
                    </figcaption>
                </figure>
            </div>
        </section>
    )
}

export default ImagePopup;