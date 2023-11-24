import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(inputRef.current.value);
    }

    return (
        <PopupWithForm
            name="avatar-edit"
            title="Обновить аватар"
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                className="form__item form__item_avatar-url"
                type="url"
                id="avatar"
                name="link"
                placeholder="Ссылка на фотографию"
                required
            />
            <span
                className="form__error form__error_field_avatar"
                id="avatar-error">
            </span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;