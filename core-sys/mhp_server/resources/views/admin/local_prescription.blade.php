<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Local Prescription</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,500;6..12,600&family=Roboto:wght@100;300;400;500;700;900&family=Tiro+Bangla:ital@1&display=swap" rel="stylesheet">
    <style type="text/css">
        .container {
            width: 100%;
        }

        .header {
            width: 100%;
        }

        .doctor-info,
        .address {
            width: 50%;
        }

        .address {
            text-align: right;
        }

        .doctor-name {
            font-size: 16px;
            font-weight: 500;
        }

        .header p,
        .footer p {
            padding: 0px;
            line-height: 13px;
            font-size: 14px;
            font-weight: normal;
            color: #2e2e2e;
        }

        .footer p {
            padding: 2px;
        }

        .patient-info table {
            width: 100%;
            border-bottom: 1px solid black;
            border-top: 1px solid black;
            margin: 10px 0px;
            padding: 5px;
        }

        tr td p {
            padding: 2px;
            line-height: 13px;
            font-size: 14px;
            font-weight: normal;
            color: #2e2e2e;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin: 0px;
            padding: 0px;
        }

        .body table tr td.left {
            width: 30%;
            position: relative;
        }

        /* .body table tr td.left div {
            position: absolute;
            top: 10px;
            left: 5px;
        } */

        .body table tr td.right {
            width: 70%;
            padding-left: 15px;
        }

        .body table tr td.left h2 {
            font-size: 16px;
            line-height: 15px;
            font-weight: 500;
            padding-bottom: 7px;
        }

        .medicin-list {
            color: #2e2e2e;
            /* width: 100%;
            margin-left: 20px; */
        }

        .medicin-list li {
            margin: 5px 0;
        }

        .medicin-list p,
        .medicin-list td {
            padding: 0;
            margin: 0;
            font-size: 14px;
            line-height: 8px;
            font-weight: normal;
            color: #2e2e2e;
        }

        .advice-title {
            font-size: 16px;
            font-weight: 500;
            line-height: 13px;
            color: #2e2e2e;
            margin: 10px 0;
        }

        .advice-list {
            margin: 0 0 0 15px;
            padding: 0;
        }

        .advice-list li {
            font-size: 10px;
            color: #2e2e2e;
            padding: 0ch;
            margin: 0ch;
            line-height: 0ch;
            font-weight: normal;
        }

        .footer {
            margin-top: 100px;
            background-color: white;
        }
        .footer-content {
            width: 100%;
        }

        .footer-content table {
            width: 100% !important;
        }
    </style>
</head>

