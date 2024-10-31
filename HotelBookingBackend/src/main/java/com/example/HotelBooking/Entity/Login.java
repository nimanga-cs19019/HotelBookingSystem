package com.example.HotelBooking.Entity;
import jakarta.persistence.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name="login")
public class Login {
  @Id
  @Column(name="login_id")
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private int loginid;
  @Column (name="login_name",length =255)
  private String loginname;
  @Column (unique = true,name ="email",length =255)
  private String email;
  @Column(name="password" ,length = 255)
  private String password;
  private String resetPasswordToken;
  private Instant tokenCreationTime;
  private String customer_id;

  // One-to-Many relationship with BookingRoom
  public Login() {
  }

  public int getLoginid() {
    return loginid;
  }

  public Login(int loginid, String loginname, String email, String password, String resetPasswordToken, Instant tokenCreationTime, String customer_id) {
    this.loginid = loginid;
    this.loginname = loginname;
    this.email = email;
    this.password = password;
    this.resetPasswordToken = resetPasswordToken;
    this.tokenCreationTime = tokenCreationTime;
    this.customer_id = customer_id;
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

  public String getResetPasswordToken() {
    return resetPasswordToken;
  }

  public void setResetPasswordToken(String resetPasswordToken) {
    this.resetPasswordToken = resetPasswordToken;
  }

  public Instant getTokenCreationTime() {
    return tokenCreationTime;
  }

  public void setTokenCreationTime(Instant tokenCreationTime) {
    this.tokenCreationTime = tokenCreationTime;
  }

  public String getCustomer_id() {
    return customer_id;
  }
  public void setCustomer_id(String customer_id) {
    this.customer_id = customer_id;
  }

  @Override
  public String toString() {
    return "Login{" +
            "loginid=" + loginid +
            ", loginname='" + loginname + '\'' +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", resetPasswordToken='" + resetPasswordToken + '\'' +
            ", tokenCreationTime=" + tokenCreationTime +
            ", customer_id='" + customer_id + '\'' +
            '}';
  }
}

