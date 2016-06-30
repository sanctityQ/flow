package org.one.xingyun.controllers;


import com.sinosoft.one.mvc.web.Invocation;
import com.sinosoft.one.mvc.web.annotation.Path;
import com.sinosoft.one.mvc.web.annotation.rest.Get;
import com.sinosoft.one.mvc.web.resource.ResourceRequired;

@Path
//@Controller
public class IndexController {

  @Get({"index",""})
//  @RequestMapping(path = "/index",method = RequestMethod.GET)
  public String index(){
//    return new ModelAndView("index");
    return "index";
  }

  @Get("/**")
  @ResourceRequired
  public String resource(Invocation inv){
    return ":continue";
  }

//  @Get
//  public String register(){
//    return "register";
//  }


}
