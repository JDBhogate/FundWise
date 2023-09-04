package com.project.online_banking_system.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "account_type")
@Entity(name = "account_type")

public class AccountType {

	private long atype_id;
	private String atype_name;
	private String atype_min_balance;
	private String atype_interest;
	private String atype_description;
	
	public AccountType() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getAtype_id() {
		return atype_id;
	}

	public void setAtype_id(long atype_id) {
		this.atype_id = atype_id;
	}

	public String getAtype_name() {
		return atype_name;
	}

	public void setAtype_name(String atype_name) {
		this.atype_name = atype_name;
	}

	public String getAtype_min_balance() {
		return atype_min_balance;
	}

	public void setAtype_min_balance(String atype_min_balance) {
		this.atype_min_balance = atype_min_balance;
	}

	public String getAtype_interest() {
		return atype_interest;
	}

	public void setAtype_interest(String atype_interest) {
		this.atype_interest = atype_interest;
	}

	public String getAtype_description() {
		return atype_description;
	}

	public void setAtype_description(String atype_description) {
		this.atype_description = atype_description;
	}

	@Override
	public String toString() {
		return "AccountType [atype_id=" + atype_id + ", atype_name=" + atype_name + ", atype_min_balance="
				+ atype_min_balance + ", atype_interest=" + atype_interest + ", atype_description=" + atype_description
				+ "]";
	}

	public AccountType(long atype_id, String atype_name, String atype_min_balance, String atype_interest,
			String atype_description) {
		super();
		this.atype_id = atype_id;
		this.atype_name = atype_name;
		this.atype_min_balance = atype_min_balance;
		this.atype_interest = atype_interest;
		this.atype_description = atype_description;
	}
	
}
