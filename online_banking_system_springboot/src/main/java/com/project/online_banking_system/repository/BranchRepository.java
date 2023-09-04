package com.project.online_banking_system.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.online_banking_system.model.Branch;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {
	
}
