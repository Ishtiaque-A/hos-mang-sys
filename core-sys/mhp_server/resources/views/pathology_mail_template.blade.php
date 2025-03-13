<!DOCTYPE html>
<html>

<head>
    <title>Pathology Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
        }

        .container {
            max-width: 90%;
            margin: 20px auto;
            padding: 40px 10px;
        }

        .header {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #DEE2E6;
        }

        .signature-box {
            width: 200px;
            /* height: 200px; */
            border-bottom: 1px dashed #DEE2E6;

        }

        .logo-container {
            width: 30%;
        }

        .logo {
            width: 40%;
        }

        .clinic-info-container {
            width: 30%;
            line-height: 20px;
        }

        .patient-info-container {
            width: 30%;
            text-align: left;
            line-height: 20px;
        }

        .info-container {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .table-container-left {
            width: 100%;
            border-collapse: collapse;
        }

        h2 {
            margin: 0;
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
        }

        .input {
            display: inline-block;
            margin-bottom: -6px;
            border: 0px;
            outline: 0px;
        }

        .other-info {
            border: 1px solid #DEE2E6;
            padding:10px;
            float: right;
            position: absolute; 
            right: 0px; 
            left: 70%;
            bottom: 0px;
            top: 0px;
            width: 25%;
            /* margin-left: 20px; */
            min-height: 200px;
            border-radius: 10px;
        }

        .other-info p {
            line-height: 25px;
        }

        .footer {
            border: 1px solid #DEE2E6;
            padding: 15px 10px;
            margin: 20px 0;
            border-radius: 7px;
        }

        .left-table-parent {
            width: 67%;
            float: left;
            border: 1px solid #DEE2E6;
            padding: 10px;
            border-radius: 10px;
        }

        .other-text-container {
            border: 1px solid #DEE2E6;
            padding: 10px;
            border-radius: 7px;
        }

        ol li,
        p {
            font-size: 12px;
            font-weight: normal;
        }

        h2 {
            font-size: 16px;
            font-weight: 600;
        }
    </style>

</head>

<body>
    <div class="container">

        <!-- header  -->
        <div class="header">
            <table style="width: 100%;">
                <tr>
                    <td class="logo-container">
                        <img src="{{ $image }}" alt="logo"  height="50px">
                    </td>
                    <td class="clinic-info-container">
                        <h2 style="margin: 0;padding: 0; line-height: 16px;">{{$labratory_name?? 'N/A'}}</h2>
                        <p>Fax: {{$fax ?? 'N/A'}}</p>
                        <p>Mobile: {{$phone ?? 'N/A'}}</p>
                        <p>Email: {{$email ?? 'N/A'}}</p>
                        <p>Address: {{$address ?? 'N/A'}}</p>
                        <p>Website: {{$websiteLink ?? 'N/A'}}</p>
                    </td>
                    <td class="patient-info-container">
                        <h2 style="margin: 0; padding: 0;line-height: 16px;">
                            {{
                                $patientName ?? 'N/A'
                            }}
                        </h2>
                        <p>Mobile: {{$patient_mobile ?? 'N/A'}}</p>
                        <p>Gender: {{$patient_gender ?? 'N/A'}}</p>
                        <p>Date of Birth: {{ optional(\Carbon\Carbon::parse($patient_birth))->format('d/m/Y') ?? 'N/A' }}</p>
                        <p>Date:{{ $center_date ?? 'N/A' }}</p>
                        <p>{{$concession? 'Billed as concession: '. $concession.' TK' :'' }}</p>
                    </td>
                </tr>
            </table>
        </div>
        <div style="width: 100%; position: relative; height: 550px">
            <div 
            class="left-table-parent"
            >
                <ol >
                    @forelse($pathologies as $pathologyItem)
                        <li>
                            {{ $pathologyItem['pathology_test_name'] ?? 'N/A' }}
                            <div style="width: 100%;">
                            <div
                            style="
                            padding: 10px;
                            border: 1px solid #DEE2E6;
                            border-radius: 7px;
                            width: 100%;
                            "
                            > Note:{{  "  ".$pathologyItem['additional_test_name'] ?? 'N/A' }}
                            </div>
                            </div>
                        </li>
                        <br>
                    @empty
                        <li>No radiology items found.</li>
                    @endforelse
                </ol>
            </div>
            <div class="other-info">
                <p>Fasting: {{ $fasting ?? 'N/A' }}</p>
                @if ($pregnant)
                    <p>Pregnant: {{ $pregnant == '1' ? 'Yes' : 'No' }}</p>
                @endif
                <p>{{ $lmpDate ? 'LMP Date: ' . \Carbon\Carbon::createFromFormat('d/m/Y', $lmpDate)->format('d/m/Y') : '' }}</p>
                <p>{{ $edcDate ? 'EDC Date: ' . \Carbon\Carbon::createFromFormat('d/m/Y', $edcDate)->format('d/m/Y') : '' }}</p>
            </div>            
        </div>
        <br>
        <div class="signature-box"></div>
        <h2>{{$doctorName?? ''}}</h2>
        <p style="text-align: center; margin-top: 10px; font-size: 12px">
            Please upload the report via following link
            <a style="text-decoration: none" href="https://externallab.macrohealthplus.org/" target="_blank">
              https://externallab.macrohealthplus.org/
            </a>
          </p>
          <div style="margin-top:10px">
            <div
              style="
                padding: 10px;
                border: 1px solid #DEE2E6;
                border-radius: 7px;
                width: 50%;
                margin: 0 auto;
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: start;
                  align-items: center;
                  gap: 10px;
                  width: 100%;
                "
              >
                <span style="width: 30%; font-size:12px">Organization</span>
                <span style="width: 70%; font-size: 12px">: {{$organization_name??""}} {{$branch_code??""}}</span>
              </div>
              <div
              style="
              display: flex;
              justify-content: start;
              align-items: center;
              gap: 10px;
              width: 100%;
            "
              >
                <span style="width: 30%; font-size:12px">Doctor ID</span>
                <span style="width: 70%; font-size: 12px">
                  : {{$doctor_id??""}}
                </span>
              </div>
              <div
              style="
              display: flex;
              justify-content: start;
              align-items: center;
              gap: 10px;
              width: 100%;
            "
              >
                <span style="width: 30%; font-size:12px">Patient HN</span>
                <span style="width: 70%; font-size: 12px">
                  : {{$patient_hn??""}}
                </span>
              </div>
            </div>
          </div>

        <div class="footer">
            <p >
                Thank you for choosing our services. We are committed to providing you with the highest level of care and professionalism.
                If you have any questions or concerns, please do not hesitate to contact us.
                Your health and satisfaction are our top priorities.
            </p>
        </div>
        <br><br><br><br><br> <br><br><br><br><br><br><br><br><br>

    </div>

</body>

</html>