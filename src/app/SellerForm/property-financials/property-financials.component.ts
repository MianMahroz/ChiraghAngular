import { ToasterServiceService } from './../../toaster-service.service';
import { Component, OnInit } from '@angular/core';
import { PropertyFinancialDTO } from './propertyfinancialDTO';
import { TokenStorage } from '../../core/token.storage';
import { AuthService } from '../../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from '../../shared/property.service';
import { SellerService } from '../../shared/seller.service';

@Component({
  selector: 'app-property-financials',
  templateUrl: './property-financials.component.html',
  styleUrls: ['./property-financials.component.css']
})
export class PropertyFinancialsComponent implements OnInit {


  bankList:any[];
  paymentScheduleList:any[];


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


  mortagestatusValid=true;
  mortgageregValid=true;
  balanceamountValid=true;
  servicechargesValid=true;
  paidamountValid=true;
  bankValid=true;
  mortgageamountValid=true;
  preclosureValid=true;
  paymentscheduleValid=true;
  dateValid=true;
  amountValid=true;
  scannedTitleDeedValid=true;
  formValid=true;
  scannednocuploadPath:string;
  bankOtherValid:string;


  constructor(private myToast:ToasterServiceService,private route:ActivatedRoute,private sellerService:SellerService,private propertyService:PropertyService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }

  propertyFinancialDTO=new PropertyFinancialDTO();
  selectedMorgageNoc: FileList
  morgageNocFile:File;
  action:string;



  ngOnInit() {
    this.action='';
    this.action=this.route.snapshot.params['action'];
    console.log(this.action);
    if(this.action=='back'||this.action=='next'){
        console.log('Inside Action');
          this.getPropertyFinancialDetails();
      }//end of back if

      this.bankList=[
       'Abu Dhabi Commercial Bank',
       'Abu Dhabi Islamic Bank',
       'Ajman Bank',
       'Al Ahli Bank of Kuwait',
       'Al Hilal Bank',
       'Al Khaliji (France) S. A.',
       'Al Masraf',
       'Arab African International Bank',
       'Arab Bank PLC',
       'Arab Emirates Investment Bank',
       'Bank Meli Iran',
       'Bank of Baroda',
       'Bank of Sharjah',
       'Bank Saderat Iran',
       'Barclays',
       'Blom Bank France',
       'BNP Paribas',
       'Citibank',
       'Commercial Bank International',
       'Commercial Bank of Dubai',
       'Credit Agricole - Corporate and Investment Bank',
       'Doha Bank',
       'Dubai Bank',
       'Dubai Islamic Bank',
       'El Nilein Bank',
       'Emirates Bank International / meBank',
       'Emirates Islamic Bank',
       'Emirates NBD Bank',
       'First Gulf Bank',
       'Habib Bank Ltd.',
       'HSBC Bank Middle East',
       'Invest Bank',
       'Janata Bank',
       'Lloyds TSB Bank',
       'Mashreq Bank',
       'National Bank of Abu Dhabi',
       'National Bank of Bahrain',
       'National Bank of Fujairah',
       'National Bank of Kuwait.',
       'National Bank of Oman',
       'National Bank of Ras Al Khaimah (RAKBank)',
       'National Bank of Sharjah',
       'National Bank of Umm Al Quwain',
       'Noor Islamic Bank',
       'Rafidain Bank',
       'RAKBANK',
       'Royal Bank of Scotland (RBS) (formerly ABN Amro)',
       'SAMBA',
       'Sharjah Islamic Bank',
       'Standard Chartered Bank',
       'The Royal Bank of Scotland N.V.',
       'Union National Bank',
       'United Arab Bank',
       'United Bank Limited',
       'Other'
      ];
      this.paymentScheduleList=[
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30'
       ];
  }


  selectMorgageNoc(event) {

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
          this.scannednocuploadPath = (<FileReader>event.target).result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
        this.selectedMorgageNoc = event.target.files;
        this.morgageNocFile=this.selectedMorgageNoc.item(0);
        this.propertyFinancialDTO.morgageNoc=this.morgageNocFile.name;
        this.scannednocuploadPath=''+this.token.getImagepath()+'propertyId-'+this.token.getPropertyId()+'/'+this.propertyFinancialDTO.morgageNoc;
        event.srcElement.value = null;
  }

