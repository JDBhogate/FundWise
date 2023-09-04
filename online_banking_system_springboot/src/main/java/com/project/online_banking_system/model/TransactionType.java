package com.project.online_banking_system.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "transaction_type")
@Entity(name = "transaction_type")

public class TransactionType {

	private long tt_id;
	private String tt_name;
	private String tt_description;
	
	public TransactionType() {
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getTt_id() {
		return tt_id;
	}

	public void setTt_id(long tt_id) {
		this.tt_id = tt_id;
	}

	public String getTt_name() {
		return tt_name;
	}

	public void setTt_name(String tt_name) {
		this.tt_name = tt_name;
	}

	public String getTt_description() {
		return tt_description;
	}

	public void setTt_description(String tt_description) {
		this.tt_description = tt_description;
	}

	@Override
	public String toString() {
		return "TransactionType [tt_id=" + tt_id + ", tt_name=" + tt_name + ", tt_description=" + tt_description + "]";
	}

	public TransactionType(long tt_id, String tt_name, String tt_description) {
		super();
		this.tt_id = tt_id;
		this.tt_name = tt_name;
		this.tt_description = tt_description;
	}
}
