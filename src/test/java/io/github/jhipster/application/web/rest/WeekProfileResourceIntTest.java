package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.TarifCalculatorApp;

import io.github.jhipster.application.domain.WeekProfile;
import io.github.jhipster.application.repository.WeekProfileRepository;
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
 * Test class for the WeekProfileResource REST controller.
 *
 * @see WeekProfileResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TarifCalculatorApp.class)
public class WeekProfileResourceIntTest {

    @Autowired
    private WeekProfileRepository weekProfileRepository;

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

    private MockMvc restWeekProfileMockMvc;

    private WeekProfile weekProfile;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WeekProfileResource weekProfileResource = new WeekProfileResource(weekProfileRepository);
        this.restWeekProfileMockMvc = MockMvcBuilders.standaloneSetup(weekProfileResource)
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
    public static WeekProfile createEntity(EntityManager em) {
        WeekProfile weekProfile = new WeekProfile();
        return weekProfile;
    }

    @Before
    public void initTest() {
        weekProfile = createEntity(em);
    }

    @Test
    @Transactional
    public void createWeekProfile() throws Exception {
        int databaseSizeBeforeCreate = weekProfileRepository.findAll().size();

        // Create the WeekProfile
        restWeekProfileMockMvc.perform(post("/api/week-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weekProfile)))
            .andExpect(status().isCreated());

        // Validate the WeekProfile in the database
        List<WeekProfile> weekProfileList = weekProfileRepository.findAll();
        assertThat(weekProfileList).hasSize(databaseSizeBeforeCreate + 1);
        WeekProfile testWeekProfile = weekProfileList.get(weekProfileList.size() - 1);
    }

    @Test
    @Transactional
    public void createWeekProfileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = weekProfileRepository.findAll().size();

        // Create the WeekProfile with an existing ID
        weekProfile.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWeekProfileMockMvc.perform(post("/api/week-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weekProfile)))
            .andExpect(status().isBadRequest());

        // Validate the WeekProfile in the database
        List<WeekProfile> weekProfileList = weekProfileRepository.findAll();
        assertThat(weekProfileList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWeekProfiles() throws Exception {
        // Initialize the database
        weekProfileRepository.saveAndFlush(weekProfile);

        // Get all the weekProfileList
        restWeekProfileMockMvc.perform(get("/api/week-profiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(weekProfile.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getWeekProfile() throws Exception {
        // Initialize the database
        weekProfileRepository.saveAndFlush(weekProfile);

        // Get the weekProfile
        restWeekProfileMockMvc.perform(get("/api/week-profiles/{id}", weekProfile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(weekProfile.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingWeekProfile() throws Exception {
        // Get the weekProfile
        restWeekProfileMockMvc.perform(get("/api/week-profiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWeekProfile() throws Exception {
        // Initialize the database
        weekProfileRepository.saveAndFlush(weekProfile);

        int databaseSizeBeforeUpdate = weekProfileRepository.findAll().size();

        // Update the weekProfile
        WeekProfile updatedWeekProfile = weekProfileRepository.findById(weekProfile.getId()).get();
        // Disconnect from session so that the updates on updatedWeekProfile are not directly saved in db
        em.detach(updatedWeekProfile);

        restWeekProfileMockMvc.perform(put("/api/week-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWeekProfile)))
            .andExpect(status().isOk());

        // Validate the WeekProfile in the database
        List<WeekProfile> weekProfileList = weekProfileRepository.findAll();
        assertThat(weekProfileList).hasSize(databaseSizeBeforeUpdate);
        WeekProfile testWeekProfile = weekProfileList.get(weekProfileList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingWeekProfile() throws Exception {
        int databaseSizeBeforeUpdate = weekProfileRepository.findAll().size();

        // Create the WeekProfile

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWeekProfileMockMvc.perform(put("/api/week-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(weekProfile)))
            .andExpect(status().isBadRequest());

        // Validate the WeekProfile in the database
        List<WeekProfile> weekProfileList = weekProfileRepository.findAll();
        assertThat(weekProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWeekProfile() throws Exception {
        // Initialize the database
        weekProfileRepository.saveAndFlush(weekProfile);

        int databaseSizeBeforeDelete = weekProfileRepository.findAll().size();

        // Delete the weekProfile
        restWeekProfileMockMvc.perform(delete("/api/week-profiles/{id}", weekProfile.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WeekProfile> weekProfileList = weekProfileRepository.findAll();
        assertThat(weekProfileList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WeekProfile.class);
        WeekProfile weekProfile1 = new WeekProfile();
        weekProfile1.setId(1L);
        WeekProfile weekProfile2 = new WeekProfile();
        weekProfile2.setId(weekProfile1.getId());
        assertThat(weekProfile1).isEqualTo(weekProfile2);
        weekProfile2.setId(2L);
        assertThat(weekProfile1).isNotEqualTo(weekProfile2);
        weekProfile1.setId(null);
        assertThat(weekProfile1).isNotEqualTo(weekProfile2);
    }
}
