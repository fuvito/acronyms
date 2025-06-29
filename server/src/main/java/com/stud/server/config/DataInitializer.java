package com.stud.server.config;

import com.stud.server.model.Acronym;
import com.stud.server.repository.AcronymRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(AcronymRepository repository) {
        return args -> {
            // Only add sample data if the database is empty
            if (repository.count() == 0) {
                repository.save(new Acronym("API", "Application Programming Interface", "A set of rules that allows programs to talk to each other"));
                repository.save(new Acronym("MVC", "Model-View-Controller", "A design pattern for developing user interfaces"));
                repository.save(new Acronym("JPA", "Java Persistence API", "Java specification for accessing, persisting, and managing data"));
                repository.save(new Acronym("REST", "Representational State Transfer", "An architectural style for distributed hypermedia systems"));
                repository.save(new Acronym("SQL", "Structured Query Language", "A standard language for managing and manipulating databases"));
            }
        };
    }
}
