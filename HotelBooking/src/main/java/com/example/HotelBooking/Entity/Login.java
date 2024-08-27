package com.example.HotelBooking.Entity;
import jakarta.persistence.*;

@Entity
@Table(name="login")
public class Login {
  @Id
  @Column(name="login_id" ,length = 45)
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int loginid;
  @Column (name="login_name",length =255)
  private String loginname;
  @Column (name ="email",length =255)
  private String email;
  @Column(name="password" ,length = 255)
  private String password;

  public Login(int loginid, String loginname, String email, String password) {
    this.loginid = loginid;
    this.loginname = loginname;
    this.email = email;
    this.password = password;
  }

  public Login() {
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
    return "Login{" +
            "loginid=" + loginid +
            ", loginname='" + loginname + '\'' +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            '}';
  }
}
