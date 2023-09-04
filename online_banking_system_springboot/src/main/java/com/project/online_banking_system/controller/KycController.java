package com.project.online_banking_system.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.online_banking_system.exception.ResourceNotFoundException;
import com.project.online_banking_system.model.Kyc;
import com.project.online_banking_system.model.User;
import com.project.online_banking_system.repository.KycRepository;
import com.project.online_banking_system.services.FileUploadService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class KycController {

	@Autowired
	private KycRepository kycRepository;
	
	@Autowired
	public FileUploadService fileService;
	
	@PersistenceContext
    private EntityManager entityManager;

	@GetMapping("/kyc")
	public List<Kyc> getAllKycs() {
		return kycRepository.findAll();
	}
	
	@GetMapping("/kyc/{id}")
	public ResponseEntity<Kyc> getKycById(@PathVariable(value = "id") Long kycId)
			throws ResourceNotFoundException {
		Kyc kyc = kycRepository.findById(kycId)
				.orElseThrow(() -> new ResourceNotFoundException("Kyc not found for this id :: " + kycId));
		return ResponseEntity.ok().body(kyc);
	}
	

	@RequestMapping(value = "/kyc", method = RequestMethod.POST,
    consumes = {"multipart/form-data"})	
	public Kyc createKyc(@RequestParam("kyc_image") MultipartFile kyc_image, 
			@ModelAttribute("form") Kyc kyc) {
		System.out.print("File Data");
		try {
			long unixTime = System.currentTimeMillis() / 1000L;
			String fileName = unixTime+"_" +kyc_image.getOriginalFilename();
			System.out.print("File URL : ");
			System.out.print(this.fileService.uploadToLocalFileSystem(kyc_image, fileName));  
            kyc.setKyc_image_filename(fileName);
		
		}  catch (Exception e) {
			e.printStackTrace();
		}
		return kycRepository.save(kyc);
	}
	
	 
    // For Downloading Files
    @GetMapping("/kyc/kyc_image/{fileName:.+}")
    public Path getFileUrl(@PathVariable(name = "fileName") String fileName) throws IOException {
    	System.out.print("Printing URL");
    	System.out.print(this.fileService.getFileURL(fileName));
    	Path fileLocation = this.fileService.getFileLocation(fileName);
    	File file = new File(fileLocation.toString());
    	InputStreamResource resource = new InputStreamResource(new FileInputStream(fileLocation.toString()));
   
    	return fileLocation;
    }

    
    @PutMapping("/kyc/{id}")
	public ResponseEntity<Kyc> updateKyc(@PathVariable(value = "id") Long kycId,
			@Valid @RequestBody Kyc kycDetails) throws ResourceNotFoundException {
		final Kyc updatedKyc = kycRepository.save(kycDetails);
		return ResponseEntity.ok(updatedKyc);
	}

	@DeleteMapping("/kyc/{id}")
	public Map<String, Boolean> deleteKyc(@PathVariable(value = "id") Long kycId)
			throws ResourceNotFoundException {
		Kyc kyc = kycRepository.findById(kycId)
				.orElseThrow(() -> new ResourceNotFoundException("Kyc not found for this id :: " + kycId));

		kycRepository.delete(kyc);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
	@GetMapping("/kyc/all-kyc/{id}")
	public ArrayList getAllKycs(@PathVariable(value = "id") String user_id) {
		
		String SQL = "SELECT kyc, user FROM kyc kyc, user user WHERE kyc_customer_id = user_id ORDER BY kyc_id DESC";
		 Query q = entityManager.createQuery(SQL);
		 if(!user_id.equals("0")) {
			 System.out.print("Employee Id : "+user_id);

			 SQL = "SELECT kyc, user FROM kyc kyc, user user WHERE kyc_customer_id = user_id AND user_id = :user_id ORDER BY kyc_id DESC";
			 q = entityManager.createQuery(SQL);
			 q.setParameter("user_id", user_id);
		 } 
		 List<Object[]> kyc = q.getResultList();
		 ArrayList<HashMap<String, String>> resultArray = new ArrayList();
		 
		 for ( Object[] row : kyc ) {
			  Kyc kyc_details = (Kyc)row[ 0 ];
			  User cusomter_details = (User)row[ 1 ];
			
			    HashMap<String, String> results = new HashMap();
				results.put("kyc_id",String.valueOf(kyc_details.getKyc_id()));
				results.put("kyc_customer_id",kyc_details.getKyc_customer_id());
				results.put("kyc_type",kyc_details.getKyc_type());
				results.put("kyc_number",kyc_details.getKyc_number());
				results.put("kyc_description",kyc_details.getKyc_description());
				results.put("kyc_image_filename",kyc_details.getKyc_image_filename());
				
				results.put("customer_name",cusomter_details.getUser_first_name()+" "+cusomter_details.getUser_last_name());
				results.put("customer_email",cusomter_details.getUser_email());
				results.put("customer_mobile",cusomter_details.getUser_mobile());
				
			    resultArray.add(results);
			 
		 }	 

        return resultArray;
	}
	
	@PostMapping("/save-kyc")
	public Kyc saveKyc(@RequestParam("kyc_image") MultipartFile kyc_image, 
			@ModelAttribute("form") Kyc kyc) {
		System.out.print("File Data");
		try {
			long unixTime = System.currentTimeMillis() / 1000L;
			String fileName = unixTime+"_" +kyc_image.getOriginalFilename();
			System.out.print("File URL : ");
			System.out.print(this.fileService.uploadToLocalFileSystem(kyc_image, fileName));  
	        kyc.setKyc_image_filename(fileName);
		
		}  catch (Exception e) {
			e.printStackTrace();
		}
		return kycRepository.save(kyc);
	}
	
	@PutMapping("/save-kyc")
	public Kyc updateKyc(@RequestParam("kyc_image") MultipartFile kyc_image, 
			@ModelAttribute("form") Kyc kyc) {
		System.out.print("File Data");
		try {
			if(!kyc_image.isEmpty()) {
				long unixTime = System.currentTimeMillis() / 1000L;
				String fileName = unixTime+"_" +kyc_image.getOriginalFilename();
				this.fileService.uploadToLocalFileSystem(kyc_image, fileName);
	            kyc.setKyc_image_filename(fileName);
			}
		}  catch (Exception e) {
			e.printStackTrace();
		}
		return kycRepository.save(kyc);
	}
	
	@PutMapping("/save-kyc-withoutimage")
    public Kyc updateServices(@ModelAttribute("form") Kyc kyc) {
    	return kycRepository.save(kyc);
	}
}
