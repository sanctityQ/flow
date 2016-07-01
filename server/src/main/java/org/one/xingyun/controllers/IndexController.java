package org.one.xingyun.controllers;


import com.sinosoft.one.mvc.web.Invocation;
import com.sinosoft.one.mvc.web.annotation.Param;
import com.sinosoft.one.mvc.web.annotation.Path;
import com.sinosoft.one.mvc.web.annotation.rest.Get;
import com.sinosoft.one.mvc.web.annotation.rest.Post;
import com.sinosoft.one.mvc.web.instruction.reply.Reply;
import com.sinosoft.one.mvc.web.instruction.reply.Replys;
import com.sinosoft.one.mvc.web.instruction.reply.transport.Json;
import com.sinosoft.one.mvc.web.resource.ResourceRequired;

import java.util.HashMap;

@Path
public class IndexController {

  @Get({"index",""})
  public String index(){
    return "index";
  }

  @Get("/**")
  @ResourceRequired
  public void resource(Invocation inv){
  }

  @Get("/aaa/bbb")
  @Post("/aaa/bbb")
  public Reply register(@Param("context") String context){

    return Replys.with(new HashMap<>()).as(Json.class);
  }


}
