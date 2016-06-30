package org.one.xingyun;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

//@Configurable
//@EnableWebMvc
//@ComponentScan(basePackageClasses = {WebConfig.class } )
public class WebConfig extends WebMvcConfigurerAdapter implements WebApplicationInitializer {

  @Override
  public void configureViewResolvers(ViewResolverRegistry registry) {
//    registry.viewResolver();
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**").addResourceLocations("file:../client/client/build/");
  }

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/").setViewName("index");
  }

  @Override
  public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    configurer.enable();
  }

  @Override
  public void onStartup(ServletContext container) throws ServletException {

    AnnotationConfigWebApplicationContext dispatcherContext =
        new AnnotationConfigWebApplicationContext();
    dispatcherContext.register(WebConfig.class);

    DispatcherServlet dispatcherServlet = new DispatcherServlet(dispatcherContext);
    ServletRegistration.Dynamic registration = container.addServlet("dispatcher", dispatcherServlet);
    registration.setLoadOnStartup(1);

    registration.addMapping("/");
  }
}
