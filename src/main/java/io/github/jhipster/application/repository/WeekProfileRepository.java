package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.WeekProfile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WeekProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WeekProfileRepository extends JpaRepository<WeekProfile, Long> {

}