  validation():boolean {
    console.log('Property Finanical Validations!');

  this.mortagestatusValid=true;
  if(this.propertyFinancialDTO.morgageStatus)
  {
  var mortgagestatus =this.propertyFinancialDTO.morgageStatus.match('[a-zA-Z]*');
  if(mortgagestatus["0"]!==this.propertyFinancialDTO.morgageStatus){
    this.myToast.Error('Invalid Mortgage Status');
    this.mortagestatusValid = false;
  }}

  else{

    this.myToast.Error('Mortgage Status Cannot Empty');
    this.mortagestatusValid=false;
  }
  this.mortgageregValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.mortgageregValid=true;
  }
   else{
  if(this.propertyFinancialDTO.morgageRegNo)
  {
  var mortgageregNo =this.propertyFinancialDTO.morgageRegNo.match('[a-zA-Z0-9_]*');
  if(mortgageregNo["0"]!==this.propertyFinancialDTO.morgageRegNo){
    this.myToast.Error('Invalid Mortgage Reg.No');
    this.mortgageregValid= false;
  }}

  else{

    this.myToast.Error('Mortgage Reg.No Cannot Empty');
    this.mortgageregValid= false;
  }}


  this.balanceamountValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.balanceamountValid=true;
  }
  else{
  if(this.propertyFinancialDTO.balanceAmount)
  {
  var stringbalanceamount = this.propertyFinancialDTO.balanceAmount.toString();
  var balanceamount =stringbalanceamount.match('[0-9_]*');
  if(balanceamount ["0"]!==this.propertyFinancialDTO.balanceAmount){
    this.myToast.Error('Invalid Balance Amount');
    this.balanceamountValid= false;
  }}

  else{

    this.myToast.Error('Balance Amount Cannot Empty');
    this.balanceamountValid= false;
  }}

  this.servicechargesValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.servicechargesValid=true;
  }
  else{
  if(this.propertyFinancialDTO.serviceCharge)
  {
  var stringservicecharge=this.propertyFinancialDTO.serviceCharge.toString();
  var servicecharges =stringservicecharge.match('[0-9_]*');
  if(servicecharges["0"]!==this.propertyFinancialDTO.serviceCharge){
    this.myToast.Error('Invalid Service Charge');
    this.servicechargesValid= false;
  }}

  else{

    this.myToast.Error('Service Charges Cannot Empty');
    this.servicechargesValid= false;
  }}

  this.paidamountValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.paidamountValid=true;
  }
