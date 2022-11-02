package com.stackroute.userservice.model;

public class ChangePassword {
    String oldpassword;
    String newpassword;
    public String getOldpassword() {
        return oldpassword;
    }
    public void setOldpassword(String oldpassword) {
        this.oldpassword = oldpassword;
    }
    public String getNewpassword() {
        return newpassword;
    }
    public void setNewpassword(String newpassword) {
        this.newpassword = newpassword;
    }
    public ChangePassword() {
        super();

    }
    public ChangePassword( String oldpassword, String newpassword) {
        super();

        this.oldpassword = oldpassword;
        this.newpassword = newpassword;
    }
}
