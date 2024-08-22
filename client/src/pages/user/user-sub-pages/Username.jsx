import React from 'react';
import {useSelector} from 'react-redux';

// slices
// user
import {usersSelector} from '../../../features/users/users.slice'

const Username = ({_id}) => {
    // states from slices
    // user
    const users = useSelector(usersSelector);
    let requiredUser = users?.find(user => user?._id === _id);
  return (
    <>
    <span>{requiredUser?.username}</span>
    </>
  )
}

export default Username