package com.stackroute.userservice.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.stackroute.userservice.model.User;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, String> {

	@Query("Select user from User user where user.userId = (?1) and user.password = (?2)")
	User validate(String userId, String password);
	public Optional<User> findByuserId(String userId);
	User findByUserIdAndPassword(String userId, String password);
}
