package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.TarifCalculatorApp;

import io.github.jhipster.application.domain.TarifMask;
import io.github.jhipster.application.repository.TarifMaskRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TarifMaskResource REST controller.
 *
 * @see TarifMaskResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TarifCalculatorApp.class)
public class TarifMaskResourceIntTest {

    private static final LocalDate DEFAULT_VALID_FROM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALID_FROM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_VALID_TO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_VALID_TO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TarifMaskRepository tarifMaskRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTarifMaskMockMvc;

    private TarifMask tarifMask;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TarifMaskResource tarifMaskResource = new TarifMaskResource(tarifMaskRepository);
        this.restTarifMaskMockMvc = MockMvcBuilders.standaloneSetup(tarifMaskResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TarifMask createEntity(EntityManager em) {
        TarifMask tarifMask = new TarifMask()
            .validFrom(DEFAULT_VALID_FROM)
            .validTo(DEFAULT_VALID_TO);
        return tarifMask;
    }

    @Before
    public void initTest() {
        tarifMask = createEntity(em);
    }

    @Test
    @Transactional
    public void createTarifMask() throws Exception {
        int databaseSizeBeforeCreate = tarifMaskRepository.findAll().size();

        // Create the TarifMask
        restTarifMaskMockMvc.perform(post("/api/tarif-masks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarifMask)))
            .andExpect(status().isCreated());

        // Validate the TarifMask in the database
        List<TarifMask> tarifMaskList = tarifMaskRepository.findAll();
        assertThat(tarifMaskList).hasSize(databaseSizeBeforeCreate + 1);
        TarifMask testTarifMask = tarifMaskList.get(tarifMaskList.size() - 1);
        assertThat(testTarifMask.getValidFrom()).isEqualTo(DEFAULT_VALID_FROM);
        assertThat(testTarifMask.getValidTo()).isEqualTo(DEFAULT_VALID_TO);
    }

    @Test
    @Transactional
    public void createTarifMaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tarifMaskRepository.findAll().size();

        // Create the TarifMask with an existing ID
        tarifMask.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTarifMaskMockMvc.perform(post("/api/tarif-masks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarifMask)))
            .andExpect(status().isBadRequest());

        // Validate the TarifMask in the database
        List<TarifMask> tarifMaskList = tarifMaskRepository.findAll();
        assertThat(tarifMaskList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTarifMasks() throws Exception {
        // Initialize the database
        tarifMaskRepository.saveAndFlush(tarifMask);

        // Get all the tarifMaskList
        restTarifMaskMockMvc.perform(get("/api/tarif-masks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarifMask.getId().intValue())))
            .andExpect(jsonPath("$.[*].validFrom").value(hasItem(DEFAULT_VALID_FROM.toString())))
            .andExpect(jsonPath("$.[*].validTo").value(hasItem(DEFAULT_VALID_TO.toString())));
    }
    
    @Test
    @Transactional
    public void getTarifMask() throws Exception {
        // Initialize the database
        tarifMaskRepository.saveAndFlush(tarifMask);

        // Get the tarifMask
        restTarifMaskMockMvc.perform(get("/api/tarif-masks/{id}", tarifMask.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tarifMask.getId().intValue()))
            .andExpect(jsonPath("$.validFrom").value(DEFAULT_VALID_FROM.toString()))
            .andExpect(jsonPath("$.validTo").value(DEFAULT_VALID_TO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTarifMask() throws Exception {
        // Get the tarifMask
        restTarifMaskMockMvc.perform(get("/api/tarif-masks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTarifMask() throws Exception {
        // Initialize the database
        tarifMaskRepository.saveAndFlush(tarifMask);

        int databaseSizeBeforeUpdate = tarifMaskRepository.findAll().size();

        // Update the tarifMask
        TarifMask updatedTarifMask = tarifMaskRepository.findById(tarifMask.getId()).get();
        // Disconnect from session so that the updates on updatedTarifMask are not directly saved in db
        em.detach(updatedTarifMask);
        updatedTarifMask
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO);

        restTarifMaskMockMvc.perform(put("/api/tarif-masks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTarifMask)))
            .andExpect(status().isOk());

        // Validate the TarifMask in the database
        List<TarifMask> tarifMaskList = tarifMaskRepository.findAll();
        assertThat(tarifMaskList).hasSize(databaseSizeBeforeUpdate);
        TarifMask testTarifMask = tarifMaskList.get(tarifMaskList.size() - 1);
        assertThat(testTarifMask.getValidFrom()).isEqualTo(UPDATED_VALID_FROM);
        assertThat(testTarifMask.getValidTo()).isEqualTo(UPDATED_VALID_TO);
    }

    @Test
    @Transactional
    public void updateNonExistingTarifMask() throws Exception {
        int databaseSizeBeforeUpdate = tarifMaskRepository.findAll().size();

        // Create the TarifMask

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarifMaskMockMvc.perform(put("/api/tarif-masks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarifMask)))
            .andExpect(status().isBadRequest());

        // Validate the TarifMask in the database
        List<TarifMask> tarifMaskList = tarifMaskRepository.findAll();
        assertThat(tarifMaskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTarifMask() throws Exception {
        // Initialize the database
        tarifMaskRepository.saveAndFlush(tarifMask);

        int databaseSizeBeforeDelete = tarifMaskRepository.findAll().size();

        // Delete the tarifMask
        restTarifMaskMockMvc.perform(delete("/api/tarif-masks/{id}", tarifMask.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TarifMask> tarifMaskList = tarifMaskRepository.findAll();
        assertThat(tarifMaskList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TarifMask.class);
        TarifMask tarifMask1 = new TarifMask();
        tarifMask1.setId(1L);
        TarifMask tarifMask2 = new TarifMask();
        tarifMask2.setId(tarifMask1.getId());
        assertThat(tarifMask1).isEqualTo(tarifMask2);
        tarifMask2.setId(2L);
        assertThat(tarifMask1).isNotEqualTo(tarifMask2);
        tarifMask1.setId(null);
        assertThat(tarifMask1).isNotEqualTo(tarifMask2);
    }
}
