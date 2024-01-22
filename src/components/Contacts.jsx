import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import axios from 'axios';
import { userRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [isEditDisplayName, setIsEditDisplayName] = useState(false);
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUsername(currentUser.displayName);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const editDisplayName = () => {
    setIsEditDisplayName(true);
  };

  const setDisplayName = async (e) => {
    const displayName = e.target.value;

    if (!displayName) {
      toast.error(`User's name must not be empty`, toastOptions);
      setIsEditDisplayName(false);
      return;
    }

    const { data } = await axios.put(
      `${userRoute}/${currentUser._id}/setDisplayName`,
      {
        displayName,
      }
    );

    setCurrentUsername(data.displayName);
    setIsEditDisplayName(false);
  };

  return (
    <>
      {currentUserImage && currentUsername && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Chatopia</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.displayName}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <Link to="/setAvatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </Link>
            </div>
            <div className="username">
              {isEditDisplayName === true ? (
                <input
                  type="text"
                  name="displayName"
                  id=""
                  autoFocus={true}
                  onBlur={(e) => setDisplayName(e)}
                />
              ) : (
                <h2 onDoubleClick={editDisplayName}>{currentUsername}</h2>
              )}
            </div>
          </div>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      margin-left: 1.5rem;
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      width: 80%;
      h2 {
        color: white;
        font-size: 1.5rem;
      }
      input {
        background-color: transparent;
        border: 0.1rem solid transparent;
        color: white;
        border-radius: 0.4rem;
        padding: 0.5rem;
        font-size: 1.5rem;
        width: 90%
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }

  .Toastify {
    position: absolute;
  }
`;
