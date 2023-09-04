package com.project.online_banking_system.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.web.multipart.MultipartFile;

@Table(name = "account")
@Entity(name = "account")

public class Account {

	private long account_id;
	private String account_branch_id;
	private String account_customer_id;
	private String account_atype_id;
	private String account_opening_date;
	private String account_nominee_name;
	private String account_nominee_mobile;
	private String accounht_nominee_address;
	private String account_nominee_id_number;
	private MultipartFile account_user_photo;
	private String account_user_photo_name;
	private String account_description;
	
	public Account() {
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getAccount_id() {
		return account_id;
	}
	public void setAccount_id(long account_id) {
		this.account_id = account_id;
	}
	public String getAccount_branch_id() {
		return account_branch_id;
	}
	public void setAccount_branch_id(String account_branch_id) {
		this.account_branch_id = account_branch_id;
	}
	public String getAccount_customer_id() {
		return account_customer_id;
	}
	public void setAccount_customer_id(String account_customer_id) {
		this.account_customer_id = account_customer_id;
	}
	public String getAccount_atype_id() {
		return account_atype_id;
	}
	public void setAccount_atype_id(String account_atype_id) {
		this.account_atype_id = account_atype_id;
	}

	public String getAccount_opening_date() {
		return account_opening_date;
	}
	public void setAccount_opening_date(String account_opening_date) {
		this.account_opening_date = account_opening_date;
	}
	public String getAccount_nominee_name() {
		return account_nominee_name;
	}
	public void setAccount_nominee_name(String account_nominee_name) {
		this.account_nominee_name = account_nominee_name;
	}
	public String getAccount_nominee_mobile() {
		return account_nominee_mobile;
	}
	public void setAccount_nominee_mobile(String account_nominee_mobile) {
		this.account_nominee_mobile = account_nominee_mobile;
	}
	public String getAccounht_nominee_address() {
		return accounht_nominee_address;
	}
	public void setAccounht_nominee_address(String accounht_nominee_address) {
		this.accounht_nominee_address = accounht_nominee_address;
	}
	public String getAccount_nominee_id_number() {
		return account_nominee_id_number;
	}
	public void setAccount_nominee_id_number(String account_nominee_id_number) {
		this.account_nominee_id_number = account_nominee_id_number;
	}

	public void setAccount_user_photo(MultipartFile account_user_photo) {
		this.account_user_photo = account_user_photo;
	}

	public String getAccount_user_photo_name() {
		return account_user_photo_name;
	}

	public void setAccount_user_photo_name(String account_user_photo_name) {
		this.account_user_photo_name = account_user_photo_name;
	}

	
	public String getAccount_description() {
		return account_description;
	}

	public void setAccount_description(String account_description) {
		this.account_description = account_description;
	}

	@Override
	public String toString() {
		return "Account [account_id=" + account_id + ", account_branch_id=" + account_branch_id
				+ ", account_customer_id=" + account_customer_id + ", account_atype_id=" + account_atype_id
				+ ", account_opening_date=" + account_opening_date + ", account_nominee_name=" + account_nominee_name
				+ ", account_nominee_mobile=" + account_nominee_mobile + ", accounht_nominee_address="
				+ accounht_nominee_address + ", account_nominee_id_number=" + account_nominee_id_number
				+ ", account_user_photo=" + account_user_photo + ", account_user_photo_name=" + account_user_photo_name
				+ ", account_description=" + account_description + "]";
	}

	public Account(long account_id, String account_branch_id, String account_customer_id, String account_atype_id,
			String account_opening_date, String account_nominee_name, String account_nominee_mobile,
			String accounht_nominee_address, String account_nominee_id_number, MultipartFile account_user_photo,
			String account_user_photo_name, String account_description) {
		super();
		this.account_id = account_id;
		this.account_branch_id = account_branch_id;
		this.account_customer_id = account_customer_id;
		this.account_atype_id = account_atype_id;
		this.account_opening_date = account_opening_date;
		this.account_nominee_name = account_nominee_name;
		this.account_nominee_mobile = account_nominee_mobile;
		this.accounht_nominee_address = accounht_nominee_address;
		this.account_nominee_id_number = account_nominee_id_number;
		this.account_user_photo = account_user_photo;
		this.account_user_photo_name = account_user_photo_name;
		this.account_description = account_description;
	}
}
