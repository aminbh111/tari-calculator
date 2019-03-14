package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.WeekDay;

/**
 * A DayProfile.
 */
@Entity
@Table(name = "day_profile")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DayProfile implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "weekday")
    private WeekDay weekday;

    @Column(name = "from_time")
    private ZonedDateTime fromTime;

    @Column(name = "to_time")
    private ZonedDateTime toTime;

    @OneToMany(mappedBy = "dayProfile")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WeekProfile> weekProfiles = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WeekDay getWeekday() {
        return weekday;
    }

    public DayProfile weekday(WeekDay weekday) {
        this.weekday = weekday;
        return this;
    }

    public void setWeekday(WeekDay weekday) {
        this.weekday = weekday;
    }

    public ZonedDateTime getFromTime() {
        return fromTime;
    }

    public DayProfile fromTime(ZonedDateTime fromTime) {
        this.fromTime = fromTime;
        return this;
    }

    public void setFromTime(ZonedDateTime fromTime) {
        this.fromTime = fromTime;
    }

    public ZonedDateTime getToTime() {
        return toTime;
    }

    public DayProfile toTime(ZonedDateTime toTime) {
        this.toTime = toTime;
        return this;
    }

    public void setToTime(ZonedDateTime toTime) {
        this.toTime = toTime;
    }

    public Set<WeekProfile> getWeekProfiles() {
        return weekProfiles;
    }

    public DayProfile weekProfiles(Set<WeekProfile> weekProfiles) {
        this.weekProfiles = weekProfiles;
        return this;
    }

    public DayProfile addWeekProfile(WeekProfile weekProfile) {
        this.weekProfiles.add(weekProfile);
        weekProfile.setDayProfile(this);
        return this;
    }

    public DayProfile removeWeekProfile(WeekProfile weekProfile) {
        this.weekProfiles.remove(weekProfile);
        weekProfile.setDayProfile(null);
        return this;
    }

    public void setWeekProfiles(Set<WeekProfile> weekProfiles) {
        this.weekProfiles = weekProfiles;
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
        DayProfile dayProfile = (DayProfile) o;
        if (dayProfile.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dayProfile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DayProfile{" +
            "id=" + getId() +
            ", weekday='" + getWeekday() + "'" +
            ", fromTime='" + getFromTime() + "'" +
            ", toTime='" + getToTime() + "'" +
            "}";
    }
}