else{
  if(this.propertyFinancialDTO.paidAmount)
  {
  var stringpaidamount=this.propertyFinancialDTO.paidAmount.toString();
  var paidamount =stringpaidamount.match('[0-9_]*');
  if(paidamount["0"]!==this.propertyFinancialDTO.paidAmount){
    this.myToast.Error('Invalid Paid Amount');
    this.paidamountValid=false;
  }}}

  this.bankValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.bankValid=true;
  }
  else{
  if(this.propertyFinancialDTO.bank)
  {
  // var bank =this.propertyFinancialDTO.bank.match('[a-zA-Z]*');
  // if(bank["0"]!==this.propertyFinancialDTO.bank){
  //   this.myToast.Error('Invalid Bank');
    this.bankValid=true;
  }}

  this.mortgageamountValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.mortgageamountValid=true;
  }
  else{
  if(this.propertyFinancialDTO.morgageAmount)
  {
  var stringmorgageamount=this.propertyFinancialDTO.morgageAmount.toString();
  var morgageamount = stringmorgageamount.match('[0-9_]*');
  if(morgageamount["0"]!==this.propertyFinancialDTO.morgageAmount){
    this.myToast.Error('Invalid Morgage Amount');
    this.mortgageamountValid=false;
  }}}

  this.preclosureValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.preclosureValid=true;
  }
  else{
  if(this.propertyFinancialDTO.preClosureCharges)
  {
  var stringpreclosurecharges=this.propertyFinancialDTO.preClosureCharges.toString();
  var preclosurecharges= stringpreclosurecharges.match('[0-9_]*');
  if(preclosurecharges["0"]!==this.propertyFinancialDTO.preClosureCharges){
    this.myToast.Error('Invalid Pre Closure Charges');
    this.preclosureValid=false;
  }}}

  this.paymentscheduleValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.paymentscheduleValid=true;
  }
  else{
  if(this.propertyFinancialDTO.paymentSchedule)
  {
  // var paymentschedule = this.propertyFinancialDTO.paymentSchedule.match('[a-zA-Z]*');
  // if(paymentschedule["0"]!==this.propertyFinancialDTO.paymentSchedule){
  //   this.myToast.Error('Invalid Payment Schedule');
    this.paymentscheduleValid=true;
  }}

  this.dateValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.dateValid=true;
  }
  else{
  if(this.propertyFinancialDTO.date)
  {
  var stringdate=this.propertyFinancialDTO.date.toString();
  var date = stringdate.match('[0-9//]*');
  if(date["0"]!==this.propertyFinancialDTO.date){
    this.myToast.Error('Invalid Date');
    this.dateValid=false;
  }}}

  this.amountValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.amountValid=true;
  }
  else{
  if(this.propertyFinancialDTO.amount)
  {
  var stringamount=this.propertyFinancialDTO.amount.toString();
  var amount = stringamount.match('[0-9]*');
  if(amount["0"]!==this.propertyFinancialDTO.amount){
    this.myToast.Error('Invalid Amount');
    this.amountValid=false;
  }}}
   
  this.bankValid=true;
  if(this.propertyFinancialDTO.bank=='Other'){
  if(this.propertyFinancialDTO.bankOther)
  {
  // var mortgageregNo =this.propertyFinancialDTO.morgageRegNo.match('[a-zA-Z0-9_]*');
  // if(mortgageregNo["0"]!==this.propertyFinancialDTO.morgageRegNo){
  //   this.myToast.Error('Invalid Mortgage Reg.No');
      this.bankValid=true;
  }

  else{

    this.myToast.Error('Financing Other Cannot Empty');
    this.bankValid=false;
  }}

  this.scannedTitleDeedValid=true;
  if(this.propertyFinancialDTO.morgageStatus=="No"){
    this.scannedTitleDeedValid=true;
  }
  else{
  if(this.propertyFinancialDTO.morgageNoc==null||this.propertyFinancialDTO.morgageNoc==undefined)
  {
    this.myToast.Error('Scanned Title Deed Required!');
    this.scannedTitleDeedValid=false;
  }}

  if(this.mortagestatusValid==false||this.mortgageregValid==false||this.balanceamountValid==false
  ||this.servicechargesValid==false||this.paidamountValid==false||this.mortgageamountValid==false
  ||this.preclosureValid==false||this.dateValid==false||this.amountValid==false||this.scannedTitleDeedValid==false){

    this.formValid=false;
  }
  else{
    this.formValid=true;
  }

  return this.formValid;
  }

  addPropertyFinancialDetails(): string {
    if(this.token.getuserName()==null){
      console.log('Invalid Session');
      return "Invalid Session";
    }

    if(this.validation()==true){

    }
    else {
      return "Invalid Property Finanical Form";
    }

    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          //for testing
          this.propertyFinancialDTO.propertyId=this.token.getPropertyId();
          this.propertyFinancialDTO.userName=this.token.getuserName();
          this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/','PropertyFinancials-morgageNocCopy'+this.token.getPropertyId(),this.token.getuserName(),this.morgageNocFile).subscribe(
            data2=>{
                        if(data2.type==3){
                          console.log(data2);
                          this.propertyFinancialDTO.morgageNoc=data2.partialText;
                          this.propertyFinancialDTO.userName=this.token.getuserName();
                          this.propertyService.updatePropertyFinancials(this.propertyFinancialDTO).subscribe(
                            propertyFinancialData=>{
                                    console.log(propertyFinancialData);
                                   if(propertyFinancialData.msg=='Property Financial Detail Updated Successfully'){
                                    this.myToast.Info('Property Status','Property Financial Details Added Successfully');
                                    this.router.navigate(['/propertyRental']);
                                   }
                                  }//end of propertyFinancialData
                        );//end of subscription of property financial Details
                        }//end of if of data type
                        else if(data2=='Data'){
                          this.propertyService.updatePropertyFinancials(this.propertyFinancialDTO).subscribe(
                            propertyFinancialData=>{
                                    console.log(propertyFinancialData);
                                   if(propertyFinancialData.msg=='Property Financial Detail Updated Successfully'){
                                    this.myToast.Info('Property Status','Property Financial Details Added Successfully');
                                    this. router.navigate(['/propertyRental/next']);
                                   }
                                  }//end of propertyFinancialData
                        );//end of subscription of property financial Details
                        }
            }//end of data2
          );//end of save document subscription

        }//end of if

     }//end of outer data predicate
    );//end of outer subscription
    return "";
  }//end of loginChiraghUser


  getPropertyFinancialDetails(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
          this.propertyService.getPropertyFinancialById(this.token.getPropertyId(),this.token.getuserName()).subscribe(
            financialData=>{
              console.log(financialData);
              this.propertyFinancialDTO=financialData;
              this.scannednocuploadPath=''+this.token.getImagepath()+'propertyId-'+this.token.getPropertyId()+'/'+this.propertyFinancialDTO.morgageNoc;
              this.myToast.Info('Property Status','Property Financial Details Data Loaded Successfully');
            }
          );
        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser



}
