import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm, isSubmitBtnDisabled } = useFormAndValidation();

  useEffect(() => {
    resetForm();
    setValues(currentUser);
  }, [currentUser, props.isOpen])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      props.onUpdateUser(values);
    }
  };

  return (
    <PopupWithForm
      isSubmitBtnDisabled={isSubmitBtnDisabled}
      name="profile-edit"
      title="Редактировать профиль"
      buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>

      <label className="form__field">
        <input
          onChange={handleChange}
          className={`form__item form__item_user_name ${errors.name && 'form__item_type_error'}`}
          type="text"
          id="name"
          name="name"
          value={values.name || ''}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required />
        <span className="form__error" id="name-error">{errors.name}</span>
      </label>

      <label className="form__field">
        <input
          onChange={handleChange}
          className={`form__item form__item_user_about ${errors.about && 'form__item_type_error'}`}
          type="text"
          id="about"
          name="about"
          value={values.about || ''}
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required />
        <span className="form__error" id="about-error">{errors.about}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;