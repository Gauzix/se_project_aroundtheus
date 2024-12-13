export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    };

    _setEventListeners() {
        this._cardElement.querySelector(".card__like-button").addEventListener('click', () => {
            this._handleLikeIcon();
        });
        this._cardElement.querySelector(".card__delete-button").addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this._cardElement.addEventListener('click', () => {
            this._handleImageClick(this);
        });
    };

    _handleLikeIcon() {
        this._cardElement.querySelector(".card__like-button").classList.toggle('card__like-button_active');
    };

    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    };


    generateCard() {
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        this._setEventListeners();
        return this._cardElement;
    };
}