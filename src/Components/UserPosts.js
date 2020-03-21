import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './Authentication/axiosWithAuth';
import Modal from './Modal';
import UpdateForm from './UpdateForm';
import trashcan from '../Assets/trashcan.png';

const initialItem = {
  theme: '',
  location: '',
  description: '',
  image: '',
  vendors: ''
};

const UserPosts = ({ posts, match, updateUserPosts, userPosts, paramItemId }) => {
  const [editTheme, setEditTheme] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [editImg, setEditImg] = useState(false);
  const [editVendor, setEditVendor] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [updatePost, setUpdatePost] = useState(initialItem);

  const openModal = () => {
    setShowModal(true);
    console.log('modal open');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const selectedItem = userPosts.find(item => {
      console.log(item.id);
      return item.id === posts.id;
    });
    console.log(selectedItem);
    if (selectedItem) {
      setUpdatePost(selectedItem);
    }
  }, [userPosts, posts.id]);

  const handleChanges = e => {
    // e.persist();
    setUpdatePost({...updatePost, [e.target.name]: e.target.value });
    console.log('changes', { [e.target.name]: e.target.value });
  };

  const update = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/auth/user/${match.params.id}/post/${updatePost.id}`, updatePost)
      .then(res => {
        axiosWithAuth()
        .get(`/auth/user/${paramItemId}/posts`)
        .then(response => {
          setUpdatePost(response.data)
          window.location.reload()
        })
        // setEditDesc(false)
       
      })
      .catch(err => console.log('Error', err));
  };

  const remove = post => {
    axiosWithAuth()
      .delete(`/auth/user/${match.params.id}/post/${updatePost.id}`)
      .then(res => {
        updateUserPosts(userPosts.filter(item => item.id !== posts.id));
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <div className='user-posts'>
        <div className='post-info'>
          <div className='preview-img'>
            <img
              onClick={e => {
                e.stopPropagation();
                setEditImg(!editImg);
              }}
              src={posts.image}
              alt={posts.description}
            />
          </div>
          <div className='post-text'>
            <h4
              onClick={e => {
                setEditDesc(!editDesc);
              }}
            >
              {posts.description},
            </h4>
            <p
              onClick={e => {
                e.stopPropagation();
                setEditTheme(!editTheme);
              }}
            >
              <b>Theme:</b> {posts.theme},
            </p>
            <p
              onClick={e => {
                e.stopPropagation();
                setEditLocation(!editLocation);
              }}
            >
              <b>Location:</b> {posts.location},
            </p>
            <p
              onClick={e => {
                e.stopPropagation();
                setEditVendor(!editVendor);
              }}
            >
              <b>Vendors:</b> {posts.vendors}
            </p>
          </div>
        </div>
        <div className='edit-delete'>
          <Modal show={showModal} handleClose={closeModal}>
            <UpdateForm
              handleChanges={handleChanges}
              update={update}
              updateUserPosts={updateUserPosts}
              userPosts={userPosts}
              updatePost={updatePost}
              setUpdatePost={setUpdatePost}
              paramItemId={paramItemId}
            />
          </Modal>
          <p onClick={openModal}>EDIT</p>
          <img src={trashcan} onClick={e => remove()} alt='delete' />
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
