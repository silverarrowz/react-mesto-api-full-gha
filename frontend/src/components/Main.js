import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__personal">
          <button
            className="profile__edit-avatar-btn"
            onClick={props.onEditAvatar}>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар" />
          </button>

          <div className="profile__info">
            <div className="profile__info-group">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-btn"
                type="button"
                aria-label="Редактировать профиль"
                onClick={props.onEditProfile} />
            </div>
            <p className="profile__about">
              {currentUser.about}
            </p>
          </div>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace} />
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card 
          key={card._id} 
          {...card}
          onClick={props.onCardClick}
          onLikeClick={props.onCardLikeClick}
          onDeleteClick={props.onCardDeleteClick}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;