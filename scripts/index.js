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

// Profile Modal Elements
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileEditForm = profileEditModal.querySelector('#profile-edit-form');
const profileEditBtn = document.querySelector('#profile-edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.modal__input_type_name');
const profileDescriptionInput = document.querySelector('.modal__input_type_description');

// Card Modal Elements
const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const cardAddModal = document.querySelector('#add-card-modal');
const cardAddForm = cardAddModal.querySelector('#add-card-form');
const cardAddBtn = document.querySelector('#card-add-button');
const cardTitleInput = document.querySelector('.modal__input_type_title');
const cardUrlInput = document.querySelector('.modal__input_type_url');
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
}

function closeModal(modal){
    modal.classList.remove('modal_opened');
    document.removeEventListener("keydown", closeModalEsc);
    modal.removeEventListener("mousedown", closeOverlay);
} 

function renderCard(cardData, wrapper) {
    const cardElement = getCardElement(cardData);
    wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardTitleEl.textContent = cardData.name;

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_active');
    });
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });
    cardImageEl.addEventListener('click', () => {
        previewImage.src = cardData.link;
        previewImage.alt = cardData.name;
        previewHeading.textContent = cardData.name;
        openModal(previewImageModal);
    });

    return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit (evt){
    evt.preventDefault();
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
}

function handleAddCardSubmit (evt){
    evt.preventDefault();
    const newCard = {
        name: cardTitleInput.value,
        link: cardUrlInput.value
    }
    renderCard(newCard, cardListEl)
    evt.target.reset();
    closeModal(cardAddModal);
}

function closeModalEsc(evt) {
    if (evt.key === "Escape") {
      const modal = document.querySelector(".modal_opened");
      closeModal(modal);
    }
}

function closeOverlay(evt) {
    if (evt.target.classList.contains("modal")) {
        closeModal(evt.target);
    }
}

/* -------------------------------------------------------------------------- */
/*                              Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditBtn.addEventListener('click', () => {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal)
});
profileEditForm.addEventListener('submit', handleProfileEditSubmit);
cardAddBtn.addEventListener('click', () => openModal(cardAddModal));
cardAddForm.addEventListener('submit', handleAddCardSubmit);

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
})

/* -------------------------------------------------------------------------- */
/*                             Gallery Initializer                            */
/* -------------------------------------------------------------------------- */
initialCards.forEach((cardData) => {
    renderCard(cardData, cardListEl);
});

