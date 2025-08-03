package com.stud.server.service;

import com.stud.server.model.Acronym;
import com.stud.server.repository.AcronymRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AcronymServiceTest {

    @Mock
    private AcronymRepository acronymRepository;

    @InjectMocks
    private AcronymService acronymService;

    private Acronym testAcronym;
    private final Long TEST_ID = 1L;
    private final String TEST_ACRONYM = "API";
    private final String TEST_DEFINITION = "Application Programming Interface";
    private final String TEST_DESCRIPTION = "A set of rules for building and interacting with software applications";

    @BeforeEach
    void setUp() {
        testAcronym = new Acronym();
        testAcronym.setId(TEST_ID);
        testAcronym.setAcronym(TEST_ACRONYM);
        testAcronym.setDefinition(TEST_DEFINITION);
        testAcronym.setDescription(TEST_DESCRIPTION);
    }

    @Test
    void getAllAcronyms_ShouldReturnAllAcronyms() {
        // Arrange
        Acronym anotherAcronym = new Acronym("REST", "Representational State Transfer", "An architectural style for distributed systems");
        when(acronymRepository.findAll()).thenReturn(Arrays.asList(testAcronym, anotherAcronym));

        // Act
        List<Acronym> result = acronymService.getAllAcronyms();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(acronymRepository, times(1)).findAll();
    }

    @Test
    void getAcronymById_WithValidId_ShouldReturnAcronym() {
        // Arrange
        when(acronymRepository.findById(TEST_ID)).thenReturn(Optional.of(testAcronym));

        // Act
        Optional<Acronym> result = acronymService.getAcronymById(TEST_ID);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(TEST_ACRONYM, result.get().getAcronym());
        verify(acronymRepository, times(1)).findById(TEST_ID);
    }

    @Test
    void getAcronymById_WithInvalidId_ShouldReturnEmpty() {
        // Arrange
        when(acronymRepository.findById(anyLong())).thenReturn(Optional.empty());

        // Act
        Optional<Acronym> result = acronymService.getAcronymById(999L);

        // Assert
        assertFalse(result.isPresent());
        verify(acronymRepository, times(1)).findById(999L);
    }

    @Test
    void searchByAcronym_ShouldReturnMatchingAcronyms() {
        // Arrange
        String searchTerm = "API";
        when(acronymRepository.findByAcronymContainingIgnoreCase(searchTerm))
                .thenReturn(List.of(testAcronym));

        // Act
        List<Acronym> result = acronymService.searchByAcronym(searchTerm);

        // Assert
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals(TEST_ACRONYM, result.get(0).getAcronym());
        verify(acronymRepository, times(1)).findByAcronymContainingIgnoreCase(searchTerm);
    }

    @Test
    void searchByDefinition_ShouldReturnMatchingAcronyms() {
        // Arrange
        String searchTerm = "Application";
        when(acronymRepository.findByDefinitionContainingIgnoreCase(searchTerm))
                .thenReturn(List.of(testAcronym));

        // Act
        List<Acronym> result = acronymService.searchByDefinition(searchTerm);

        // Assert
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertTrue(result.get(0).getDefinition().contains("Application"));
        verify(acronymRepository, times(1)).findByDefinitionContainingIgnoreCase(searchTerm);
    }

    @Test
    void createAcronym_ShouldSaveAndReturnAcronym() {
        // Arrange
        when(acronymRepository.save(any(Acronym.class))).thenReturn(testAcronym);

        // Act
        Acronym result = acronymService.createAcronym(testAcronym);

        // Assert
        assertNotNull(result);
        assertEquals(TEST_ACRONYM, result.getAcronym());
        verify(acronymRepository, times(1)).save(testAcronym);
    }

    @Test
    void updateAcronym_WithExistingId_ShouldUpdateAndReturnAcronym() {
        // Arrange
        Acronym updatedAcronym = new Acronym("APIv2", "Updated Definition", "Updated Description");
        when(acronymRepository.findById(TEST_ID)).thenReturn(Optional.of(testAcronym));
        when(acronymRepository.save(any(Acronym.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Acronym result = acronymService.updateAcronym(TEST_ID, updatedAcronym);

        // Assert
        assertNotNull(result);
        assertEquals(updatedAcronym.getAcronym(), result.getAcronym());
        assertEquals(updatedAcronym.getDefinition(), result.getDefinition());
        assertEquals(updatedAcronym.getDescription(), result.getDescription());
        verify(acronymRepository, times(1)).findById(TEST_ID);
        verify(acronymRepository, times(1)).save(any(Acronym.class));
    }

    @Test
    void updateAcronym_WithNonExistingId_ShouldCreateAndReturnNewAcronym() {
        // Arrange
        Long newId = 2L;
        Acronym newAcronym = new Acronym("NEW", "New Acronym", "New Description");
        when(acronymRepository.findById(newId)).thenReturn(Optional.empty());
        when(acronymRepository.save(any(Acronym.class))).thenAnswer(invocation -> {
            Acronym a = invocation.getArgument(0);
            a.setId(newId);
            return a;
        });

        // Act
        Acronym result = acronymService.updateAcronym(newId, newAcronym);

        // Assert
        assertNotNull(result);
        assertEquals(newId, result.getId());
        assertEquals(newAcronym.getAcronym(), result.getAcronym());
        verify(acronymRepository, times(1)).findById(newId);
        verify(acronymRepository, times(1)).save(any(Acronym.class));
    }

    @Test
    void deleteAcronym_ShouldInvokeRepositoryDelete() {
        // Arrange - no need to set up anything for void methods that don't return anything
        
        // Act
        acronymService.deleteAcronym(TEST_ID);
        
        // Assert
        verify(acronymRepository, times(1)).deleteById(TEST_ID);
    }
}
