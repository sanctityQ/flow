package org.one.xingyun.user.domain;

import org.apache.commons.lang.StringUtils;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String userId;

  private String nickName;

  private String mobile;

  private String email;

  private String salt;

  private String password;

  private String headImgUrl = StringUtils.EMPTY;


  @Column(name = "c_time")
  @Type(type = "org.joda.time.contrib.hibernate.PersistentDateTime")
  private DateTime createTime;

  @Column(name = "m_time")
  @Type(type = "org.joda.time.contrib.hibernate.PersistentDateTime")
  private DateTime modifyTime;


  public Long getId() {
    return this.id;
  }

  @Column(name = "user_id", unique = true)
  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  @Column(name = "nick_name")
  public String getNickName() {
    return nickName;
  }

  public void setNickName(String nickName) {
    this.nickName = nickName;
  }

  @Column(name = "mobile", unique = true)
  public String getMobile() {
    return mobile;
  }

  public void setMobile(String mobile) {
    this.mobile = mobile;
  }

  @Column(name = "email", unique = true)
  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  @Column(name = "salt")
  public String getSalt() {
    return salt;
  }

  public void setSalt(String salt) {
    this.salt = salt;
  }

  @Column(name = "password")
  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Column(name = "head_img_url")
  public String getHeadImgUrl() {
    return headImgUrl;
  }

  public void setHeadImgUrl(String headImgUrl) {
    this.headImgUrl = headImgUrl;
  }

  public DateTime getCreateTime() {
    return createTime;
  }

  public void setCreateTime(DateTime createTime) {
    this.createTime = createTime;
  }


  public DateTime getModifyTime() {
    return modifyTime;
  }

  public void setModifyTime(DateTime modifyTime) {
    this.modifyTime = modifyTime;
  }
}
