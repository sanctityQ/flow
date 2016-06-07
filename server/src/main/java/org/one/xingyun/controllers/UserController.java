package org.one.xingyun.controllers;

import com.sinosoft.one.mvc.web.annotation.Param;
import com.sinosoft.one.mvc.web.annotation.Path;
import com.sinosoft.one.mvc.web.annotation.rest.Post;

import org.one.xingyun.user.domain.User;
import org.one.xingyun.user.domain.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

@Path("/user")
public class UserController {

  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  @Autowired
  private UserService userService;

  @Post("register")
  public String register(User user,@Param("plainPassword") String plainPassword){
    logger.debug(user.getMobile());
    userService.register(user,plainPassword);
    return "register";
  }

}
