import { ToasterServiceService } from './../../toaster-service.service';
import { SellerService } from './../../shared/seller.service';
import { Component, OnInit } from '@angular/core';
import { PropertyDetailsDto } from './propertymodel';
import { PropertyService } from '../../shared/property.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { TokenStorage } from '../../core/token.storage';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

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

  propertyDetailsDto=new PropertyDetailsDto();
  action:string;
  selectedScannedTitleDeed: FileList;
  scannedTitleDeedFile:File;
  scannedFloorPlanFile:File;
  selectedFloorPlan:FileList;
  scannedtitledeeduploadPath:string;
  titledeeduploadPath:string;
  floorplanPath:string;

  propertystatusValid=true;
  plotnoValid=true;
  titledeednoValid=true;
  addressValid=true;
  propertynoValid=true;
  typeofpropertyValid=true;
  projectnameValid=true;
  areaValid=true;
  unitValid=true;
  typeofareaValid=true;
  ownerassociationValid=true;
  presentuseValid=true;
  communitynoValid=true;
  propertyapproxageValid=true;
  descriptionValid=true;
  bedroomValid=true;
  bathroomValid=true;
  scannedtitledeeduploadValid=true;
  formValid=true;
  bulidingnumberValid=true;
  bulidingnameValid=true;
  propertystatusotherValid=true;
  typepropertyotherValid=true;
  grossAreaValid=true;
  netAreaValid=true;
  

  paymentScheduleList:any[];


  constructor(private myToast:ToasterServiceService,private sellerService:SellerService,private route:ActivatedRoute,private propertyService:PropertyService,private http: HttpClient,private router: Router, private authService: AuthService, private token: TokenStorage) { }

  ngOnInit() {

    if(this.propertyDetailsDto.scannedTitleDeed==null && this.propertyDetailsDto.floorplanupload==null)
    {
      this.titledeeduploadPath=null;
      this.floorplanPath=null;
    }
    else{
    this.titledeeduploadPath=''+this.token.getImagepath()+'propertyId-'+this.propertyDetailsDto.propertyId+'/'+this.propertyDetailsDto.scannedTitleDeed;
    this.floorplanPath=''+this.token.getImagepath()+'propertyId-'+this.propertyDetailsDto.propertyId+'/'+this.propertyDetailsDto.floorplanupload;}
    this.action='';
    this.action=this.route.snapshot.params['action'];
    console.log(this.action);
    if(this.action=='back'||this.action=='next'){
        console.log('Inside Action');
        this.getEnteredProperty();
      }//end of back if
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
        '13'
       ];
  }
  
  selectScannedTitleDeed(event):string {

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
          this.titledeeduploadPath = (<FileReader>event.target).result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    this.selectedScannedTitleDeed = event.target.files;
    this.scannedTitleDeedFile=this.selectedScannedTitleDeed.item(0);
    this.propertyDetailsDto.scannedTitleDeed=this.scannedTitleDeedFile.name;
    this.titledeeduploadPath=''+this.token.getImagepath()+'propertyId-'+this.propertyDetailsDto.propertyId+'/'+this.propertyDetailsDto.scannedTitleDeed;
    //this.floorplanPath=''+this.token.getImagepath()+'propertyId-'+this.propertyDetailsDto.propertyId+'/'+this.propertyDetailsDto.floorplanupload;
    event.srcElement.value = null;
  }
 
  selectFloorPlan(event):string {

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
          this.floorplanPath= (<FileReader>event.target).result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
        this.selectedFloorPlan = event.target.files;
        this.scannedFloorPlanFile=this.selectedFloorPlan.item(0);
        this.propertyDetailsDto.floorplanupload=this.scannedFloorPlanFile.name;
      // this.titledeeduploadPath=''+this.token.getImagepath()+'propertyId-'+this.propertyDetailsDto.propertyId+'/'+this.propertyDetailsDto.scannedTitleDeed;
        this.floorplanPath=''+this.token.getImagepath()+'propertyId-'+this.propertyDetailsDto.propertyId+'/'+this.propertyDetailsDto.floorplanupload;
        event.srcElement.value = null;
  }
  


  validation():boolean {
    console.log('Property Details Validations!');

    this.propertystatusValid=true;
    if(this.propertyDetailsDto.propertyStatus)
    {
     // var propertystatus =this.propertyDetailsDto.propertyStatus.match('[a-zA-Z]*');
    //if(propertystatus["0"]!==this.propertyDetailsDto.propertyStatus){
      this.propertystatusValid=true;
    }
    else{

      this.myToast.Error('Property Status Cannot Empty');
      this.propertystatusValid=false;
    }

    this.plotnoValid=true;
    if(this.propertyDetailsDto.plotNo)
    {
    var plotno =this.propertyDetailsDto.plotNo.match('[a-zA-Z0-9]*');
    if(plotno["0"]!==this.propertyDetailsDto.plotNo){
      this.myToast.Error('Plot Number Must Be Alpha Numeric');
      this.plotnoValid=false;
    }}
    else{

      this.myToast.Error('Plot Number Cannot Empty');
      this.plotnoValid=false;
    }

    this.titledeednoValid=true;
    if(this.propertyDetailsDto.titleDeedNo)
    {
      this.titledeednoValid=true;
    }
    else{

      this.myToast.Error('Title Deed Cannot Empty');
      this.titledeednoValid=false;
    }

    this.addressValid=true;
    if(this.propertyDetailsDto.address)
    {
   // var address =this.propertyDetailsDto.address.match('[a-zA-Z0-9_//"".,()%#$!`]*');
      this.addressValid=true;
    }
    else{

      this.myToast.Error('Address Cannot Empty');
      this.addressValid=false;
    }

    this.propertynoValid=true;
    if(this.propertyDetailsDto.propertyNo)
    {
    var propertyno =this.propertyDetailsDto.propertyNo.match('[a-zA-Z0-9]*');
    if(propertyno["0"]!==this.propertyDetailsDto.propertyNo){
      this.myToast.Error('Invalid Property Number');
      this.propertynoValid=false;
    }}
    else{

      this.myToast.Error('Property Number Cannot Empty');
      this.propertynoValid=false;
    }

    this.typeofpropertyValid=true;
    if(this.propertyDetailsDto.propertyType)
    {
      this.typeofpropertyValid=true;
    }
    else{

      this.myToast.Error('Property Type Cannot Empty');
      this.typeofpropertyValid=false;
    }

    this.projectnameValid=true;
    if(this.propertyDetailsDto.projectName)
    {
    var projectName=this.propertyDetailsDto.projectName.match('[a-zA-Z0-9]*');
    if(projectName["0"]!==this.propertyDetailsDto.projectName){
      this.myToast.Error('Invalid Project Name');
      this.projectnameValid=false;
    }}
    else{

      this.myToast.Error('Project Name Cannot Empty');
      this.projectnameValid=false;
    }

    this.areaValid=true;
    if(this.propertyDetailsDto.area)
    {
    var area=this.propertyDetailsDto.area.match('[0-9.]*');
    if(area["0"]!==this.propertyDetailsDto.area){
      this.myToast.Error('Invalid Area');
      this.areaValid=false;
    }}
    else{

      this.myToast.Error('Area Cannot Empty');
      this.areaValid=false;
    }

    this.unitValid=true;
    if(this.propertyDetailsDto.areaUnit)
    {
      console.log(this.propertyDetailsDto.areaUnit);
    // var areaUnit=this.propertyDetailsDto.areaUnit.match('[a-z]*');
    // if(areaUnit["0"]!==this.propertyDetailsDto.areaUnit){
    //   this.myToast.Error('Invalid Area Unit');
      this.unitValid=true;
    }
    else{
      console.log(this.propertyDetailsDto.areaUnit);
      this.myToast.Error('Area unit Cannot Empty');
      this.unitValid=false;
    }

    this.typeofareaValid=true;
    if(this.propertyDetailsDto.typeArea)
    {
      this.typeofareaValid=true;
    }

    this.ownerassociationValid=true;
    if(this.propertyDetailsDto.ownerAssociationNo)
    {
      this.ownerassociationValid=true;
    }

    this.presentuseValid=true;
    if(this.propertyDetailsDto.presentUse)
    {
    // var presentUse=this.propertyDetailsDto.presentUse.match('[a-zA-Z]*');
    // if(presentUse["0"]!==this.propertyDetailsDto.typeArea){
    //   this.myToast.Error('Invalid Present Use');
      this.presentuseValid=true;
    }

    this.communitynoValid=true;
    if(this.propertyDetailsDto.communityNo)
    {
      this.communitynoValid=true;
    }

    this.propertyapproxageValid=true;
    if(this.propertyDetailsDto.communityNo)
    {
      this.propertyapproxageValid=true;
    }
   this.descriptionValid=true;
   if(this.propertyDetailsDto.description)
   {
    if(this.propertyDetailsDto.description.length>200){
      this.myToast.Error('Description cannot be more than 200 characters long');
      this.descriptionValid=false;
    }}

    this.scannedtitledeeduploadValid=true;
    if(this.propertyDetailsDto.scannedTitleDeed==null||this.propertyDetailsDto.scannedTitleDeed==undefined)
    {
      this.myToast.Error('Scanned Title Deed Upload Required');
      this.scannedtitledeeduploadValid=false;

    }

    this.bedroomValid=true;
    if(this.propertyDetailsDto.noOfBedrooms)
    {
    var tostringbed=this.propertyDetailsDto.noOfBedrooms.toString();
    var noBedrooms=tostringbed.match('[0-9]*');
    if(noBedrooms["0"]!==tostringbed){
      this.myToast.Error('Invalid Bedroom Number');
      this.bedroomValid=false;
    }}

    else{
      this.myToast.Error('Bedrooms Cannot Empty');
      this.bedroomValid=false;
    }

    this.bathroomValid=true;
    if(this.propertyDetailsDto.noOfBaths)
    {
    var tostringbath=this.propertyDetailsDto.noOfBaths.toString();
    var noOfBaths=tostringbath.match('[0-9]*');
    if(noOfBaths["0"]!==tostringbath){
      this.myToast.Error('Invalid Bathroom Number');
      this.bathroomValid=false;
    }}

    else{
      this.myToast.Error('BathroomsCannot Empty');
      this.bathroomValid=false;
    }


    this.propertystatusotherValid=true;
    if(this.propertyDetailsDto.propertyStatus=='Other')
    {
    if(this.propertyDetailsDto.propertyStatusOther)
    {
   
      this.propertystatusotherValid=true;
    }
    else{

      this.myToast.Error('Property Status Other Field Cannot Empty');
      this.propertystatusotherValid=false;
    }}

    this.typepropertyotherValid=true;
    if(this.propertyDetailsDto.propertyType=='Other'){
    if(this.propertyDetailsDto.typePropertyOther)
    {
      this.typepropertyotherValid=true;
    }
    else{

      this.myToast.Error('Type Property Other Field Cannot Empty');
      this.typepropertyotherValid=false;
    }}
   
    this.bulidingnameValid=true;
    if(this.propertyDetailsDto.bulidingName)
    {
    
      this.bulidingnameValid=true;
    }
    else{

      this.myToast.Error('Buliding Name Cannot Empty');
      this.bulidingnameValid=false;
    }

    this.bulidingnumberValid=true;
    if(this.propertyDetailsDto.bulidingNumber)
    {
    
      this.bulidingnumberValid=true;
    }
    else{

      this.myToast.Error('Buliding Number Cannot Empty');
      this.bulidingnumberValid=false;
    }


    this.grossAreaValid=true;
    if(this.propertyDetailsDto.propertyStatus=='Off-Plan'){
    if(this.propertyDetailsDto.grossArea)
    {
     var grossarea=this.propertyDetailsDto.grossArea.match('[0-9]*');
     if(grossarea["0"]!==this.propertyDetailsDto.grossArea){
      this.myToast.Error('Invalid Gross Area');
      this.grossAreaValid=false;
    }}
    else{
      this.myToast.Error('Gross Area Required');
      this.grossAreaValid=false;
     }}

    

    this.netAreaValid=true;
    if(this.propertyDetailsDto.propertyStatus !=='Off-Plan'){
    if(this.propertyDetailsDto.netArea)
    {
     var netarea=this.propertyDetailsDto.netArea.match('[0-9]*');
     if(netarea["0"]!==this.propertyDetailsDto.netArea){
      this.myToast.Error('Invalid Net Area');
      this.netAreaValid=false;
    }}
    else{
      this.myToast.Error('Net Area Required');
      this.netAreaValid=false;
     }}


    if(this.propertystatusValid==false||this.plotnoValid==false||this.titledeednoValid==false||this.addressValid==false||
    this.propertynoValid==false||this.typeofpropertyValid==false||this.projectnameValid==false||this.areaValid==false||
    this.unitValid==false||this.descriptionValid==false||this.scannedtitledeeduploadValid==false||this.propertystatusotherValid==false||this.typepropertyotherValid==false
    ||this.bulidingnameValid==false||this.bulidingnumberValid==false||this.grossAreaValid==false||this.netAreaValid==false||this.bedroomValid==false||this.bathroomValid==false)
    {
      this.formValid=false;
    }

    else{
      this.formValid=true;
    }


    return this.formValid;
  }

  addPropertyDetails(): string {
    if(this.token.getuserName()==null){
      console.log('Invalid Session');
      this.myToast.Error('User Status','Invalid Session');
      return "Invalid Session";
    }

    if(this.validation()==true){

    }
    else {
      return "Invalid Property Details Form";
    }


    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        console.log(data);
        if(this.token.getToken()!=null){
            this.propertyDetailsDto.propertyId=this.token.getPropertyId();
            this.propertyDetailsDto.userName=this.token.getuserName();
            this.propertyDetailsDto.isPropertyDetailsVerified='false';
            this.sellerService.saveDocument('/propertyId-'+this.token.getPropertyId()+'/','S-titleDeedCopy'+this.token.getPropertyId(),this.token.getuserName(),this.scannedTitleDeedFile).subscribe(
             fileNameData=>{
               console.log(fileNameData);
               if(fileNameData.type==3){
                    this.propertyDetailsDto.scannedTitleDeed=fileNameData.partialText;
                    this.propertyService.updateProperty(this.propertyDetailsDto).subscribe(
                    propertydata=>{
                        console.log(propertydata);
                        this.myToast.Info('Status','Property Details Added Successfully')
                        this.router.navigate(['/propertyFinancialDetails']);
                    }//end of propertydata
                  );//end of propertySubscription
               }//end of type check
               else if(fileNameData=='Data'){
                this.propertyService.updateProperty(this.propertyDetailsDto).subscribe(
                  propertydata=>{
                      console.log(propertydata);
                      this.myToast.Info('Status','Property Details Added Successfully');
                      this.router.navigate(['/propertyFinancialDetails/next']);
                  }//end of propertydata
                );//end of propertySubscription
               }//end of else if
             }//end of fileNameData
            );//end of title Deed Upload File
            }//end of if of token
     }//end of outer data predicate
    );//end of outer subscription
    return "";
  }//end of loginChiraghUser


  getEnteredProperty(): void {
    window.sessionStorage.removeItem('AuthToken');
    this.authService.attemptAuth().subscribe(
      data => {
        this.token.saveToken(data.access_token,data.refresh_token,data.expires_in);
        // console.log(data);
        if(this.token.getToken()!=null){
          this.propertyService.getPropertyById(this.token.getPropertyId(),this.token.getuserName()).subscribe(
            propertyDetailsData=>{
                if(propertyDetailsData.plotNo!=null){
                    console.log(propertyDetailsData);
                    this.propertyDetailsDto=propertyDetailsData;
                    this.myToast.Info('Status','Property data loaded Successfully');
                }//end of if of propertyDetailsData
             }//end of ownerData
         );//end of subscription of getOwners

        }//end of if
     }//end of outer data predicate
    );//end of outer subscription
  }//end of loginChiraghUser



}
