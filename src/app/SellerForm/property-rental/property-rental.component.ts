import { ToasterServiceService } from './../../toaster-service.service';
import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../shared/seller.service';
import { PropertyService } from '../../shared/property.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TokenStorage } from '../../core/token.storage';
import { PropertyRentalDetailDTO } from './propertyRentalDTO';

@Component({
  selector: 'app-property-rental',
  templateUrl: './property-rental.component.html',
  styleUrls: ['./property-rental.component.css']
})
export class PropertyRentalComponent implements OnInit {

  async ngAfterViewInit() {
		await this.loadScript('./assets/js/common.js');
	}

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }

  propertyrentedValid=true;
  ejarinoValid=true;
  leasestartdateValid=true;
  leaseexpiryValid=true;
  tenantnameValid=true;
  paymentstructureValid=true;
  annualrentValid=true;
  scannedTenentContractUploadValid=true;
  formValid=true;
  scannedTenantContractUploadPath:string;

  constructor(private myToast:ToasterServiceService,private route:ActivatedRoute,private sellerService:SellerService,private propertyService:PropertyService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }
  propertyRentalDetailDTO=new PropertyRentalDetailDTO();
  selectedscannedTenentContract: FileList;
  scannedTenentContractFile:File;
  action:string;

  ngOnInit() {
    // this.token.savePropertyId('182');
    // this.token.saveUserName('BesterCapital2');
    if(this.propertyRentalDetailDTO.tenancyContractUpload==null)
    {
      this.scannedTenantContractUploadPath=null;
    }
    else
    {
    this.scannedTenantContractUploadPath=''+this.token.getImagepath()+'propertyId-'+this.propertyRentalDetailDTO.propertyId+'/'+this.propertyRentalDetailDTO.tenancyContractUpload;}

    this.action='';
    this.action=this.route.snapshot.params['action'];
    console.log(this.action);
    if(this.action=='back'||this.action=='next'){
        console.log('Inside Action');
          this.getPropertyRentalDetails();
      }//end of back if
  }


  scannedTenantContract(event):string {

    if (event.target.files && event.target.files[0]) {
      var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
       if (FileSize > 2) {
           this.myToast.Error('File size exceeds 2 MB');
           this.myToast.Warning('Accepted file size less than 2Mb');
           return 'File size excced !'
       }}

       if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
          this.scannedTenantContractUploadPath = (<FileReader>event.target).result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
        this.selectedscannedTenentContract = event.target.files;
        this.scannedTenentContractFile=this.selectedscannedTenentContract.item(0);
        this.propertyRentalDetailDTO.tenancyContractUpload=this.scannedTenentContractFile.name;
        this.scannedTenantContractUploadPath=''+this.token.getImagepath()+'propertyId-'+this.propertyRentalDetailDTO.propertyId+'/'+this.propertyRentalDetailDTO.tenancyContractUpload;
        event.srcElement.value = null;
  }

  validation():boolean {
    console.log('Property Finanical Validations!');

  this.propertyrentedValid=true;
  if(this.propertyRentalDetailDTO.isRented)
  {
  var isrented =this.propertyRentalDetailDTO.isRented.match('[a-zA-Z]*');
  if(isrented["0"]!==this.propertyRentalDetailDTO.isRented){
    this.myToast.Error('Invalid Property Rented');
    this.propertyrentedValid=false;
  }}

  else{

    this.myToast.Error('Property Rented Cannot Empty');
    this.propertyrentedValid=false;
  }

  this.ejarinoValid=true;
  if(this.propertyRentalDetailDTO.isRented=='No'){
    this.ejarinoValid=true;
  }
  else{
  if(this.propertyRentalDetailDTO.rentalEjariNo)
  {
  var stringejarino=this.propertyRentalDetailDTO.rentalEjariNo.toString();
  var rentalejari =stringejarino.match('[0-9_]*');
  if(rentalejari ["0"]!==this.propertyRentalDetailDTO.rentalEjariNo){
    this.myToast.Error('Invalid Ejari Number');
    this.ejarinoValid=false;
  }}

  else{

    this.myToast.Error('Ejari Number Cannot Empty');
    this.ejarinoValid=false;
  }}

  this.leasestartdateValid=true;
  // if(this.propertyRentalDetailDTO.isRented=='No'){
  //   this.leasestartdateValid=true;
  // }
  // else{
  // if(this.propertyRentalDetailDTO.leaseStartDate)
  // {
  // var stringleasestartdate=this.propertyRentalDetailDTO.leaseStartDate.toString();
  // var leasestart =stringleasestartdate.match('[0-9//]*');
  // if(leasestart["0"]!==this.propertyRentalDetailDTO.leaseStartDate){
  //   this.myToast.Error('Invalid Lease Start Date');
  //   this.leasestartdateValid=true;
  // }}

  // else{

  //   this.myToast.Error('Lease Start Date Cannot Empty');
  //   this.leasestartdateValid=false;
  // }}

  this.leaseexpiryValid=true;
  // if(this.propertyRentalDetailDTO.isRented=='No'){
  //   this.leaseexpiryValid=true;
  // }
  // else{
  // if(this.propertyRentalDetailDTO.leaseExpiryDate)
  // {
  // var stringleaseexpirydate=this.propertyRentalDetailDTO.leaseExpiryDate.toString();
  // var leaseexpiry =stringleaseexpirydate.match('[0-9//]*');
  // if(leaseexpiry["0"]!==this.propertyRentalDetailDTO.leaseExpiryDate){
  //   this.myToast.Error('Invalid Lease Expiry Date');
  //   this.leaseexpiryValid=true;
  // }}

  // else{

  //   this.myToast.Error('Lease Expiry Date Cannot Empty');
  //   this.leaseexpiryValid=false;
  // }}

  this.tenantnameValid=true;
  if(this.propertyRentalDetailDTO.isRented=='No'){
    this.tenantnameValid=true;
  }
  else{
  if(this.propertyRentalDetailDTO.tenantName)
  {
  var stringtenantname=this.propertyRentalDetailDTO.tenantName.toString();
  var tenantname =stringtenantname.match('[a-zA-Z]*');
  if(tenantname["0"]!==this.propertyRentalDetailDTO.tenantName){
    this.myToast.Error('Invalid Tenant Name');
    this.tenantnameValid=false;
  }}}

  this.paymentstructureValid=true;
  if(this.propertyRentalDetailDTO.isRented=='No'){
    this.paymentstructureValid=true;
  }
  else{
  if(this.propertyRentalDetailDTO.paymentStructure)
  {
  var stringpaymentstructure=this.propertyRentalDetailDTO.paymentStructure.toString();
  var paymentstructure =stringpaymentstructure.match('[0-9]*');
  if(paymentstructure["0"]!==this.propertyRentalDetailDTO.paymentStructure){
    this.myToast.Error('Invalid Payment Structure');
    this.paymentstructureValid=false;
  }}}

  this.annualrentValid=true;
  if(this.propertyRentalDetailDTO.isRented=='No'){
    this.annualrentValid=true;
  }
  else{
  if(this.propertyRentalDetailDTO.rentalAnnualRent)
  {
  var stringannualrent=this.propertyRentalDetailDTO.rentalAnnualRent.toString();
  var annualrent =stringannualrent.match('[0-9]*');
  if(annualrent["0"]!==this.propertyRentalDetailDTO.rentalAnnualRent){
    this.myToast.Error('Invalid Annual Rent');
    this.annualrentValid=false;
  }}}

 this.scannedTenentContractUploadValid=true;
 if(this.propertyRentalDetailDTO.isRented=='No'){
  this.scannedTenentContractUploadValid=true;
}
else{
 if(this.propertyRentalDetailDTO.tenancyContractUpload==null||this.propertyRentalDetailDTO.tenancyContractUpload==undefined){
  this.myToast.Error('Invalid Scanned Tenent Contract');
  this.scannedTenentContractUploadValid=false;
 }}

  if(this.propertyrentedValid==false||this.ejarinoValid==false
    ||this.tenantnameValid==false||this.paymentstructureValid==false||this.annualrentValid==false||this.scannedTenentContractUploadValid==false){

      this.formValid=false;
  }

  else{
    this.formValid=true;
  }
    return this.formValid;
  }


  addPropertyRentalDetails(): string {
    if(this.token.getuserName()==null){
      console.log('Invalid Session');
      return "Invalid Session";
    }

    if(this.validation()==true){

    }
    else {
      return "Invalid Property Rental Form";
    }

    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          //for testing
          this.propertyRentalDetailDTO.propertyId=this.token.getPropertyId();
          this.propertyRentalDetailDTO.userName=this.token.getuserName();
          this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/','PropertyRentals-scannedTenantContractCopy'+this.token.getPropertyId(),this.token.getuserName(),this.scannedTenentContractFile).subscribe(
            data2=>{
                        if(data2.type==3){
                          console.log(data2);

                          this.propertyRentalDetailDTO.tenancyContractUpload=data2.partialText;
                          this.propertyRentalDetailDTO.userName=this.token.getuserName();
                          this.propertyRentalDetailDTO.sellerUserName=this.token.getuserName();
                          this.propertyRentalDetailDTO.status='inprocess';
                          this.propertyService.updatePropertyRental(this.propertyRentalDetailDTO).subscribe(
                            propertyRentalData=>{
                                    console.log(propertyRentalData);
                                    if(propertyRentalData.msg=='Property Rental Info Updated Successfully'){
                                      this.myToast.Success('Property Status','Property Rental Details Added Successfully');
                                      this. router.navigate(['/propertySuccess']);
                                    }

                                  }//end of propertyFinancialData
                        );//end of subscription of property financial Details
                        }//end of if of type==3 check
                        else if(data2=='Data'){


                          this.propertyRentalDetailDTO.tenancyContractUpload=data2.partialText;
                          this.propertyRentalDetailDTO.userName=this.token.getuserName();
                          this.propertyRentalDetailDTO.sellerUserName=this.token.getuserName();
                          this.propertyRentalDetailDTO.status='inprocess';
                          this.propertyService.updatePropertyRental(this.propertyRentalDetailDTO).subscribe(
                            propertyRentalData=>{
                                    console.log(propertyRentalData);
                                    if(propertyRentalData.msg=='Property Rental Info Updated Successfully'){
                                      this.myToast.Success('Property Status','Property Rental Details Added Successfully');
                                      this. router.navigate(['/propertySuccess']);
                                    }

                                  }//end of propertyFinancialData
                        );//end of subscription of property financial Details

                          this.myToast.Success('Property Status','Property Rental Details Added Successfully');
                          this. router.navigate(['/propertySuccess']);


                        }//end of else of Data
            }//end of data2
          );//end of save document subscription

        }//end of if

     }//end of outer data predicate
    );//end of outer subscription
    return "";
  }//end of loginChiraghUser


  getPropertyRentalDetails(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          this.propertyService.getPropertyRentalById(this.token.getPropertyId(),this.token.getuserName()).subscribe(
            rentalData=>{
              console.log(rentalData);
              this.propertyRentalDetailDTO=rentalData;
              this.myToast.Info('Property Status','Property Rental Details data Loaded Successfully');
            }
          );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser


}
