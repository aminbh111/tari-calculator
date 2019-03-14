package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.TarifCalculatorApp;

import io.github.jhipster.application.domain.MaxTarif;
import io.github.jhipster.application.repository.MaxTarifRepository;
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
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MaxTarifResource REST controller.
 *
 * @see MaxTarifResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TarifCalculatorApp.class)
public class MaxTarifResourceIntTest {

    private static final Long DEFAULT_DURATION = 1L;
    private static final Long UPDATED_DURATION = 2L;

    private static final Float DEFAULT_TARIF = 1F;
    private static final Float UPDATED_TARIF = 2F;

    private static final String DEFAULT_CURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY = "BBBBBBBBBB";

    @Autowired
    private MaxTarifRepository maxTarifRepository;

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

    private MockMvc restMaxTarifMockMvc;

    private MaxTarif maxTarif;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaxTarifResource maxTarifResource = new MaxTarifResource(maxTarifRepository);
        this.restMaxTarifMockMvc = MockMvcBuilders.standaloneSetup(maxTarifResource)
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
    public static MaxTarif createEntity(EntityManager em) {
        MaxTarif maxTarif = new MaxTarif()
            .duration(DEFAULT_DURATION)
            .tarif(DEFAULT_TARIF)
            .currency(DEFAULT_CURRENCY);
        return maxTarif;
    }

    @Before
    public void initTest() {
        maxTarif = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaxTarif() throws Exception {
        int databaseSizeBeforeCreate = maxTarifRepository.findAll().size();

        // Create the MaxTarif
        restMaxTarifMockMvc.perform(post("/api/max-tarifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maxTarif)))
            .andExpect(status().isCreated());

        // Validate the MaxTarif in the database
        List<MaxTarif> maxTarifList = maxTarifRepository.findAll();
        assertThat(maxTarifList).hasSize(databaseSizeBeforeCreate + 1);
        MaxTarif testMaxTarif = maxTarifList.get(maxTarifList.size() - 1);
        assertThat(testMaxTarif.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testMaxTarif.getTarif()).isEqualTo(DEFAULT_TARIF);
        assertThat(testMaxTarif.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
    }

    @Test
    @Transactional
    public void createMaxTarifWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = maxTarifRepository.findAll().size();

        // Create the MaxTarif with an existing ID
        maxTarif.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaxTarifMockMvc.perform(post("/api/max-tarifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maxTarif)))
            .andExpect(status().isBadRequest());

        // Validate the MaxTarif in the database
        List<MaxTarif> maxTarifList = maxTarifRepository.findAll();
        assertThat(maxTarifList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMaxTarifs() throws Exception {
        // Initialize the database
        maxTarifRepository.saveAndFlush(maxTarif);

        // Get all the maxTarifList
        restMaxTarifMockMvc.perform(get("/api/max-tarifs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(maxTarif.getId().intValue())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.intValue())))
            .andExpect(jsonPath("$.[*].tarif").value(hasItem(DEFAULT_TARIF.doubleValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())));
    }
    
    @Test
    @Transactional
    public void getMaxTarif() throws Exception {
        // Initialize the database
        maxTarifRepository.saveAndFlush(maxTarif);

        // Get the maxTarif
        restMaxTarifMockMvc.perform(get("/api/max-tarifs/{id}", maxTarif.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(maxTarif.getId().intValue()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION.intValue()))
            .andExpect(jsonPath("$.tarif").value(DEFAULT_TARIF.doubleValue()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMaxTarif() throws Exception {
        // Get the maxTarif
        restMaxTarifMockMvc.perform(get("/api/max-tarifs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaxTarif() throws Exception {
        // Initialize the database
        maxTarifRepository.saveAndFlush(maxTarif);

        int databaseSizeBeforeUpdate = maxTarifRepository.findAll().size();

        // Update the maxTarif
        MaxTarif updatedMaxTarif = maxTarifRepository.findById(maxTarif.getId()).get();
        // Disconnect from session so that the updates on updatedMaxTarif are not directly saved in db
        em.detach(updatedMaxTarif);
        updatedMaxTarif
            .duration(UPDATED_DURATION)
            .tarif(UPDATED_TARIF)
            .currency(UPDATED_CURRENCY);

        restMaxTarifMockMvc.perform(put("/api/max-tarifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMaxTarif)))
            .andExpect(status().isOk());

        // Validate the MaxTarif in the database
        List<MaxTarif> maxTarifList = maxTarifRepository.findAll();
        assertThat(maxTarifList).hasSize(databaseSizeBeforeUpdate);
        MaxTarif testMaxTarif = maxTarifList.get(maxTarifList.size() - 1);
        assertThat(testMaxTarif.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testMaxTarif.getTarif()).isEqualTo(UPDATED_TARIF);
        assertThat(testMaxTarif.getCurrency()).isEqualTo(UPDATED_CURRENCY);
    }

    @Test
    @Transactional
    public void updateNonExistingMaxTarif() throws Exception {
        int databaseSizeBeforeUpdate = maxTarifRepository.findAll().size();

        // Create the MaxTarif

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaxTarifMockMvc.perform(put("/api/max-tarifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maxTarif)))
            .andExpect(status().isBadRequest());

        // Validate the MaxTarif in the database
        List<MaxTarif> maxTarifList = maxTarifRepository.findAll();
        assertThat(maxTarifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMaxTarif() throws Exception {
        // Initialize the database
        maxTarifRepository.saveAndFlush(maxTarif);

        int databaseSizeBeforeDelete = maxTarifRepository.findAll().size();

        // Delete the maxTarif
        restMaxTarifMockMvc.perform(delete("/api/max-tarifs/{id}", maxTarif.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MaxTarif> maxTarifList = maxTarifRepository.findAll();
        assertThat(maxTarifList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaxTarif.class);
        MaxTarif maxTarif1 = new MaxTarif();
        maxTarif1.setId(1L);
        MaxTarif maxTarif2 = new MaxTarif();
        maxTarif2.setId(maxTarif1.getId());
        assertThat(maxTarif1).isEqualTo(maxTarif2);
        maxTarif2.setId(2L);
        assertThat(maxTarif1).isNotEqualTo(maxTarif2);
        maxTarif1.setId(null);
        assertThat(maxTarif1).isNotEqualTo(maxTarif2);
    }
}
