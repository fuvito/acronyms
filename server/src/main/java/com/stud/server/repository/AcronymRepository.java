package com.stud.server.repository;

import com.stud.server.model.Acronym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcronymRepository extends JpaRepository<Acronym, Long> {
    List<Acronym> findByAcronymContainingIgnoreCase(String acronym);
    List<Acronym> findByDefinitionContainingIgnoreCase(String definition);
}
