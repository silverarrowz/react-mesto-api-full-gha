import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { useEffect } from "react";

function EditAvatarPopup(props) {

    const { values, handleChange, errors, resetForm, isSubmitBtnDisabled } = useFormAndValidation();

    useEffect(() => {
        resetForm();
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(values.link);
    }

    return (
        <PopupWithForm
            isSubmitBtnDisabled={isSubmitBtnDisabled}
            name="avatar-edit"
            title="Обновить аватар"
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            type="avatar">

            <input
                value={values.link || ''}
                onChange={handleChange}
                className={`form__item form__item_avatar-url ${errors.link && 'form__item_type_error'}`}
                type="url"
                id="avatar"
                name="link"
                placeholder="Ссылка на фотографию"
                required
            />
            <span
                className="form__error form__error_field_avatar"
                id="avatar-error">
                {errors.link}
            </span>
            
        </PopupWithForm>
    )
}

export default EditAvatarPopup;