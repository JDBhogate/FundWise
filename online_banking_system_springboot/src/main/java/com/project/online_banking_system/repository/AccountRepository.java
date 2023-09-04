package com.project.online_banking_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.online_banking_system.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	@Query(value = "SELECT SUM(transaction_amount) as total from transaction WHERE transaction_account_id = ?1 AND transaction_tt_id = ?2", nativeQuery = true)
	public String getSumBalance(String account_id, String tt_id);
	
}
