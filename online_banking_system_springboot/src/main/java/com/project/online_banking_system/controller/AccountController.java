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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.online_banking_system.exception.ResourceNotFoundException;
import com.project.online_banking_system.model.Category;
import com.project.online_banking_system.model.Account;
import com.project.online_banking_system.model.Branch;
import com.project.online_banking_system.model.User;
import com.project.online_banking_system.model.AccountType;
import com.project.online_banking_system.repository.AccountRepository;
import com.project.online_banking_system.services.FileUploadService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class AccountController {

	@Autowired
	private AccountRepository accountRepository;
	
	@Autowired
	public FileUploadService fileService;
	
	@PersistenceContext
    private EntityManager entityManager;

	@GetMapping("/account")
	public List<Account> getAllAccounts() {
		return accountRepository.findAll();
	}
	
	@GetMapping("/account/{id}")
	public ResponseEntity<Account> getAccountById(@PathVariable(value = "id") Long accountId)
			throws ResourceNotFoundException {
		Account account = accountRepository.findById(accountId)
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
		return ResponseEntity.ok().body(account);
	}
	
	@GetMapping("/account/account-details/{id}")
	public ArrayList getAccountDetailsById(@PathVariable(value = "id") Long accountId)
	 {
		 String SQL = "SELECT account, branch, user, atype FROM account account, branch branch, user user, account_type atype WHERE account_customer_id = user_id AND account_branch_id = branch_id AND account_atype_id = atype_id AND account_id = :accountId ORDER BY account_id DESC";
		 Query q = entityManager.createQuery(SQL);
		 q.setParameter("accountId", accountId);
		 
		 List<Object[]> account = q.getResultList();
		 ArrayList<HashMap<String, String>> resultArray = new ArrayList();
		 
		 for ( Object[] row : account ) {
			Account account_details = (Account)row[ 0 ];
			Branch branch_details = (Branch)row[ 1 ];
			User cusomter_details = (User)row[ 2 ];
			AccountType at_details = (AccountType)row[ 3 ];
			
			HashMap<String, String> results = new HashMap();
			results.put("account_id",String.valueOf(account_details.getAccount_id()));
			results.put("account_branch_id",account_details.getAccount_branch_id());
			results.put("account_customer_id",account_details.getAccount_customer_id());
			results.put("account_atype_id",account_details.getAccount_atype_id());
			results.put("account_opening_date",account_details.getAccount_opening_date());
			results.put("account_nominee_name",account_details.getAccount_nominee_name());
			results.put("account_nominee_mobile",account_details.getAccount_nominee_mobile());
			results.put("accounht_nominee_address",account_details.getAccounht_nominee_address());
			results.put("account_nominee_id_number",account_details.getAccount_nominee_id_number());
			results.put("account_user_photo_name",account_details.getAccount_user_photo_name());
			results.put("account_description",account_details.getAccount_description());
			
			results.put("customer_name",cusomter_details.getUser_first_name()+" "+cusomter_details.getUser_last_name());
			results.put("customer_email",cusomter_details.getUser_email());
			results.put("customer_mobile",cusomter_details.getUser_mobile());
			
			results.put("account_type",at_details.getAtype_name());
			results.put("branch_name",branch_details.getBranch_name());
			
			resultArray.add(results);
			 
		 }	 

       return resultArray;
	}
	
	@GetMapping("/account/account-balance/{account_id}")
	public ArrayList getAccountBalance(@PathVariable(value = "account_id") String accountId)
	{
		ArrayList<HashMap<String, String>> resultArray = new ArrayList();
		HashMap<String, String> results = new HashMap();
		String total_credit = accountRepository.getSumBalance(accountId,"1");
		String total_debit = accountRepository.getSumBalance(accountId,"2");
		
		if(total_credit == null) total_credit = "0.00";
		if(total_debit == null) total_debit = "0.00";
				
		
		System.out.print("Credit : "+total_credit);
		System.out.print("Debit : "+total_debit);
		
		results.put("total_credit",String.valueOf(total_credit)+"0");
		results.put("total_debit",String.valueOf(total_debit)+"0");
		results.put("total_balance",String.valueOf(Float.parseFloat(total_credit) - Float.parseFloat(total_debit))+"0");

		resultArray.add(results);
		return resultArray;
	}
	
	@GetMapping("/account/all-account/{id}")
	public ArrayList getAllAccounts(@PathVariable(value = "id") String user_id) {
		
		String SQL = "SELECT account, branch, user, atype FROM account account, branch branch, user user, account_type atype WHERE account_customer_id = user_id AND account_branch_id = branch_id AND account_atype_id = atype_id ORDER BY account_id DESC";
		 Query q = entityManager.createQuery(SQL);
		 if(!user_id.equals("0")) {
			 System.out.print("Employee Id : "+user_id);

			 SQL = "SELECT account, branch, user, atype FROM account account, branch branch, user user, account_type atype WHERE account_customer_id = user_id AND account_branch_id = branch_id AND account_atype_id = atype_id AND user_id = :user_id ORDER BY account_id DESC";
			 q = entityManager.createQuery(SQL);
			 q.setParameter("user_id", user_id);
		 } 
		 List<Object[]> account = q.getResultList();
		 ArrayList<HashMap<String, String>> resultArray = new ArrayList();
		 
		 for ( Object[] row : account ) {
			  Account account_details = (Account)row[ 0 ];
			  Branch branch_details = (Branch)row[ 1 ];
			  User cusomter_details = (User)row[ 2 ];
			  AccountType at_details = (AccountType)row[ 3 ];
			
			    HashMap<String, String> results = new HashMap();
				results.put("account_id",String.valueOf(account_details.getAccount_id()));
				results.put("account_branch_id",account_details.getAccount_branch_id());
				results.put("account_customer_id",account_details.getAccount_customer_id());
				results.put("account_atype_id",account_details.getAccount_atype_id());
				results.put("account_opening_date",account_details.getAccount_opening_date());
				results.put("account_nominee_name",account_details.getAccount_nominee_name());
				results.put("account_nominee_mobile",account_details.getAccount_nominee_mobile());
				results.put("accounht_nominee_address",account_details.getAccounht_nominee_address());
				results.put("account_nominee_id_number",account_details.getAccount_nominee_id_number());
				results.put("account_user_photo_name",account_details.getAccount_user_photo_name());
				results.put("account_description",account_details.getAccount_description());
				
				results.put("customer_name",cusomter_details.getUser_first_name()+" "+cusomter_details.getUser_last_name());
				results.put("customer_email",cusomter_details.getUser_email());
				results.put("customer_mobile",cusomter_details.getUser_mobile());
				
				results.put("account_type",at_details.getAtype_name());
				results.put("branch_name",branch_details.getBranch_name());
				
			    resultArray.add(results);
			 
		 }	 

        return resultArray;
	}
	

	@RequestMapping(value = "/account", method = RequestMethod.POST,
    consumes = {"multipart/form-data"})	
	public Account createAccount(@RequestParam("account_image") MultipartFile account_image, 
			@ModelAttribute("form") Account account) {
		System.out.print("File Data");
		try {
			long unixTime = System.currentTimeMillis() / 1000L;
			String fileName = unixTime+"_" +account_image.getOriginalFilename();
			System.out.print("File URL : ");
			System.out.print(this.fileService.uploadToLocalFileSystem(account_image, fileName));  
            account.setAccount_user_photo_name(fileName);
		
		}  catch (Exception e) {
			e.printStackTrace();
		}
		return accountRepository.save(account);
	}
	
	 
    // For Downloading Files
    @GetMapping("/account/account_image/{fileName:.+}")
    public Path getFileUrl(@PathVariable(name = "fileName") String fileName) throws IOException {
    	System.out.print("Printing URL");
    	System.out.print(this.fileService.getFileURL(fileName));
    	Path fileLocation = this.fileService.getFileLocation(fileName);
    	File file = new File(fileLocation.toString());
    	InputStreamResource resource = new InputStreamResource(new FileInputStream(fileLocation.toString()));
   
    	return fileLocation;
    }

	@DeleteMapping("/account/{id}")
	public Map<String, Boolean> deleteAccount(@PathVariable(value = "id") Long accountId)
			throws ResourceNotFoundException {
		Account account = accountRepository.findById(accountId)
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));

		accountRepository.delete(account);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
	@PostMapping("/save-account")
	public Account saveAccount(@RequestParam("account_image") MultipartFile account_image, 
			@ModelAttribute("form") Account account) {
		System.out.print("File Data");
		try {
			long unixTime = System.currentTimeMillis() / 1000L;
			String fileName = unixTime+"_" +account_image.getOriginalFilename();
			System.out.print("File URL : ");
			System.out.print(this.fileService.uploadToLocalFileSystem(account_image, fileName));  
	        account.setAccount_user_photo_name(fileName);
		
		}  catch (Exception e) {
			e.printStackTrace();
		}
		return accountRepository.save(account);
	}
	
	@PutMapping("/save-account")
	public Account updateAccount(@RequestParam("account_image") MultipartFile account_image, 
			@ModelAttribute("form") Account account) {
		System.out.print("File Data");
		try {
			if(!account_image.isEmpty()) {
				long unixTime = System.currentTimeMillis() / 1000L;
				String fileName = unixTime+"_" +account_image.getOriginalFilename();
				this.fileService.uploadToLocalFileSystem(account_image, fileName);
	            account.setAccount_user_photo_name(fileName);
			}
		}  catch (Exception e) {
			e.printStackTrace();
		}
		return accountRepository.save(account);
	}
	
	@PutMapping("/save-account-withoutimage")
    public Account updateServices(@ModelAttribute("form") Account account) {
    	return accountRepository.save(account);
	}
	
}
