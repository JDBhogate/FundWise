package com.project.online_banking_system.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "transaction_method")
@Entity(name = "transaction_method")

public class TransactionMethod {

	private long tm_id;
	private String tm_name;
	private String tm_description;
	
	public TransactionMethod() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getTm_id() {
		return tm_id;
	}

	public void setTm_id(long tm_id) {
		this.tm_id = tm_id;
	}

	public String getTm_name() {
		return tm_name;
	}

	public void setTm_name(String tm_name) {
		this.tm_name = tm_name;
	}

	public String getTm_description() {
		return tm_description;
	}

	public void setTm_description(String tm_description) {
		this.tm_description = tm_description;
	}

	@Override
	public String toString() {
		return "TransactionMethod [tm_id=" + tm_id + ", tm_name=" + tm_name + ", tm_description=" + tm_description
				+ "]";
	}

	public TransactionMethod(long tm_id, String tm_name, String tm_description) {
		super();
		this.tm_id = tm_id;
		this.tm_name = tm_name;
		this.tm_description = tm_description;
	}
}
