package com.project.online_banking_system.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Table(name = "transaction")
@Entity(name = "transaction")

public class Transaction {

	private long transaction_id;
	private String transaction_account_id;
	private String transaction_tm_id;
	private String transaction_tt_id;
	private String transaction_date;
	private String transaction_amount;
	private String transaction_description;
	
	public Transaction() {
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getTransaction_id() {
		return transaction_id;
	}

	public String getTransaction_account_id() {
		return transaction_account_id;
	}

	public void setTransaction_account_id(String transaction_account_id) {
		this.transaction_account_id = transaction_account_id;
	}

	public String getTransaction_tm_id() {
		return transaction_tm_id;
	}

	public void setTransaction_tm_id(String transaction_tm_id) {
		this.transaction_tm_id = transaction_tm_id;
	}

	public String getTransaction_tt_id() {
		return transaction_tt_id;
	}

	public void setTransaction_tt_id(String transaction_tt_id) {
		this.transaction_tt_id = transaction_tt_id;
	}

	public String getTransaction_date() {
		return transaction_date;
	}

	public void setTransaction_date(String transaction_date) {
		this.transaction_date = transaction_date;
	}

	public String getTransaction_amount() {
		return transaction_amount;
	}

	public void setTransaction_amount(String transaction_amount) {
		this.transaction_amount = transaction_amount;
	}

	public String getTransaction_description() {
		return transaction_description;
	}

	public void setTransaction_description(String transaction_description) {
		this.transaction_description = transaction_description;
	}

	public void setTransaction_id(long transaction_id) {
		this.transaction_id = transaction_id;
	}

	@Override
	public String toString() {
		return "Transaction [transaction_id=" + transaction_id + ", transaction_account_id=" + transaction_account_id
				+ ", transaction_tm_id=" + transaction_tm_id + ", transaction_tt_id=" + transaction_tt_id
				+ ", transaction_date=" + transaction_date + ", transaction_amount=" + transaction_amount
				+ ", transaction_description=" + transaction_description + "]";
	}

	public Transaction(long transaction_id, String transaction_account_id, String transaction_tm_id,
			String transaction_tt_id, String transaction_date, String transaction_amount,
			String transaction_description) {
		super();
		this.transaction_id = transaction_id;
		this.transaction_account_id = transaction_account_id;
		this.transaction_tm_id = transaction_tm_id;
		this.transaction_tt_id = transaction_tt_id;
		this.transaction_date = transaction_date;
		this.transaction_amount = transaction_amount;
		this.transaction_description = transaction_description;
	}
	
}
