package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@SpringBootApplication
@ComponentScan({"com.example"})
public class DemoRc2Application extends WebSecurityConfigurerAdapter{
	
	public static void main(String[] args) {
		SpringApplication.run(DemoRc2Application.class, args);
	}
	
	
}
