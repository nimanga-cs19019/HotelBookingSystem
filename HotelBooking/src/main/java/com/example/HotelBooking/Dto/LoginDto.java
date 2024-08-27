package com.example.HotelBooking.Dto;



public class LoginDto {
    private int loginid;
    private String loginname;
    private String email;
    private String password;

    public LoginDto(int loginid, String loginname, String email, String password) {
        this.loginid = loginid;
        this.loginname = loginname;
        this.email = email;
        this.password = password;
    }
    public LoginDto() {
    }
    public int getLoginid() {
        return loginid;
    }

    public void setLoginid(int loginid) {
        this.loginid = loginid;
    }

    public String getLoginname() {
        return loginname;
    }

    public void setLoginname(String loginname) {
        this.loginname = loginname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "LoginDto{" +
                "loginid=" + loginid +
                ", loginname='" + loginname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
