package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A MaxTarif.
 */
@Entity
@Table(name = "max_tarif")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MaxTarif implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "duration")
    private Long duration;

    @Column(name = "tarif")
    private Float tarif;

    @Column(name = "currency")
    private String currency;

    @OneToMany(mappedBy = "maxTarif")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TarifMask> tarifMasks = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDuration() {
        return duration;
    }

    public MaxTarif duration(Long duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public Float getTarif() {
        return tarif;
    }

    public MaxTarif tarif(Float tarif) {
        this.tarif = tarif;
        return this;
    }

    public void setTarif(Float tarif) {
        this.tarif = tarif;
    }

    public String getCurrency() {
        return currency;
    }

    public MaxTarif currency(String currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Set<TarifMask> getTarifMasks() {
        return tarifMasks;
    }

    public MaxTarif tarifMasks(Set<TarifMask> tarifMasks) {
        this.tarifMasks = tarifMasks;
        return this;
    }

    public MaxTarif addTarifMask(TarifMask tarifMask) {
        this.tarifMasks.add(tarifMask);
        tarifMask.setMaxTarif(this);
        return this;
    }

    public MaxTarif removeTarifMask(TarifMask tarifMask) {
        this.tarifMasks.remove(tarifMask);
        tarifMask.setMaxTarif(null);
        return this;
    }

    public void setTarifMasks(Set<TarifMask> tarifMasks) {
        this.tarifMasks = tarifMasks;
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
        MaxTarif maxTarif = (MaxTarif) o;
        if (maxTarif.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), maxTarif.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MaxTarif{" +
            "id=" + getId() +
            ", duration=" + getDuration() +
            ", tarif=" + getTarif() +
            ", currency='" + getCurrency() + "'" +
            "}";
    }
}
