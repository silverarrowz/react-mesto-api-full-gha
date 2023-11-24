import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlaceSubmit({ name, link })
    }

    return (
        <PopupWithForm
            name="new-card"
            title="Новое место"
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <label className="form__field">
                <input
                    onChange={handleNameChange}
                    className="form__item form__item_card_name"
                    type="text"
                    id="place"
                    name="name"
                    value={name || ''}
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                />
                <span
                    className="form__error form__error_field_place"
                    id="place-error">
                </span>
            </label>

            <label className="form__field">
                <input
                    onChange={handleLinkChange}
                    className="form__item form__item_card_about"
                    type="url"
                    id="link"
                    name="link"
                    value={link || ''}
                    placeholder="Ссылка на картинку"
                    minLength="2"
                    required
                />
                <span
                    className="form__error form__error_field_link"
                    id="link-error">
                </span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;