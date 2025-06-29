package com.stud.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Main application class for the Acronyms Backend Service.
 * This is a Spring Boot application that provides REST APIs for managing acronyms.
 */
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.stud.server.repository")
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
}
