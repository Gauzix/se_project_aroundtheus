
class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._sumbitButtonSelector = config.sumbitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._element = formElement;
    }

    // private method to show an error
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._element.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    // private method to hide an error
    _hideInputError(inputElement) {
        const errorElement = this._element.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    };

    _checkInputValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, "Input Invalid");
        } 
        this._hideInputError(inputElement);
    };

    _toggleButtonState() {
        if(!this._hasInvalidInput) {
            this._disableSubmitButton
        } else {
            this._enableSubmitButton
        }
    };

    _disableSubmitButton() {
        this._sumbitButtonSelector.disabled = true;
        this._sumbitButtonSelector.classList.add(this._inactiveButtonClass);
    }

    _enableSubmitButton() {
        this._sumbitButtonSelector.disabled = false;
        this._sumbitButtonSelector.classList.remove(this._inactiveButtonClass);
    }

    _hasInvalidInput() {
        return this._inputSelector.array.forEach(inputEl => !inputEl.validity.valid);
    };

    _setEventListeners() {
        this._inputSelector.array.forEach(inputEl => {
            inputEl.addEventListener('input', () => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    };
}

export default FormValidator;