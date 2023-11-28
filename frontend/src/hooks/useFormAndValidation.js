import { useState, useCallback } from 'react';

export function useFormAndValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [isSubmitBtnDisabled, setSubmitBtnDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        
        const isInputValid = e.target.checkValidity();
        setIsValid(isInputValid);
        setSubmitBtnDisabled(!isInputValid);
    };

    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
        setSubmitBtnDisabled(true);
    }, [setValues, setErrors, setIsValid]);

    return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, isSubmitBtnDisabled, setSubmitBtnDisabled };
}