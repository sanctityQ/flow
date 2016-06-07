package org.one.xingyun.controllers;


import com.sinosoft.one.mvc.web.annotation.Path;
import com.sinosoft.one.mvc.web.annotation.rest.Get;

@Path
public class IndexController {

  @Get
  public String index(){
    return "login";
  }

  @Get
  public String register(){
    return "register";
  }

  public String login(){
    return "index";
  }

}
