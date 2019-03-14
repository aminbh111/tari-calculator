package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.DayProfile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DayProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayProfileRepository extends JpaRepository<DayProfile, Long> {

}
