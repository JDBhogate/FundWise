package com.project.online_banking_system.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "branch")
@Entity(name = "branch")

public class Branch {

	private long branch_id;
	private String branch_name;
	private String branch_address;
	private String branch_contact;
	private String branch_manager;
	private String branch_ifsc;
	private String branch_email;
	private String branch_city;
	private String branch_state;
	private String branch_country;
	
	public Branch() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getBranch_id() {
		return branch_id;
	}

	public void setBranch_id(long branch_id) {
		this.branch_id = branch_id;
	}

	public String getBranch_name() {
		return branch_name;
	}

	public void setBranch_name(String branch_name) {
		this.branch_name = branch_name;
	}

	public String getBranch_address() {
		return branch_address;
	}

	public void setBranch_address(String branch_address) {
		this.branch_address = branch_address;
	}

	public String getBranch_contact() {
		return branch_contact;
	}

	public void setBranch_contact(String branch_contact) {
		this.branch_contact = branch_contact;
	}

	public String getBranch_manager() {
		return branch_manager;
	}

	public void setBranch_manager(String branch_manager) {
		this.branch_manager = branch_manager;
	}

	public String getBranch_ifsc() {
		return branch_ifsc;
	}

	public void setBranch_ifsc(String branch_ifsc) {
		this.branch_ifsc = branch_ifsc;
	}

	public String getBranch_email() {
		return branch_email;
	}

	public void setBranch_email(String branch_email) {
		this.branch_email = branch_email;
	}

	public String getBranch_city() {
		return branch_city;
	}

	public void setBranch_city(String branch_city) {
		this.branch_city = branch_city;
	}

	public String getBranch_state() {
		return branch_state;
	}

	public void setBranch_state(String branch_state) {
		this.branch_state = branch_state;
	}

	public String getBranch_country() {
		return branch_country;
	}

	public void setBranch_country(String branch_country) {
		this.branch_country = branch_country;
	}

	@Override
	public String toString() {
		return "Branch [branch_id=" + branch_id + ", branch_name=" + branch_name + ", branch_address=" + branch_address
				+ ", branch_contact=" + branch_contact + ", branch_manager=" + branch_manager + ", branch_ifsc="
				+ branch_ifsc + ", branch_email=" + branch_email + ", branch_city=" + branch_city + ", branch_state="
				+ branch_state + ", branch_country=" + branch_country + "]";
	}

	public Branch(long branch_id, String branch_name, String branch_address, String branch_contact,
			String branch_manager, String branch_ifsc, String branch_email, String branch_city, String branch_state,
			String branch_country) {
		super();
		this.branch_id = branch_id;
		this.branch_name = branch_name;
		this.branch_address = branch_address;
		this.branch_contact = branch_contact;
		this.branch_manager = branch_manager;
		this.branch_ifsc = branch_ifsc;
		this.branch_email = branch_email;
		this.branch_city = branch_city;
		this.branch_state = branch_state;
		this.branch_country = branch_country;
	}
	
}
