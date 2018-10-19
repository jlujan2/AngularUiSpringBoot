package com.example.client;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.example.model.User;

@Component
public class CallRestServer {

	/*private static void callRestService() {
		RestTemplate restTemplate = new RestTemplate();
		User user = restTemplate.getForObject("http://localhost:8081/users/1", User.class);
		System.out.println("User name is: " +user.getName());
	}

	@Override
	public void run(String... args) throws Exception {
		callRestService();
	}*/
}
