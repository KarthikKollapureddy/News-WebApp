package com.stackroute.userservice.controller;





import java.util.Map;

import com.stackroute.userservice.exception.PasswordMisMatchException;
import com.stackroute.userservice.model.ChangePassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stackroute.userservice.model.User;
import com.stackroute.userservice.services.SecurityTokenGenerator;
import com.stackroute.userservice.services.UserService;



@RestController
@RequestMapping("/api/v1/userservice")
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.PUT, RequestMethod.POST})
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private SecurityTokenGenerator tokenGenerator;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		try {
			
			
			userService.saveUser(user);
			return new ResponseEntity<String>("User registered successfully", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User loginDetail) {

		try {

			if (null == loginDetail.getUserId() || null == loginDetail.getPassword()) {
				throw new Exception("User Id or Password canot be empty.");
			}
			User user = userService.findByUserIdAndPassword(loginDetail.getUserId(), loginDetail.getPassword());
			Map<String, String> map = tokenGenerator.generateToken(user);
			return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
	}
	@PutMapping("/changepassword/{userId}")
	public ResponseEntity<User> updatePassword(@RequestBody ChangePassword changepassword, @PathVariable String userId) throws PasswordMisMatchException {
		try {
			User user1 = userService.updatePassword(changepassword, userId);
			return ResponseEntity.ok(user1);
			// responseEntity = new ResponseEntity<User>(user, HttpStatus.CREATED);
		}
		catch(PasswordMisMatchException e) {
			throw new PasswordMisMatchException();
		}
		//return responseEntity;
	}
}