package com.project.online_banking_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.online_banking_system.model.State;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {

}
