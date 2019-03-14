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
 * A Step.
 */
@Entity
@Table(name = "step")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Step implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_order")
    private Long order;

    @Column(name = "duration")
    private Long duration;

    @Column(name = "tarif")
    private Float tarif;

    @Column(name = "currency")
    private String currency;

    @Column(name = "step_repeater")
    private Long stepRepeater;

    @Column(name = "once")
    private Boolean once;

    @OneToMany(mappedBy = "step")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TarifMask> tarifMasks = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrder() {
        return order;
    }

    public Step order(Long order) {
        this.order = order;
        return this;
    }

    public void setOrder(Long order) {
        this.order = order;
    }

    public Long getDuration() {
        return duration;
    }

    public Step duration(Long duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public Float getTarif() {
        return tarif;
    }

    public Step tarif(Float tarif) {
        this.tarif = tarif;
        return this;
    }

    public void setTarif(Float tarif) {
        this.tarif = tarif;
    }

    public String getCurrency() {
        return currency;
    }

    public Step currency(String currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Long getStepRepeater() {
        return stepRepeater;
    }

    public Step stepRepeater(Long stepRepeater) {
        this.stepRepeater = stepRepeater;
        return this;
    }

    public void setStepRepeater(Long stepRepeater) {
        this.stepRepeater = stepRepeater;
    }

    public Boolean isOnce() {
        return once;
    }

    public Step once(Boolean once) {
        this.once = once;
        return this;
    }

    public void setOnce(Boolean once) {
        this.once = once;
    }

    public Set<TarifMask> getTarifMasks() {
        return tarifMasks;
    }

    public Step tarifMasks(Set<TarifMask> tarifMasks) {
        this.tarifMasks = tarifMasks;
        return this;
    }

    public Step addTarifMask(TarifMask tarifMask) {
        this.tarifMasks.add(tarifMask);
        tarifMask.setStep(this);
        return this;
    }

    public Step removeTarifMask(TarifMask tarifMask) {
        this.tarifMasks.remove(tarifMask);
        tarifMask.setStep(null);
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
        Step step = (Step) o;
        if (step.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), step.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Step{" +
            "id=" + getId() +
            ", order=" + getOrder() +
            ", duration=" + getDuration() +
            ", tarif=" + getTarif() +
            ", currency='" + getCurrency() + "'" +
            ", stepRepeater=" + getStepRepeater() +
            ", once='" + isOnce() + "'" +
            "}";
    }
}
