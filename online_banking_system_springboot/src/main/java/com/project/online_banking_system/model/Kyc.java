package com.project.online_banking_system.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.web.multipart.MultipartFile;

@Table(name = "kyc")
@Entity(name = "kyc")

public class Kyc {

	private long kyc_id;
	private String kyc_customer_id;
	private String kyc_type;
	private String kyc_number;
	private String kyc_description;
	private MultipartFile kyc_image;
	private String kyc_image_filename;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getKyc_id() {
		return kyc_id;
	}
	
	public Kyc() {
		
	}

	

	public void setKyc_id(long kyc_id) {
		this.kyc_id = kyc_id;
	}

	public String getKyc_customer_id() {
		return kyc_customer_id;
	}

	public void setKyc_customer_id(String kyc_customer_id) {
		this.kyc_customer_id = kyc_customer_id;
	}

	public String getKyc_type() {
		return kyc_type;
	}

	public void setKyc_type(String kyc_type) {
		this.kyc_type = kyc_type;
	}

	public String getKyc_number() {
		return kyc_number;
	}

	public void setKyc_number(String kyc_number) {
		this.kyc_number = kyc_number;
	}

	public String getKyc_description() {
		return kyc_description;
	}

	public void setKyc_description(String kyc_description) {
		this.kyc_description = kyc_description;
	}

	public void setKyc_image(MultipartFile kyc_image) {
		this.kyc_image = kyc_image;
	}

	public String getKyc_image_filename() {
		return kyc_image_filename;
	}

	public void setKyc_image_filename(String kyc_image_filename) {
		this.kyc_image_filename = kyc_image_filename;
	}

	@Override
	public String toString() {
		return "Kyc [kyc_id=" + kyc_id + ", kyc_customer_id=" + kyc_customer_id + ", kyc_type=" + kyc_type
				+ ", kyc_number=" + kyc_number + ", kyc_description=" + kyc_description + ", kyc_image=" + kyc_image
				+ ", kyc_image_filename=" + kyc_image_filename + "]";
	}

	public Kyc(long kyc_id, String kyc_customer_id, String kyc_type, String kyc_number, String kyc_description,
			MultipartFile kyc_image, String kyc_image_filename) {
		super();
		this.kyc_id = kyc_id;
		this.kyc_customer_id = kyc_customer_id;
		this.kyc_type = kyc_type;
		this.kyc_number = kyc_number;
		this.kyc_description = kyc_description;
		this.kyc_image = kyc_image;
		this.kyc_image_filename = kyc_image_filename;
	}
	
}
