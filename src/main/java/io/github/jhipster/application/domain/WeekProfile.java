package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A WeekProfile.
 */
@Entity
@Table(name = "week_profile")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WeekProfile implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private TarifMask tarifMask;

    @ManyToOne
    @JsonIgnoreProperties("weekProfiles")
    private DayProfile dayProfile;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TarifMask getTarifMask() {
        return tarifMask;
    }

    public WeekProfile tarifMask(TarifMask tarifMask) {
        this.tarifMask = tarifMask;
        return this;
    }

    public void setTarifMask(TarifMask tarifMask) {
        this.tarifMask = tarifMask;
    }

    public DayProfile getDayProfile() {
        return dayProfile;
    }

    public WeekProfile dayProfile(DayProfile dayProfile) {
        this.dayProfile = dayProfile;
        return this;
    }

    public void setDayProfile(DayProfile dayProfile) {
        this.dayProfile = dayProfile;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WeekProfile weekProfile = (WeekProfile) o;
        if (weekProfile.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), weekProfile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WeekProfile{" +
            "id=" + getId() +
            "}";
    }
}