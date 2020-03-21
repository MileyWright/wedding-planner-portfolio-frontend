import React from 'react';

const UpdateForm = ({ posts, handleChanges, update, updatePost }) => {

  return (
    <form onSubmit={update} className='create-post-form'>
      <input
        type='text'
        name='image'
        onChange={handleChanges}
        value={updatePost.image}
        className='create-field-container'
      />
      <input
        type='text'
        name='description'
        onChange={handleChanges}
        value={updatePost.description}
        className='create-field-container'
      />
      <input
        type='text'
        name='theme'
        onChange={handleChanges}
        value={updatePost.theme}
        className='create-field-container'
      />
      <input
        type='text'
        name='location'
        onChange={handleChanges}
        value={updatePost.location}
        className='create-field-container'
      />
      <input
        type='text'
        name='vendors'
        onChange={handleChanges}
        value={updatePost.vendors}
        className='create-field-container'
      />
      <div className='modal-button'>
        <button type="submit">Update</button>
      </div>
    </form>
  );
};

export default UpdateForm;
