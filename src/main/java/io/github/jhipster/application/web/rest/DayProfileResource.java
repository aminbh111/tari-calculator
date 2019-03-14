package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.DayProfile;
import io.github.jhipster.application.repository.DayProfileRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DayProfile.
 */
@RestController
@RequestMapping("/api")
public class DayProfileResource {

    private final Logger log = LoggerFactory.getLogger(DayProfileResource.class);

    private static final String ENTITY_NAME = "dayProfile";

    private final DayProfileRepository dayProfileRepository;

    public DayProfileResource(DayProfileRepository dayProfileRepository) {
        this.dayProfileRepository = dayProfileRepository;
    }

    /**
     * POST  /day-profiles : Create a new dayProfile.
     *
     * @param dayProfile the dayProfile to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dayProfile, or with status 400 (Bad Request) if the dayProfile has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/day-profiles")
    public ResponseEntity<DayProfile> createDayProfile(@RequestBody DayProfile dayProfile) throws URISyntaxException {
        log.debug("REST request to save DayProfile : {}", dayProfile);
        if (dayProfile.getId() != null) {
            throw new BadRequestAlertException("A new dayProfile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DayProfile result = dayProfileRepository.save(dayProfile);
        return ResponseEntity.created(new URI("/api/day-profiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /day-profiles : Updates an existing dayProfile.
     *
     * @param dayProfile the dayProfile to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dayProfile,
     * or with status 400 (Bad Request) if the dayProfile is not valid,
     * or with status 500 (Internal Server Error) if the dayProfile couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/day-profiles")
    public ResponseEntity<DayProfile> updateDayProfile(@RequestBody DayProfile dayProfile) throws URISyntaxException {
        log.debug("REST request to update DayProfile : {}", dayProfile);
        if (dayProfile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DayProfile result = dayProfileRepository.save(dayProfile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dayProfile.getId().toString()))
            .body(result);
    }

    /**
     * GET  /day-profiles : get all the dayProfiles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dayProfiles in body
     */
    @GetMapping("/day-profiles")
    public List<DayProfile> getAllDayProfiles() {
        log.debug("REST request to get all DayProfiles");
        return dayProfileRepository.findAll();
    }

    /**
     * GET  /day-profiles/:id : get the "id" dayProfile.
     *
     * @param id the id of the dayProfile to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dayProfile, or with status 404 (Not Found)
     */
    @GetMapping("/day-profiles/{id}")
    public ResponseEntity<DayProfile> getDayProfile(@PathVariable Long id) {
        log.debug("REST request to get DayProfile : {}", id);
        Optional<DayProfile> dayProfile = dayProfileRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dayProfile);
    }

    /**
     * DELETE  /day-profiles/:id : delete the "id" dayProfile.
     *
     * @param id the id of the dayProfile to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/day-profiles/{id}")
    public ResponseEntity<Void> deleteDayProfile(@PathVariable Long id) {
        log.debug("REST request to delete DayProfile : {}", id);
        dayProfileRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
