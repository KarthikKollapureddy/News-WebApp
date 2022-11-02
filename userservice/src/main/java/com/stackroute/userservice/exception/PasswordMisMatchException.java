package com.stackroute.userservice.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(code= HttpStatus.CONFLICT , reason="Password Miss Match")
public class PasswordMisMatchException extends Throwable {
}
