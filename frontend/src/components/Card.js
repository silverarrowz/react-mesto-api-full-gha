import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(card) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    );;


    function handleClick() {
        card.onClick(card); 
        console.log(card);
    }

    function handleDeleteClick() {
        card.onDeleteClick(card);
    }

    function handleLikeClick() {
        card.onLikeClick(card);
    }

    return (
        <div className="element">
            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick} />

            {isOwn && <button
                className="element__remove"
                type="button"
                aria-label="Удалить карточку"
                onClick={handleDeleteClick} />}

            <div className="element__info">
                <h2 className="element__title">
                    {card.name}
                </h2>
                <div className="element__like-group">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Поставить лайк"
                        onClick={handleLikeClick} />
                    <p className="element__like-count">
                        {card.likes.length}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;