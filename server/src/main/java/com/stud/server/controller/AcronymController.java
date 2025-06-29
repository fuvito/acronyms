package com.stud.server.controller;

import com.stud.server.model.Acronym;
import com.stud.server.service.AcronymService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/acronyms")
public class AcronymController {

    private final AcronymService acronymService;

    @Autowired
    public AcronymController(AcronymService acronymService) {
        this.acronymService = acronymService;
    }

    @GetMapping
    public List<Acronym> getAllAcronyms() {
        return acronymService.getAllAcronyms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Acronym> getAcronymById(@PathVariable Long id) {
        return acronymService.getAcronymById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search/acronym")
    public List<Acronym> searchByAcronym(@RequestParam String q) {
        return acronymService.searchByAcronym(q);
    }

    @GetMapping("/search/definition")
    public List<Acronym> searchByDefinition(@RequestParam String q) {
        return acronymService.searchByDefinition(q);
    }

    @PostMapping
    public Acronym createAcronym(@RequestBody Acronym acronym) {
        return acronymService.createAcronym(acronym);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Acronym> updateAcronym(@PathVariable Long id, @RequestBody Acronym acronymDetails) {
        return ResponseEntity.ok(acronymService.updateAcronym(id, acronymDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAcronym(@PathVariable Long id) {
        acronymService.deleteAcronym(id);
        return ResponseEntity.noContent().build();
    }
}
