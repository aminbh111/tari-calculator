package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.TarifMask;
import io.github.jhipster.application.repository.TarifMaskRepository;
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
 * REST controller for managing TarifMask.
 */
@RestController
@RequestMapping("/api")
public class TarifMaskResource {

    private final Logger log = LoggerFactory.getLogger(TarifMaskResource.class);

    private static final String ENTITY_NAME = "tarifMask";

    private final TarifMaskRepository tarifMaskRepository;

    public TarifMaskResource(TarifMaskRepository tarifMaskRepository) {
        this.tarifMaskRepository = tarifMaskRepository;
    }

    /**
     * POST  /tarif-masks : Create a new tarifMask.
     *
     * @param tarifMask the tarifMask to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tarifMask, or with status 400 (Bad Request) if the tarifMask has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tarif-masks")
    public ResponseEntity<TarifMask> createTarifMask(@RequestBody TarifMask tarifMask) throws URISyntaxException {
        log.debug("REST request to save TarifMask : {}", tarifMask);
        if (tarifMask.getId() != null) {
            throw new BadRequestAlertException("A new tarifMask cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TarifMask result = tarifMaskRepository.save(tarifMask);
        return ResponseEntity.created(new URI("/api/tarif-masks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tarif-masks : Updates an existing tarifMask.
     *
     * @param tarifMask the tarifMask to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tarifMask,
     * or with status 400 (Bad Request) if the tarifMask is not valid,
     * or with status 500 (Internal Server Error) if the tarifMask couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tarif-masks")
    public ResponseEntity<TarifMask> updateTarifMask(@RequestBody TarifMask tarifMask) throws URISyntaxException {
        log.debug("REST request to update TarifMask : {}", tarifMask);
        if (tarifMask.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TarifMask result = tarifMaskRepository.save(tarifMask);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tarifMask.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tarif-masks : get all the tarifMasks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tarifMasks in body
     */
    @GetMapping("/tarif-masks")
    public List<TarifMask> getAllTarifMasks() {
        log.debug("REST request to get all TarifMasks");
        return tarifMaskRepository.findAll();
    }

    /**
     * GET  /tarif-masks/:id : get the "id" tarifMask.
     *
     * @param id the id of the tarifMask to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tarifMask, or with status 404 (Not Found)
     */
    @GetMapping("/tarif-masks/{id}")
    public ResponseEntity<TarifMask> getTarifMask(@PathVariable Long id) {
        log.debug("REST request to get TarifMask : {}", id);
        Optional<TarifMask> tarifMask = tarifMaskRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tarifMask);
    }

    /**
     * DELETE  /tarif-masks/:id : delete the "id" tarifMask.
     *
     * @param id the id of the tarifMask to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tarif-masks/{id}")
    public ResponseEntity<Void> deleteTarifMask(@PathVariable Long id) {
        log.debug("REST request to delete TarifMask : {}", id);
        tarifMaskRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
