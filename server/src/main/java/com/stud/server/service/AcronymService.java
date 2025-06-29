package com.stud.server.service;

import com.stud.server.model.Acronym;
import com.stud.server.repository.AcronymRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AcronymService {

    private final AcronymRepository acronymRepository;

    @Autowired
    public AcronymService(AcronymRepository acronymRepository) {
        this.acronymRepository = acronymRepository;
    }

    public List<Acronym> getAllAcronyms() {
        return acronymRepository.findAll();
    }

    public Optional<Acronym> getAcronymById(Long id) {
        return acronymRepository.findById(id);
    }

    public List<Acronym> searchByAcronym(String searchTerm) {
        return acronymRepository.findByAcronymContainingIgnoreCase(searchTerm);
    }

    public List<Acronym> searchByDefinition(String searchTerm) {
        return acronymRepository.findByDefinitionContainingIgnoreCase(searchTerm);
    }

    public Acronym createAcronym(Acronym acronym) {
        return acronymRepository.save(acronym);
    }

    public Acronym updateAcronym(Long id, Acronym acronymDetails) {
        return acronymRepository.findById(id)
                .map(acronym -> {
                    acronym.setAcronym(acronymDetails.getAcronym());
                    acronym.setDefinition(acronymDetails.getDefinition());
                    acronym.setDescription(acronymDetails.getDescription());
                    return acronymRepository.save(acronym);
                })
                .orElseGet(() -> {
                    acronymDetails.setId(id);
                    return acronymRepository.save(acronymDetails);
                });
    }

    public void deleteAcronym(Long id) {
        acronymRepository.deleteById(id);
    }
}
