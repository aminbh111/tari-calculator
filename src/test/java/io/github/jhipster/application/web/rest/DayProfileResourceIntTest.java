package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.TarifCalculatorApp;

import io.github.jhipster.application.domain.DayProfile;
import io.github.jhipster.application.repository.DayProfileRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.sameInstant;
import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.jhipster.application.domain.enumeration.WeekDay;
/**
 * Test class for the DayProfileResource REST controller.
 *
 * @see DayProfileResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TarifCalculatorApp.class)
public class DayProfileResourceIntTest {

    private static final WeekDay DEFAULT_WEEKDAY = WeekDay.Sunday;
    private static final WeekDay UPDATED_WEEKDAY = WeekDay.Monday;

    private static final ZonedDateTime DEFAULT_FROM_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FROM_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TO_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TO_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private DayProfileRepository dayProfileRepository;

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

    private MockMvc restDayProfileMockMvc;

    private DayProfile dayProfile;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DayProfileResource dayProfileResource = new DayProfileResource(dayProfileRepository);
        this.restDayProfileMockMvc = MockMvcBuilders.standaloneSetup(dayProfileResource)
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
    public static DayProfile createEntity(EntityManager em) {
        DayProfile dayProfile = new DayProfile()
            .weekday(DEFAULT_WEEKDAY)
            .fromTime(DEFAULT_FROM_TIME)
            .toTime(DEFAULT_TO_TIME);
        return dayProfile;
    }

    @Before
    public void initTest() {
        dayProfile = createEntity(em);
    }

    @Test
    @Transactional
    public void createDayProfile() throws Exception {
        int databaseSizeBeforeCreate = dayProfileRepository.findAll().size();

        // Create the DayProfile
        restDayProfileMockMvc.perform(post("/api/day-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayProfile)))
            .andExpect(status().isCreated());

        // Validate the DayProfile in the database
        List<DayProfile> dayProfileList = dayProfileRepository.findAll();
        assertThat(dayProfileList).hasSize(databaseSizeBeforeCreate + 1);
        DayProfile testDayProfile = dayProfileList.get(dayProfileList.size() - 1);
        assertThat(testDayProfile.getWeekday()).isEqualTo(DEFAULT_WEEKDAY);
        assertThat(testDayProfile.getFromTime()).isEqualTo(DEFAULT_FROM_TIME);
        assertThat(testDayProfile.getToTime()).isEqualTo(DEFAULT_TO_TIME);
    }

    @Test
    @Transactional
    public void createDayProfileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dayProfileRepository.findAll().size();

        // Create the DayProfile with an existing ID
        dayProfile.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayProfileMockMvc.perform(post("/api/day-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayProfile)))
            .andExpect(status().isBadRequest());

        // Validate the DayProfile in the database
        List<DayProfile> dayProfileList = dayProfileRepository.findAll();
        assertThat(dayProfileList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDayProfiles() throws Exception {
        // Initialize the database
        dayProfileRepository.saveAndFlush(dayProfile);

        // Get all the dayProfileList
        restDayProfileMockMvc.perform(get("/api/day-profiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayProfile.getId().intValue())))
            .andExpect(jsonPath("$.[*].weekday").value(hasItem(DEFAULT_WEEKDAY.toString())))
            .andExpect(jsonPath("$.[*].fromTime").value(hasItem(sameInstant(DEFAULT_FROM_TIME))))
            .andExpect(jsonPath("$.[*].toTime").value(hasItem(sameInstant(DEFAULT_TO_TIME))));
    }
    
    @Test
    @Transactional
    public void getDayProfile() throws Exception {
        // Initialize the database
        dayProfileRepository.saveAndFlush(dayProfile);

        // Get the dayProfile
        restDayProfileMockMvc.perform(get("/api/day-profiles/{id}", dayProfile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dayProfile.getId().intValue()))
            .andExpect(jsonPath("$.weekday").value(DEFAULT_WEEKDAY.toString()))
            .andExpect(jsonPath("$.fromTime").value(sameInstant(DEFAULT_FROM_TIME)))
            .andExpect(jsonPath("$.toTime").value(sameInstant(DEFAULT_TO_TIME)));
    }

    @Test
    @Transactional
    public void getNonExistingDayProfile() throws Exception {
        // Get the dayProfile
        restDayProfileMockMvc.perform(get("/api/day-profiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDayProfile() throws Exception {
        // Initialize the database
        dayProfileRepository.saveAndFlush(dayProfile);

        int databaseSizeBeforeUpdate = dayProfileRepository.findAll().size();

        // Update the dayProfile
        DayProfile updatedDayProfile = dayProfileRepository.findById(dayProfile.getId()).get();
        // Disconnect from session so that the updates on updatedDayProfile are not directly saved in db
        em.detach(updatedDayProfile);
        updatedDayProfile
            .weekday(UPDATED_WEEKDAY)
            .fromTime(UPDATED_FROM_TIME)
            .toTime(UPDATED_TO_TIME);

        restDayProfileMockMvc.perform(put("/api/day-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDayProfile)))
            .andExpect(status().isOk());

        // Validate the DayProfile in the database
        List<DayProfile> dayProfileList = dayProfileRepository.findAll();
        assertThat(dayProfileList).hasSize(databaseSizeBeforeUpdate);
        DayProfile testDayProfile = dayProfileList.get(dayProfileList.size() - 1);
        assertThat(testDayProfile.getWeekday()).isEqualTo(UPDATED_WEEKDAY);
        assertThat(testDayProfile.getFromTime()).isEqualTo(UPDATED_FROM_TIME);
        assertThat(testDayProfile.getToTime()).isEqualTo(UPDATED_TO_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingDayProfile() throws Exception {
        int databaseSizeBeforeUpdate = dayProfileRepository.findAll().size();

        // Create the DayProfile

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayProfileMockMvc.perform(put("/api/day-profiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayProfile)))
            .andExpect(status().isBadRequest());

        // Validate the DayProfile in the database
        List<DayProfile> dayProfileList = dayProfileRepository.findAll();
        assertThat(dayProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDayProfile() throws Exception {
        // Initialize the database
        dayProfileRepository.saveAndFlush(dayProfile);

        int databaseSizeBeforeDelete = dayProfileRepository.findAll().size();

        // Delete the dayProfile
        restDayProfileMockMvc.perform(delete("/api/day-profiles/{id}", dayProfile.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DayProfile> dayProfileList = dayProfileRepository.findAll();
        assertThat(dayProfileList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayProfile.class);
        DayProfile dayProfile1 = new DayProfile();
        dayProfile1.setId(1L);
        DayProfile dayProfile2 = new DayProfile();
        dayProfile2.setId(dayProfile1.getId());
        assertThat(dayProfile1).isEqualTo(dayProfile2);
        dayProfile2.setId(2L);
        assertThat(dayProfile1).isNotEqualTo(dayProfile2);
        dayProfile1.setId(null);
        assertThat(dayProfile1).isNotEqualTo(dayProfile2);
    }
}
