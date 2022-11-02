package com.stackroute.userservice.services;

import java.util.Optional;

import com.stackroute.userservice.exception.PasswordMisMatchException;
import com.stackroute.userservice.model.ChangePassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;




@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;


	@Override
	public boolean saveUser(User user) throws UserAlreadyExistsException {
		Optional<User> existingUser = userRepo.findById(user.getUserId());
		if (existingUser.isPresent()) {
			throw new UserAlreadyExistsException("User with id already exists");
		}
		userRepo.save(user);
		return true;
	}

	@Override
	public User findByUserIdAndPassword(String userId, String password) throws UserNotFoundException {
		User user = userRepo.findByUserIdAndPassword(userId, password);
		if (null == user) {
			throw new UserNotFoundException("UserId and Password mismatch");
		}
		return user;
	}
	@Override
	public User updatePassword(ChangePassword changepassword, String userId) throws PasswordMisMatchException {
		Optional<User> user1 = userRepo.findByuserId(userId);
		User user2 = user1.get();
		//Optional<User> user3 = userRepository.findByUsername();
		if (user2.getPassword().equals(changepassword.getOldpassword())) {
			user2.setPassword(changepassword.getNewpassword());
			// User user2 = user1.get();
			//user2.setEmail(user.getEmail());
			// user2.setUsername(user.getUsername());
			return userRepo.save(user2);
		}
		throw new PasswordMisMatchException();
	}

}

