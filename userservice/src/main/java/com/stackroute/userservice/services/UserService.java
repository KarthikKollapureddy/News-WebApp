package com.stackroute.userservice.services;

import com.stackroute.userservice.exception.PasswordMisMatchException;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.model.ChangePassword;
import com.stackroute.userservice.model.User;

public interface UserService {

	boolean saveUser(User user) throws UserAlreadyExistsException;
	public User updatePassword(ChangePassword changepassword, String userId) throws PasswordMisMatchException;

	User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException;
}
