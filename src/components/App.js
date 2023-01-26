import React                  from 'react';
import Header                 from './Header';
import Main                   from './Main';
import Register               from './Register';
import Login                  from './Login';
import Footer                 from './Footer';
import AddPlacePopup          from './AddPlacePopup';
import ImagePopup             from './ImagePopup';
import EditProfilePopup       from './EditProfilePopup';
import EditAvatarPopup        from './EditAvatarPopup';
import ConfirmationPopup      from './ConfirmationPopup';
import ProtectedRouteElement  from './ProtectedRoute';
import { api }                from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Routes,
         Route,
         Link,
         useNavigate }        from 'react-router-dom';
import { auth } from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen,  setEditProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen,     setAddPlacePopupState   ] = React.useState(false);
  const [isEditAvatarPopupOpen,   setEditAvatarPopupState ] = React.useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
  const [isImagePopupOpen,        setImagePopupState      ] = React.useState(false);
  const [cardForRemove,           setCardForRemove        ] = React.useState({});
  const [selectedCard,            setSelectedCard         ] = React.useState({name: '', link: ''});
  const [currentUser,             setCurrentUser          ] = React.useState({});
  const [cards,                   setCards                ] = React.useState([]);
  const [userDataIsLoading,       setUserDataIsLoading    ] = React.useState(false);
  const [avatarIsLoading,         setAvatarIsLoading      ] = React.useState(false);
  const [cardDataIsLoading,       setCardDataIsLoading    ] = React.useState(false);
  const [cardRemoveIsLoading,     setCardRemoveIsLoading  ] = React.useState(false);
  const [loggedIn,                setLoggedIn             ] = React.useState(false);
  const [userEmail,               setUserEmail            ] = React.useState('');
  const navigate                                            = useNavigate();

  // Обработчик входа/выхода на сайте, проверка токена

  function handleLogin(email) {
    setLoggedIn(true);
    // setUserEmail(email);
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }


  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/', {replace: true});
          }
        })
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  // Получение данных с сервера о пользователе и карточках

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => {
        console.log(`Ошибка при получении данных: ${error}`);
      });
  }, []);

  // Обработчик обновления данных о пользователе

  function handleUpdateUser(userData) {
    setUserDataIsLoading(true);
    api.changeUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при изменении данных о пользователе: ${error}`);
      })
      .finally(() => {
        setUserDataIsLoading(false);
      })
  }

  // Обработчик обновления аватара пользователя

  function handleUpdateAvatar(userData) {
    setAvatarIsLoading(true);
    api.changeUserAvatar(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при изменении аватара: ${error}`);
      })
      .finally(() => {
        setAvatarIsLoading(false);
      })
  }

  // Обработчик клика по аватару

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  // Обработчик клика по кнопке редактирования профиля
  
  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  // Обработчики добавления новой карточки
  
  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function handleAddPlaceSubmit(cardData) {
    setCardDataIsLoading(true);
    api.createCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при создании новой карточки: ${error}`);
      })
      .finally(() => {
        setCardDataIsLoading(false);
      })
  }

  // Обработчик клика по карточке

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupState(true);
  }

  // Обработчики удаления карточки

  function handleDeleteClick(card) {
    setConfirmationPopupOpen(true);
    setCardForRemove(card);
  }

  function handleCardDelete(card) {
    setCardRemoveIsLoading(true);
    const isOwn = card.owner._id === currentUser._id;

    if (isOwn) {
      api.deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
          closeAllPopups();
        })
        .catch((error) => {
          console.log(`Ошибка при удалении карточки: ${error}`);
        })
        .finally(() => {
          setCardRemoveIsLoading(false);
        })
    }
  }

  // Обработчик, отвечающий за установку/снятие лайка

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    
    if (!isLiked) {
      api.likeCard(card._id, card.owner)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((error) => {
          console.log(`Ошибка при постановке лайка: ${error}`);
        })
    } else {
      api.dislikeCard(card._id, card.owner)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((error) => {
          console.log(`Ошибка при удалении лайка: ${error}`);
        })
    }
  }

  // Закрытие модальных окон

  function closeAllPopups() {
      setAddPlacePopupState(false);
      setEditProfilePopupState(false);
      setEditAvatarPopupState(false);
      setConfirmationPopupOpen(false);
      setImagePopupState(false);
      setSelectedCard({name: '', link: ''});
  }

  // Обработчик закрытия модальных окон по клику на оверлей

  function handlePopupOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  // Обработчик закрытия модальных окон по нажатию Escape

  React.useEffect(() => {
    function handleEscClick(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isEditProfilePopupOpen  ||
        isAddPlacePopupOpen     ||
        isEditAvatarPopupOpen   ||
        isConfirmationPopupOpen ||
        isImagePopupOpen) {
          document.addEventListener('keydown', handleEscClick);
        }     
      return () => {
        document.removeEventListener('keydown', handleEscClick);
      }
  }, [isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isEditAvatarPopupOpen,
      isConfirmationPopupOpen,
      isImagePopupOpen]);

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <Header>
          <Routes>
            <Route path="/" element={
              <>
                <p className='header__email'>{userEmail}</p>
                <button className="header__link header__link_logged-in"
                        onClick={handleLogout}
                >Выйти</button>
              </>
            } />
            <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
            <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
          </Routes>
        </Header>

        <Routes>
          <Route path="/" 
                 element={<ProtectedRouteElement 
                   element={Main}                                
                   loggedIn={loggedIn}                              
                   onEditProfile={handleEditProfileClick}
                   onAddPlace={handleAddPlaceClick}
                   onEditAvatar={handleEditAvatarClick}
                   onCardClick={handleCardClick}
                   onDeleteClick={handleDeleteClick}
                   onCardLike={handleCardLike}
                   cards={cards} />}
          />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        </Routes>

        {loggedIn && <Footer />}

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
                          isLoading={userDataIsLoading}
                          onOverlayClick={handlePopupOverlayClick}
        />

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       isLoading={cardDataIsLoading}
                       onOverlayClick={handlePopupOverlayClick}
        />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
                         isLoading={avatarIsLoading}
                         onOverlayClick={handlePopupOverlayClick}
        />

        <ConfirmationPopup isOpen={isConfirmationPopupOpen}
                           onClose={closeAllPopups}
                           onConfirmDelete={handleCardDelete}
                           currentCard={cardForRemove}
                           isLoading={cardRemoveIsLoading}
                           onOverlayClick={handlePopupOverlayClick}
        />

        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups}
                    onOverlayClick={handlePopupOverlayClick}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
