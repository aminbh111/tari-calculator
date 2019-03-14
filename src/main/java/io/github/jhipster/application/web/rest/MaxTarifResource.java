package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.MaxTarif;
import io.github.jhipster.application.repository.MaxTarifRepository;
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
 * REST controller for managing MaxTarif.
 */
@RestController
@RequestMapping("/api")
public class MaxTarifResource {

    private final Logger log = LoggerFactory.getLogger(MaxTarifResource.class);

    private static final String ENTITY_NAME = "maxTarif";

    private final MaxTarifRepository maxTarifRepository;

    public MaxTarifResource(MaxTarifRepository maxTarifRepository) {
        this.maxTarifRepository = maxTarifRepository;
    }

    /**
     * POST  /max-tarifs : Create a new maxTarif.
     *
     * @param maxTarif the maxTarif to create
     * @return the ResponseEntity with status 201 (Created) and with body the new maxTarif, or with status 400 (Bad Request) if the maxTarif has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/max-tarifs")
    public ResponseEntity<MaxTarif> createMaxTarif(@RequestBody MaxTarif maxTarif) throws URISyntaxException {
        log.debug("REST request to save MaxTarif : {}", maxTarif);
        if (maxTarif.getId() != null) {
            throw new BadRequestAlertException("A new maxTarif cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaxTarif result = maxTarifRepository.save(maxTarif);
        return ResponseEntity.created(new URI("/api/max-tarifs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /max-tarifs : Updates an existing maxTarif.
     *
     * @param maxTarif the maxTarif to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated maxTarif,
     * or with status 400 (Bad Request) if the maxTarif is not valid,
     * or with status 500 (Internal Server Error) if the maxTarif couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/max-tarifs")
    public ResponseEntity<MaxTarif> updateMaxTarif(@RequestBody MaxTarif maxTarif) throws URISyntaxException {
        log.debug("REST request to update MaxTarif : {}", maxTarif);
        if (maxTarif.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MaxTarif result = maxTarifRepository.save(maxTarif);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, maxTarif.getId().toString()))
            .body(result);
    }

    /**
     * GET  /max-tarifs : get all the maxTarifs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of maxTarifs in body
     */
    @GetMapping("/max-tarifs")
    public List<MaxTarif> getAllMaxTarifs() {
        log.debug("REST request to get all MaxTarifs");
        return maxTarifRepository.findAll();
    }

    /**
     * GET  /max-tarifs/:id : get the "id" maxTarif.
     *
     * @param id the id of the maxTarif to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the maxTarif, or with status 404 (Not Found)
     */
    @GetMapping("/max-tarifs/{id}")
    public ResponseEntity<MaxTarif> getMaxTarif(@PathVariable Long id) {
        log.debug("REST request to get MaxTarif : {}", id);
        Optional<MaxTarif> maxTarif = maxTarifRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(maxTarif);
    }

    /**
     * DELETE  /max-tarifs/:id : delete the "id" maxTarif.
     *
     * @param id the id of the maxTarif to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/max-tarifs/{id}")
    public ResponseEntity<Void> deleteMaxTarif(@PathVariable Long id) {
        log.debug("REST request to delete MaxTarif : {}", id);
        maxTarifRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
