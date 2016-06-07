package org.one.xingyun.user.domain;


import org.one.xingyun.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  private static final int HASH_INTERATIONS = 1024;

  private static final int SALT_SIZE = 8;

  public void register(User user, String plainPassword){

  }


  /**
   * 设定安全的密码，生成随机的salt并经过1024次 sha-1 hash
   */
  private void encryptPassword(String plainPassword) {
//    byte[] salt = Digests.generateSalt(SALT_SIZE);
//    user.setSalt(Encodes.encodeHex(salt));
//    byte[] hashPassword = Digests.sha1(plainPassword.getBytes(), salt, HASH_INTERATIONS);
//    return Encodes.encodeHex(hashPassword);
  }

  public void resetPassword(){

  }


}
