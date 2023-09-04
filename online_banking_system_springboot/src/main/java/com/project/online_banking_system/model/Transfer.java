package com.project.online_banking_system.model;

//import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "transfer")
@Entity(name = "transfer")

public class Transfer {

	private long transfer_id;
	private String transfer_account_id;
	
	private String transfer_beneficiary_id;
	private String transfer_date;
	private String transfer_description;
	private String transfer_amount;
	
	
	public Transfer() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getTransfer_id() {
		return transfer_id;
	}


	public void setTransfer_id(long transfer_id) {
		this.transfer_id = transfer_id;
	}

	public String getTransfer_account_id() {
		return transfer_account_id;
	}

	public void setTransfer_account_id(String transfer_account_id) {
		this.transfer_account_id = transfer_account_id;
	}

	public String getTransfer_beneficiary_id() {
		return transfer_beneficiary_id;
	}

	public void setTransfer_beneficiary_id(String transfer_beneficiary_id) {
		this.transfer_beneficiary_id = transfer_beneficiary_id;
	}

	public String getTransfer_date() {
		return transfer_date;
	}

	public void setTransfer_date(String transfer_date) {
		this.transfer_date = transfer_date;
	}

	public String getTransfer_description() {
		return transfer_description;
	}

	public void setTransfer_description(String transfer_description) {
		this.transfer_description = transfer_description;
	}

	public String getTransfer_amount() {
		return transfer_amount;
	}

	public void setTransfer_amount(String transfer_amount) {
		this.transfer_amount = transfer_amount;
	}

	public Transfer(long transfer_id, String transfer_account_id, String transfer_beneficiary_id, String transfer_date,
			String transfer_description, String transfer_amount) {
		super();
		this.transfer_id = transfer_id;
		this.transfer_account_id = transfer_account_id;
		this.transfer_beneficiary_id = transfer_beneficiary_id;
		this.transfer_date = transfer_date;
		this.transfer_description = transfer_description;
		this.transfer_amount = transfer_amount;
	}

	@Override
	public String toString() {
		return "Transfer [transfer_id=" + transfer_id + ", transfer_account_id=" + transfer_account_id
				+ ", transfer_beneficiary_id=" + transfer_beneficiary_id + ", transfer_date=" + transfer_date
				+ ", transfer_description=" + transfer_description + ", transfer_amount=" + transfer_amount + "]";
	}
}
