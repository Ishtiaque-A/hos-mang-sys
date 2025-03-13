<!DOCTYPE html>
<html>
<head>
    <title>Prescription</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <style>
                .prescription-container {
                    width: 600px;
                    margin: 15px;
                    margin: 0 auto;
                    display: block;
                }
                .prescription__doctor__info{
                    display: flex ;
                    justify-content: space-between
                }
                .prescription__doctor__info__name p {
                    margin-bottom: 1rem !important;
                }

                .prescription__doctor__info__name .bmdc-no {
                    font-weight: 600;
                }

                .prescription__patient__info__name .p-title {
                    width: 90px;
                    display: inline-block;
                }

                .prescription__patient__info__name b {
                    width: 120px;
                    display: inline-block;
                    margin-left: 20px;
                }

                .prescription__patient__info__name p {
                    margin-bottom: 0.1rem !important;
                }

                .prescription__patient__info__name .patient-date {
                    font-weight: 600;
                    display: inline-block;
                    font-size: 16px;
                    margin-top: 20px;
                }

                .prescription__patient__info__id__image__container .qr-code-img {
                    height: 50px;
                    width: 50px;
                    display: block;
                    margin: 0 auto;
                    margin-bottom: 10px;
                }

                .prescription__patient__info__id__image__container p {
                    margin-bottom: 0rem !important;
                }

                .prescription__patient__info__id__image__container span {
                    font-weight: 600;
                    display: inline-block;
                    font-size: 16px;
                }


                .prescription__medicine__info .form-check .form-check-label {
                    min-height: 18px;
                    display: block;
                    margin-left: 1rem;
                    font-size: 16px;
                    font-weight: 600;
                }

                .prescription__medicine__info .form-check-input {
                    width: 1.5em;
                    height: 1.5em;
                }

                .prescription__medicine__container {
                    position: relative;
                    overflow: hidden;
                }

                .prescription__medicine__container img {
                    margin-top: -30px;
                    position: absolute;
                    height: 100%;
                }

                .prescription__medicine p {
                    margin-bottom: 0rem !important;
                    font-weight: 400;
                }

                .prescription__medicine {
                    width: 375px;
                    border-bottom: 2px solid #747474;
                    margin: 0 auto;

                }

                .prescription__medicine__details {
                    z-index: 50;
                    min-height: 300px;
                }

                .prescription__doctor__sign {
                    width: 375px;
                    margin-left: 60px;
                }


                .prescription__barcode__section {
                    width: 350px;
                    margin: 0 auto;
                    text-align: center;
                }

                .prescription__barcode__section p {
                    font-weight: 500;
                }

                media print {
                    .prescription-container {
                        display: block;
                        width: 800px;
                        margin-top: 15px;
                    }

                    .newHeight {
                        margin-top: 400px;
                    }

                }


                .PresDetails_main {
                    border: 1px solid #fbf0d0;
                    border-radius: 10px;
                    padding: 12px;
                }


                .infoIcon {
                    color: rgb(53, 53, 53);
                    cursor: pointer;
                    font-size: 20px !important;
                }


                .jss27 {
                    z-index: 0 !important;
                }

                .pdetails_header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                }

                .PresDetails_single {
                    border: none;
                    border-radius: 10px;
                    box-shadow: 1px 2px 3px #968e8e;
                    padding: 10px;
                    margin-bottom: 13px;
                    text-align: center;
                }

                .PresDetails_single:hover {
                    border: none;
                    border-radius: 10px;
                    box-shadow: 2px 5px 7px #968e8e;
                    padding: 10px;
                    margin-bottom: 13px;
                }

                .PresDetails_single p {
                    margin-bottom: 5px;
                }


                .doctosNote {
                    border: none;
                    border-radius: 10px;
                    box-shadow: 1px 2px 3px #968e8e;
                    padding: 10px;
                    margin-bottom: 13px;
                }

                .doctosNote h6 {
                    color: darkslateblue;
                    margin-left: 35%;
                }

                .doctosNote:hover {
                    border: none;
                    border-radius: 10px;
                    box-shadow: 2px 5px 7px #968e8e;
                    padding: 10px;
                    margin-bottom: 13px;
                }

                p.handwrite_tag {
                    border-top: 2px solid #747474;
                    border-bottom: 2px solid #747474;
                    margin-bottom: 45px !important;
                    margin-top: 5px;
                }
    </style>
</head>
<body>
    <div class="prescription-container">
        <div class="prescription__doctor__info">
          <div class="prescription__doctor__info__name">
            <h6> {{$docdata['dr_given_name']}} {{$docdata['dr_last_name']}}</h6>
            <p>MBBS, FRACGP</p>
            <span class="bmdc-no">
              BMDC No. : {{$docdata['dr_bmdc_reg_no']}}
            </span>
          </div>
          <div class="prescription__doctor__info__address">
            <span class="float-end font-weight-bold">Chamber</span>
            <br />
            <span class="float-end">
                doctorData.dr_address_line_1
            </span>
            <br />
            <span class="float-end">
      
              Ph: {{$docdata['dr_mobile_phone']}}
            </span>
            <br />
        
          </div>
        </div>
        <hr />
        <div class="prescription__doctor__info">
          <div class="prescription__patient__info__name">
            <h6>Patient HN : {{$patientInfo['patient_hn_number']}}</h6>
            <p class="mt-2">
              
              <span class="p-title">Patient name </span> :
              <b>{{ $patientInfo['patient_first_name']}} {{ $patientInfo['patient_last_name']}}</b>
             
            </p>
            <p class="mt-2">
              <span class="p-title">Address </span> : <b>{{ $patientInfo['patient_address1']}}</b>
            </p>
            <span class="mt-2 patient-date">
              Date: {{date("d-m-Y")}}
            </span>
          </div>
          <div class="prescription__patient__info__id">
            <div class="prescription__patient__info__id__image__container text-center">
              <div>
                
              </div>
  
              {{-- <img src={logo} alt="" />  --}}
              <p>MHP Hospital</p>
              <span>Script ID: 123456</span>
            </div>
          </div>
        </div>
        <div class="prescription__medicine__info">
          <div class="form-check mt-3">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label class="form-check-label">
              Brand substitution not permitted
            </label>
          </div>

          <div class="full-prescription">
            <div class="prescription__medicine__container d-flex justify-content-center">
              {{-- <img class="img-fluid" src={bg} alt="" /> --}}
              <div class="prescription__medicine__details">

    
                @foreach ($medicen as $item)
                <div class="prescription__medicine mt-3">
                    <p>{{$item['drug_name']}} </p>
          <p>{{$item['dose']}}  {{$item['frequency']}} {{$item['food']}}</p>

          <p>
            Quantity: {{$item['quantity']}}  Repeats: {{$item['repeats']}}
          </p>
       
        </div>
@endforeach
               
               
              
                    
           
              
              </div>
            </div>
            <div class="prescription__doctor__sign mt-3">
              <h6 class="mt-5"> {{$docdata['dr_given_name']}}</h6>
       
            </div>
            <h6 class="mt-2 float-end">Turn over for privacy notice</h6>
            <div class="prescription__barcode__section">
              <br>
              <br>
              <svg ref={inputRef} ></svg>
              <br>
              <p>
                Issued under : The Drugs (Control) Ordinance, 1982 <br /> (Ordinance
                NO. VIII OF 1982 ) Section 14A
              </p>
            </div>
          </div>
        
        </div>
      </div>
  
</body>
</html>