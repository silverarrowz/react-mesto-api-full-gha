import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoToolTip from "./InfoToolTip";

import api from "../utils/api";
import * as auth from "../utils/apiAuth";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {

  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isAuthSuccess, setAuthSuccess] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupWithImageOpen, setIsPopupWithImageOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // Проверяем наличие токена в LS

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Запрашиваем данные пользователя и карточки

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isLoggedIn) {
      api.getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
          console.log(userData);
          setUserEmail(userData.email);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isLoggedIn) {
      api.getCardsData(token)
        .then((cards) => {
          setCards(cards.reverse());
        })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn]);

  // Регистрация и авторизация новых пользователей

  function handleRegister(email, password) {
    setIsLoading(true);
    auth.register(email, password)
      .then(res => {
        if (res) {
          setAuthSuccess(true);
          setInfoToolTipOpen(true);
          navigate('/signin', { replace: true });
        }
      })
      .catch(err => {
        setAuthSuccess(false);
        setInfoToolTipOpen(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    auth.login(email, password)
      .then(res => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem('token', res.token);
          setUserEmail(email);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        setAuthSuccess(false);
        setInfoToolTipOpen(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/signin");
  }


  // useEffect(() => {
  //   Promise.all([api.getUserInfo(), api.getCardsData()])
  //     .then(([userInfo, cardsData]) => {
  //       setCurrentUser(userInfo);
  //       setCards(cardsData);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupWithImageOpen(false);
    setInfoToolTipOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsPopupWithImageOpen(true);
  }

  function handleCardDeleteClick(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api
      .changeLikeStatus(card._id, !isLiked)
      .then((cardLiked) => {
        setCards(cards.map((c) => c._id === card._id ? cardLiked : c));
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editProfile(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api.updateAvatar(link)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header userEmail={userEmail} onSignOut={handleLogout} />

          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLikeClick={handleCardLikeClick}
                onCardDeleteClick={handleCardDeleteClick}
              />
            } />

            <Route
              path="/signin"
              element={<Login onLogin={handleLogin} isLoading={isLoading} />} />

            <Route
              path="/signup"
              element={<Register onRegister={handleRegister} isLoading={isLoading} />} />

            <Route
              path="/*"
              element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />} />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name='card-delete'
            title='Вы уверены?'
            buttonText='Да'
            isOpen={false}
            onClose={closeAllPopups}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isPopupWithImageOpen}
            onClose={closeAllPopups}
          />

          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            isAuthSuccess={isAuthSuccess}
          />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
