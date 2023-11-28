import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const { values, handleChange, errors, isValid, resetForm, isSubmitBtnDisabled } = useFormAndValidation();

    useEffect(() => {
        resetForm();
    }, [props.isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlaceSubmit(values);
    }

    return (
        <PopupWithForm
            isSubmitBtnDisabled={isSubmitBtnDisabled}
            name="new-card"
            title="Новое место"
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <label className="form__field">
                <input
                    onChange={handleChange}
                    className={`form__item form__item_card_name ${errors.name && 'form__item_type_error'}`}
                    type="text"
                    id="place"
                    name="name"
                    value={values.name || ''}
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                />
                <span
                    className="form__error form__error_field_place"
                    id="place-error">
                    {errors.name}
                </span>
            </label>

            <label className="form__field">
                <input
                    onChange={handleChange}
                    className={`form__item form__item_card_about ${errors.link && 'form__item_type_error'}`}
                    type="url"
                    id="link"
                    name="link"
                    value={values.link || ''}
                    placeholder="Ссылка на картинку"
                    minLength="2"
                    required
                />
                <span
                    className="form__error form__error_field_link"
                    id="link-error">
                    {errors.link}
                </span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;