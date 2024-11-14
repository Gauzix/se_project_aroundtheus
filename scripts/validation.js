const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
}

function showInputError(formEl, inputEl, {inputErrorClass}) {
    const errorMessageEl = formEl.querySelector(`#card-${inputEl.name}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(config.errorClass);
}

function hideInputError(formEl, inputEl, {inputErrorClass}) {
    const errorMessageEl = formEl.querySelector(`#card-${inputEl.name}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = '';
    errorMessageEl.classList.remove(config.errorClass);
}

function checkInputValidity(formEl, inputEl, configuration) {
    if(!inputEl.validity.valid) {
        return showInputError(formEl, inputEl, configuration);
    } 
    hideInputError(formEl, inputEl, configuration);
}

function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {
    let foundInvalid = false;
    inputEls.forEach(inputEl => {
        if(!inputEl.validity.valid) {
            foundInvalid = true;
        }
    });
    if (foundInvalid) {
        submitButton.classList.add(inactiveButtonClass);
        return submitButton.disabled = true;
    } 
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

function setEventListeners(formEl, configuration) {
    const {inputSelector, submitButtonSelector} = configuration;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(submitButtonSelector);

    inputEls.forEach((inputEl) => {
        inputEl.addEventListener('input', (evt) => {
            checkInputValidity(formEl, inputEl, configuration);
            toggleButtonState(inputEls, submitButton, configuration);
        });
    });
}

function enableValidation(configuration) {
    const formEls = [...document.querySelectorAll(configuration.formSelector)];
    formEls.forEach((formEl) => {
        formEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formEl, configuration)
    });

}

enableValidation(config);