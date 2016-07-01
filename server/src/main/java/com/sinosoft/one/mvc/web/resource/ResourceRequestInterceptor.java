package com.sinosoft.one.mvc.web.resource;

import com.sinosoft.one.mvc.web.ControllerInterceptorAdapter;
import com.sinosoft.one.mvc.web.Invocation;
import com.sinosoft.one.mvc.web.InvocationChain;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.Resource;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import java.lang.annotation.Annotation;
import java.util.List;

import javax.servlet.ServletContext;

public class ResourceRequestInterceptor extends ControllerInterceptorAdapter
    implements ApplicationContextAware, ServletContextAware, InitializingBean {

  private ApplicationContext appContext;

  private ServletContext servletContext;

  private List<Resource> locations;

  public void setLocations(List<Resource> locations) {
    this.locations = locations;
  }

  private ResourceHttpRequestHandler requestHandler = new ResourceHttpRequestHandler();

  private String[] prefixPattern;

  @Override
  public Object before(Invocation inv) throws Exception {

    if (prefixPattern == null) {
       prefixPattern = inv.getMethod().getAnnotation(ResourceRequired.class).value();
    }

    String resourcePath = inv.getRequestPath().getUri();
    for (String prefix : prefixPattern) {
      if (resourcePath.startsWith(prefix)) {
        resourcePath = StringUtils.substringAfter(resourcePath, prefix);
        break;
      }
    }

    inv.getRequest().setAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE, resourcePath);
    return true;
  }

  protected Class<? extends Annotation> getRequiredAnnotationClass() {
    return ResourceRequired.class;
  }

  @Override
  public Object round(Invocation inv, InvocationChain chain) throws Exception {

    requestHandler.handleRequest(inv.getRequest(), inv.getResponse());
    return null;
  }

  @Override
  public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
    this.appContext = applicationContext;
  }

  @Override
  public void setServletContext(ServletContext servletContext) {
    this.servletContext = servletContext;
  }

  @Override
  public void afterPropertiesSet() throws Exception {
    requestHandler.setApplicationContext(this.appContext);
    requestHandler.setServletContext(this.servletContext);

    requestHandler.setLocations(this.locations);
    requestHandler.afterPropertiesSet();
//    ResourceHandlerRegistration registration = new ResourceHandlerRegistration(this.appContext, pathPatterns);
//    registration.addResourceLocations(locations).getRequestHandler();

  }
}
