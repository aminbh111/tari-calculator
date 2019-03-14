package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.MaxTarif;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MaxTarif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaxTarifRepository extends JpaRepository<MaxTarif, Long> {

}