<body>
    <div>
        @if (isset($data['use_header'])===1 || $data['use_header'] === 1)
            <br><br><br><br><br><br><br><br><br><br>
        @else
            <br><br><br><br><br><br>
        @endif
    </div>
    
    <div class="patient-info">
        <table style="width: 100%">
            <tr>
                <td>
                    <p><span>Patient Name: </span>{{ is_string($data['patientInfo']['name'] ?? "") ? htmlspecialchars($data['patientInfo']['name']) : 'N/A' }}</p>
                </td>
                <td>
                    <p><span>Gender: </span> {{ is_string($data['patientInfo']['sex']['birth_sex_name'] ?? "") ? htmlspecialchars($data['patientInfo']['sex']['birth_sex_name']) : 'N/A' }}</p>
                </td>
                <td>
                    <p><span>Age: </span>{{$data['patientAge']  ?? "N/A" }}</p>
                </td>
                <td>
                    <p><span>Weight: </span>{{"N/A" }}</p>
                </td>
            </tr>
        </table>
    </div>
    <br>
    <div style="position: relative">
        <table style="width: 100%; position: relative">
            <tr style="position: relative" >
                <td  style=" width: 30%">
                    <div style="position: absolute; top: 10px; left: 0px; right: 0px">
                        <div>
                            <img style="width: 100px; height: 40px; objectFit: contain; margin:0px auto;" height="30" width="70" src="{{ is_string($data['barCodeImage'] ?? '') ? htmlspecialchars($data['barCodeImage']) : '' }}" alt="">
                            <p style="font-size: 10px; margin:0;padding:0; text-align: center">&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; {{ is_string($data['prescriptionCode'] ?? '') ? htmlspecialchars($data['prescriptionCode']) : '' }}</p>
                        </div>
                    
                        @if(isset($data['chief_complaints']) && is_iterable($data['chief_complaints']) && count($data['chief_complaints']) > 0)
                            <h2 style="font-size: 12px; line-height: 15px; color:#2e2e2e">Chief Complaints:</h2>
                            <ol>
                                @foreach($data['chief_complaints'] as $complaint)
                                    <li style="font-size: 11px; line-height: 8px">{{ is_string($complaint ?? '') ? htmlspecialchars($complaint) : '' }}</li>
                                @endforeach
                            </ol>
                        @endif
                    
                        @if(isset($data['investigation']) && is_iterable($data['investigation']) && count($data['investigation']) > 0)
                            <h2 style="font-size: 12px; line-height: 15px; color:#2e2e2e">Investigation:</h2>
                            <ol>
                                @foreach($data['investigation'] as $invest)
                                    <li style="font-size: 11px; line-height: 8px">{{ is_string($invest ?? '') ? htmlspecialchars($invest) : '' }}</li>
                                @endforeach
                            </ol>
                        @endif
                    </div>
                    
                </td>
                <td class="right">
                    <div class="rx-logo">
                        <img src="{{ is_string($data['localPrescriptionImg'] ?? "") ? htmlspecialchars($data['localPrescriptionImg']) : "" }}" height="30" width="30" alt="">
                    </div>
                    <ol start="{{$startRxIndex}}" class="medicin-list" >
                        @forelse($data['medicines'] as $medicine)
                            <li style="margin:0 0 0 1px; display: block">
                                <div>
                                    <p>{{ is_string($medicine['brand_name'] ?? "") ? htmlspecialchars($medicine['brand_name']) : "N/A" }}</p>
                                    <p>{{ is_string($medicine['drug_name'] ?? "") ? htmlspecialchars($medicine['drug_name']) : "N/A" }}</p>
                                    <table style="width: 100%; margin-bottom:10px; ">
                                        <tr >
                                                
                                            
                                            @if (isset($medicine['Complex_instruction']))
                                                <td>
                                                    <span
                                                      style="display: inline-block; margin-right: 20px; font-size: 11px;"
                                                    >
                                                        <?= is_string($medicine['Complex_instruction'] ?? "") ? htmlspecialchars($medicine['Complex_instruction']) : "" ?>
                                                </span>
                                                </td>
                                            @else
                                                @if (isset($medicine['dose']) && $medicine['dose'] != '1')
                                                <td>
                                                    <span style="display: inline-block; margin-right: 20px; font-size: 11px;"><?= is_string($medicine['dose'] ?? "") ? htmlspecialchars($medicine['dose']) : "-" ?></span>
                                                </td>
                                                @endif
                                            <td>
                                                <span style="display: inline-block; margin-right: 20px; font-size: 11px;"><?= is_string($medicine['frequency'] ?? "") ? htmlspecialchars($medicine['frequency']) : "-" ?></span>
                                            </td>
                                           
                                            <td>
                                                <span style="display: inline-block; margin-right: 80px; font-size: 11px;">
                                                    <?= is_string($medicine['food'] ?? "") ? htmlspecialchars($medicine['food']) : "" ?>
                                                </span>
                                            </td> 
                                            @endif
                                            <td>
                                                <span
                                                style="display: inline-block; margin-right: 20px; font-size: 11px;"
                                                >
                                                    <?= (is_string($medicine['prn'] ?? "") && $medicine['prn'] != "") ? "(" . htmlspecialchars($medicine['prn']) . ")" : "" ?>
                                                </span>
                                            </td>
                                            <td>
                                                <span
                                                style="display: inline-block; margin-right: 80px; font-size: 11px;"
                                                >
                                                    <?= (is_string($medicine['route'] ?? "") && $medicine['route'] != "") ?  htmlspecialchars($medicine['route'])  : "" ?>
                                                </span>
                                            </td>
                                            <td style="text-align: right;">
                                                @php
                                                    $quantity = $medicine['quantity'] ?? '';
                                                    $repeats = $medicine['repeats'] ?? 0;
                                                    $repeatText = $repeats > 1 ? 'Repeats' : 'Repeat';
                                                @endphp
                                            
                                                @if(is_string($quantity))
                                                    <p style="text-align: right; font-size: 11px;">
                                                        {{ htmlspecialchars($quantity) }} X {{ $repeats }} {{ $repeatText }}
                                                    </p>
                                                @endif
                                            </td>
                                        </tr>
                                        </table>
                                </div>
                            </li>
                        @empty
                            <li>Medicine not found</li>
                        @endforelse
                    </ol>
                    @if ($showAdvices == 1  && count($data['advices']) > 0)
                    <br>
                        <h2 style="font-size: 12px; margin-top:15px; line-height: 15px; color:#2e2e2e">Advice:</h2>
                        <ol>
                            @forelse($data['advices'] as $advice)
                                <li style="font-size:11px; line-height: 8px">{{ is_string($advice['advise_name'] ?? "") ? htmlspecialchars($advice['advise_name']) : "" }}</li>
                            @empty
                                <li style="font-size:11px; line-height: 8px">Advice Not Available</li>
                            @endforelse
                        </ol>
                    @endif
                </td>
            </tr>
        </table>
    </div>
</body>

</html>
