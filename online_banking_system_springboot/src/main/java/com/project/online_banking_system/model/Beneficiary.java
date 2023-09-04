package com.project.online_banking_system.model;

//import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "beneficiary")
@Entity(name = "beneficiary")

public class Beneficiary {

	private long beneficiary_id;
	private String beneficiary_user_id;
	
	private String beneficiary_name;
	private String beneficiary_mobile;
	private String beneficiary_email;
	private String beneficiary_address;
	private String beneficiary_city;

	private String beneficiary_state;
	private String beneficiary_country;
	private String beneficiary_account_number;
	private String beneficiary_account_type;
	private String beneficiary_ifsc_code;
	private String beneficiary_bank_name;
	
	
	public Beneficiary() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getBeneficiary_id() {
		return beneficiary_id;
	}


	public void setBeneficiary_id(long beneficiary_id) {
		this.beneficiary_id = beneficiary_id;
	}


	public String getBeneficiary_user_id() {
		return beneficiary_user_id;
	}


	public void setBeneficiary_user_id(String beneficiary_user_id) {
		this.beneficiary_user_id = beneficiary_user_id;
	}


	public String getBeneficiary_name() {
		return beneficiary_name;
	}


	public void setBeneficiary_name(String beneficiary_name) {
		this.beneficiary_name = beneficiary_name;
	}


	public String getBeneficiary_mobile() {
		return beneficiary_mobile;
	}


	public void setBeneficiary_mobile(String beneficiary_mobile) {
		this.beneficiary_mobile = beneficiary_mobile;
	}


	public String getBeneficiary_email() {
		return beneficiary_email;
	}


	public void setBeneficiary_email(String beneficiary_email) {
		this.beneficiary_email = beneficiary_email;
	}


	public String getBeneficiary_address() {
		return beneficiary_address;
	}


	public void setBeneficiary_address(String beneficiary_address) {
		this.beneficiary_address = beneficiary_address;
	}


	public String getBeneficiary_city() {
		return beneficiary_city;
	}


	public void setBeneficiary_city(String beneficiary_city) {
		this.beneficiary_city = beneficiary_city;
	}


	public String getBeneficiary_state() {
		return beneficiary_state;
	}


	public void setBeneficiary_state(String beneficiary_state) {
		this.beneficiary_state = beneficiary_state;
	}


	public String getBeneficiary_country() {
		return beneficiary_country;
	}


	public void setBeneficiary_country(String beneficiary_country) {
		this.beneficiary_country = beneficiary_country;
	}


	public String getBeneficiary_account_number() {
		return beneficiary_account_number;
	}


	public void setBeneficiary_account_number(String beneficiary_account_number) {
		this.beneficiary_account_number = beneficiary_account_number;
	}


	public String getBeneficiary_account_type() {
		return beneficiary_account_type;
	}


	public void setBeneficiary_account_type(String beneficiary_account_type) {
		this.beneficiary_account_type = beneficiary_account_type;
	}


	public String getBeneficiary_ifsc_code() {
		return beneficiary_ifsc_code;
	}


	public void setBeneficiary_ifsc_code(String beneficiary_ifsc_code) {
		this.beneficiary_ifsc_code = beneficiary_ifsc_code;
	}


	public String getBeneficiary_bank_name() {
		return beneficiary_bank_name;
	}


	public void setBeneficiary_bank_name(String beneficiary_bank_name) {
		this.beneficiary_bank_name = beneficiary_bank_name;
	}

	public Beneficiary(long beneficiary_id, String beneficiary_user_id, String beneficiary_name,
			String beneficiary_mobile, String beneficiary_email, String beneficiary_address, String beneficiary_city,
			String beneficiary_state, String beneficiary_country, String beneficiary_account_number,
			String beneficiary_account_type, String beneficiary_ifsc_code, String beneficiary_bank_name) {
		super();
		this.beneficiary_id = beneficiary_id;
		this.beneficiary_user_id = beneficiary_user_id;
		this.beneficiary_name = beneficiary_name;
		this.beneficiary_mobile = beneficiary_mobile;
		this.beneficiary_email = beneficiary_email;
		this.beneficiary_address = beneficiary_address;
		this.beneficiary_city = beneficiary_city;
		this.beneficiary_state = beneficiary_state;
		this.beneficiary_country = beneficiary_country;
		this.beneficiary_account_number = beneficiary_account_number;
		this.beneficiary_account_type = beneficiary_account_type;
		this.beneficiary_ifsc_code = beneficiary_ifsc_code;
		this.beneficiary_bank_name = beneficiary_bank_name;
	}

	@Override
	public String toString() {
		return "Beneficiary [beneficiary_id=" + beneficiary_id + ", beneficiary_user_id=" + beneficiary_user_id
				+ ", beneficiary_name=" + beneficiary_name + ", beneficiary_mobile=" + beneficiary_mobile
				+ ", beneficiary_email=" + beneficiary_email + ", beneficiary_address=" + beneficiary_address
				+ ", beneficiary_city=" + beneficiary_city + ", beneficiary_state=" + beneficiary_state
				+ ", beneficiary_country=" + beneficiary_country + ", beneficiary_account_number="
				+ beneficiary_account_number + ", beneficiary_account_type=" + beneficiary_account_type
				+ ", beneficiary_ifsc_code=" + beneficiary_ifsc_code + ", beneficiary_bank_name="
				+ beneficiary_bank_name + "]";
	}
}
