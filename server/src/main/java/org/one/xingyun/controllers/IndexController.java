package org.one.xingyun.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

//@Path
@Controller
public class IndexController {

//  @Get
  @RequestMapping(path = "/index",method = RequestMethod.GET)
  public String index(){
//    return new ModelAndView("index");
    return "index";
  }

//  @Get
//  public String register(){
//    return "register";
//  }


}
