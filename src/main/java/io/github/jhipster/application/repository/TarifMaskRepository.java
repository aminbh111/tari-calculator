package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TarifMask;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TarifMask entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TarifMaskRepository extends JpaRepository<TarifMask, Long> {

}
