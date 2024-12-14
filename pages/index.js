import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards =[
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    }
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

// Validation Activation
const defaultFormConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
}
//Forms
const editFormModalWindow = document.querySelector('#profile-edit-form');
const cardFormModalWindow = document.querySelector('#add-card-form');
// Two instaces of FormValidator
const editFormValidtor = new FormValidator(defaultFormConfig, editFormModalWindow);
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormModalWindow);

editFormValidtor.enableValidation();
cardFormValidator.enableValidation();

// Profile Modal Elements
const profileEditModal = document.querySelector('#profile-edit-modal'); 
const profileEditBtn = document.querySelector('#profile-edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.modal__input_type_name');
const profileDescriptionInput = document.querySelector('.modal__input_type_description');

// Card Modal Elements
const cardListEl = document.querySelector('.cards__list');
const cardAddModal = document.querySelector('#add-card-modal'); 
const cardAddBtn = document.querySelector('#card-add-button');
const previewImageModal = document.querySelector('#preview-image-modal');
const previewImage = document.querySelector('.modal__preview-image');
const previewHeading = previewImageModal.querySelector('.modal__preview-heading');

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function openModal(modal){
    modal.classList.add('modal_opened');
    document.addEventListener("keydown", closeModalEsc);
    modal.addEventListener("mousedown", closeOverlay);
};

function closeModal(modal){
    modal.classList.remove('modal_opened');
    document.removeEventListener("keydown", closeModalEsc);
    modal.removeEventListener("mousedown", closeOverlay);
}; 

function renderCard(cardData, wrapper) {
    const cardElement = new Card(cardData, "#card-template", handleImageClick);
    wrapper.prepend(cardElement.generateCard());
};

function handleImageClick(){
    openModal(previewImageModal);
    previewHeading.textContent = this._name;
    previewImage.src = this._link;
    previewImage.alt = this._name;
};

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function closeModalEsc(evt) {
    if (evt.key === "Escape") {
      const modal = document.querySelector(".modal_opened");
      closeModal(modal);
    }
};

function closeOverlay(evt) {
    if (evt.target.classList.contains("modal")) {
        closeModal(evt.target);
    }
};

/* -------------------------------------------------------------------------- */
/*                              Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditBtn.addEventListener('click', () => {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal)
});
cardAddBtn.addEventListener('click', () => openModal(cardAddModal));

const modals = document.querySelectorAll('.modal');
modals.forEach((modal) => {
    modal.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('modal_opened')) {
            closeModal(modal);
        }
        if (evt.target.classList.contains('modal__close')) {
          closeModal(modal);
        }
    })
});

/* -------------------------------------------------------------------------- */
/*                             Gallery Initializer                            */
/* -------------------------------------------------------------------------- */
initialCards.forEach((cardData) => {
    renderCard(cardData, cardListEl);
});

