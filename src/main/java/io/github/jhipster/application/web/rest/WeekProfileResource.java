package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.WeekProfile;
import io.github.jhipster.application.repository.WeekProfileRepository;
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
 * REST controller for managing WeekProfile.
 */
@RestController
@RequestMapping("/api")
public class WeekProfileResource {

    private final Logger log = LoggerFactory.getLogger(WeekProfileResource.class);

    private static final String ENTITY_NAME = "weekProfile";

    private final WeekProfileRepository weekProfileRepository;

    public WeekProfileResource(WeekProfileRepository weekProfileRepository) {
        this.weekProfileRepository = weekProfileRepository;
    }

    /**
     * POST  /week-profiles : Create a new weekProfile.
     *
     * @param weekProfile the weekProfile to create
     * @return the ResponseEntity with status 201 (Created) and with body the new weekProfile, or with status 400 (Bad Request) if the weekProfile has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/week-profiles")
    public ResponseEntity<WeekProfile> createWeekProfile(@RequestBody WeekProfile weekProfile) throws URISyntaxException {
        log.debug("REST request to save WeekProfile : {}", weekProfile);
        if (weekProfile.getId() != null) {
            throw new BadRequestAlertException("A new weekProfile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WeekProfile result = weekProfileRepository.save(weekProfile);
        return ResponseEntity.created(new URI("/api/week-profiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /week-profiles : Updates an existing weekProfile.
     *
     * @param weekProfile the weekProfile to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated weekProfile,
     * or with status 400 (Bad Request) if the weekProfile is not valid,
     * or with status 500 (Internal Server Error) if the weekProfile couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/week-profiles")
    public ResponseEntity<WeekProfile> updateWeekProfile(@RequestBody WeekProfile weekProfile) throws URISyntaxException {
        log.debug("REST request to update WeekProfile : {}", weekProfile);
        if (weekProfile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WeekProfile result = weekProfileRepository.save(weekProfile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, weekProfile.getId().toString()))
            .body(result);
    }

    /**
     * GET  /week-profiles : get all the weekProfiles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of weekProfiles in body
     */
    @GetMapping("/week-profiles")
    public List<WeekProfile> getAllWeekProfiles() {
        log.debug("REST request to get all WeekProfiles");
        return weekProfileRepository.findAll();
    }

    /**
     * GET  /week-profiles/:id : get the "id" weekProfile.
     *
     * @param id the id of the weekProfile to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the weekProfile, or with status 404 (Not Found)
     */
    @GetMapping("/week-profiles/{id}")
    public ResponseEntity<WeekProfile> getWeekProfile(@PathVariable Long id) {
        log.debug("REST request to get WeekProfile : {}", id);
        Optional<WeekProfile> weekProfile = weekProfileRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(weekProfile);
    }

    /**
     * DELETE  /week-profiles/:id : delete the "id" weekProfile.
     *
     * @param id the id of the weekProfile to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/week-profiles/{id}")
    public ResponseEntity<Void> deleteWeekProfile(@PathVariable Long id) {
        log.debug("REST request to delete WeekProfile : {}", id);
        weekProfileRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
