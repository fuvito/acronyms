package com.stud.server.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stud.server.model.Acronym;
import com.stud.server.service.AcronymService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class AcronymControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AcronymService acronymService;

    @InjectMocks
    private AcronymController acronymController;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private Acronym testAcronym;
    private final Long TEST_ID = 1L;
    private final String TEST_ACRONYM = "API";
    private final String TEST_DEFINITION = "Application Programming Interface";
    private final String TEST_DESCRIPTION = "A set of rules for building and interacting with software applications";

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(acronymController).build();
        
        testAcronym = new Acronym();
        testAcronym.setId(TEST_ID);
        testAcronym.setAcronym(TEST_ACRONYM);
        testAcronym.setDefinition(TEST_DEFINITION);
        testAcronym.setDescription(TEST_DESCRIPTION);
    }

    @Test
    void getAllAcronyms_ShouldReturnAllAcronyms() throws Exception {
        // Arrange
        List<Acronym> acronyms = Arrays.asList(testAcronym);
        when(acronymService.getAllAcronyms()).thenReturn(acronyms);

        // Act & Assert
        mockMvc.perform(get("/api/acronyms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].acronym", is(TEST_ACRONYM)));
    }

    @Test
    void getAcronymById_WithValidId_ShouldReturnAcronym() throws Exception {
        // Arrange
        when(acronymService.getAcronymById(TEST_ID)).thenReturn(Optional.of(testAcronym));

        // Act & Assert
        mockMvc.perform(get("/api/acronyms/{id}", TEST_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(TEST_ID.intValue())))
                .andExpect(jsonPath("$.acronym", is(TEST_ACRONYM)));
    }

    @Test
    void getAcronymById_WithInvalidId_ShouldReturnNotFound() throws Exception {
        // Arrange
        when(acronymService.getAcronymById(anyLong())).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/acronyms/{id}", 999L))
                .andExpect(status().isNotFound());
    }

    @Test
    void searchByAcronym_ShouldReturnMatchingAcronyms() throws Exception {
        // Arrange
        List<Acronym> acronyms = Arrays.asList(testAcronym);
        when(acronymService.searchByAcronym(anyString())).thenReturn(acronyms);

        // Act & Assert
        mockMvc.perform(get("/api/acronyms/search/acronym")
                        .param("q", "API"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].acronym", is(TEST_ACRONYM)));
    }

    @Test
    void searchByDefinition_ShouldReturnMatchingAcronyms() throws Exception {
        // Arrange
        List<Acronym> acronyms = Arrays.asList(testAcronym);
        when(acronymService.searchByDefinition(anyString())).thenReturn(acronyms);

        // Act & Assert
        mockMvc.perform(get("/api/acronyms/search/definition")
                        .param("q", "Application"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].definition", containsString("Application")));
    }

    @Test
    void createAcronym_ShouldReturnCreatedAcronym() throws Exception {
        // Arrange
        when(acronymService.createAcronym(any(Acronym.class))).thenReturn(testAcronym);

        // Act & Assert
        mockMvc.perform(post("/api/acronyms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testAcronym)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(TEST_ID.intValue())))
                .andExpect(jsonPath("$.acronym", is(TEST_ACRONYM)));
    }

    @Test
    void updateAcronym_ShouldReturnUpdatedAcronym() throws Exception {
        // Arrange
        Acronym updatedAcronym = new Acronym("APIv2", "Updated Definition", "Updated Description");
        updatedAcronym.setId(TEST_ID);
        when(acronymService.updateAcronym(eq(TEST_ID), any(Acronym.class))).thenReturn(updatedAcronym);

        // Act & Assert
        mockMvc.perform(put("/api/acronyms/{id}", TEST_ID)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedAcronym)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(TEST_ID.intValue())))
                .andExpect(jsonPath("$.acronym", is("APIv2")));
    }

    @Test
    void deleteAcronym_ShouldReturnNoContent() throws Exception {
        // Arrange
        doNothing().when(acronymService).deleteAcronym(TEST_ID);

        // Act & Assert
        mockMvc.perform(delete("/api/acronyms/{id}", TEST_ID))
                .andExpect(status().isNoContent());

        // Verify the service method was called
        verify(acronymService, times(1)).deleteAcronym(TEST_ID);
    }

    @Test
    void createAcronym_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        // Arrange - Create an invalid Acronym (missing required fields)
        Acronym invalidAcronym = new Acronym();

        // Act & Assert
        mockMvc.perform(post("/api/acronyms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidAcronym)))
                .andExpect(status().isBadRequest());
    }
}
