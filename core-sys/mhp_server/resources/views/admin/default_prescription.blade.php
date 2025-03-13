<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Default Prescrption</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,500;6..12,600&family=Roboto:wght@100;300;400;500;700;900&family=Tiro+Bangla:ital@1&display=swap" rel="stylesheet">
    <style type="text/css">
        .container {
            max-width: 100%;
            margin: 20px auto;
            padding: 20px 10px;
        }

        .header {
            width: 100%;
            border-bottom: 1px solid #8f8f8f;
        }

        .clinic-info {
            text-align: end;
        }
        .clinic-info > p {
            text-align: end;
        }

        p {
            margin: 0;
        }

        .doctor-name {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 7px;
            padding: 0;

        }

        .prescription {
            width: 100%;
        }

        .qr-info {
            width: 50%;
            text-align: end;
        }

        .qr-info .qr {
            width: 200px;
            text-align: end;
        }

        .medicin {
            width: 100%;
        }

        .medicin .list {
            width: 70%;
            
            margin: auto;
            padding: 10px;
        }

        .box {
            border: 1px solid #8f8f8f;
            height: 16px;
            width: 16px;
            margin: 0 3px;
        }

        .footer {
            display: block;
            background-color: transparent;
            width: 100%; 
        }
        .qr-info p,
        .qr-info img,{
            text-align: end;
        }
        .qr-info p{
            text-align: end;
        }
        p, span, h1, h2, h3, h4, h5 ,h6{
            color: black !important;
        }
    </style>
</head>

<body>
    <div>
        <br><br><br><br>
        <div class="container" >
            <table class="prescription">
                <tr>
                    <td >

                        <table style="width: 60%">
                            <tr>
                             <td><span style="font-weight: 500; font-size: 10px;">Patient ID</span></td>
                             <td><span style="font-size: 10px;">: &nbsp; <?= is_string($patientInfo['patient_HN'] ?? "") ? htmlspecialchars($patientInfo['patient_HN']) : "N/A" ?></span> </td>   
                            </tr>
                            <tr>
                             <td><span style="font-weight: 500; font-size: 10px;">Patient Name</span></td>
                             <td><span style="font-size: 10px;">: &nbsp; <?= is_string($patientInfo['name'] ?? "") ? htmlspecialchars($patientInfo['name']) : "N/A" ?></span> </td>   
                            </tr>
                            <tr>
                             <td><span style="font-weight: 500; font-size: 10px;">Age</span></td>
                             <td><span style="font-size: 10px;">: &nbsp;  <?= is_string($patientAge ?? "") ? htmlspecialchars($patientAge) : "N/A" ?></span> </td>   
                            </tr>
                            <tr>
                             <td><span style="font-weight: 500; font-size: 10px;">Date</span></td>
                             <td><span style="font-size: 10px;">: &nbsp;  <?= is_string($todayDate ?? "") ? htmlspecialchars($todayDate) : "N/A" ?></span> </td>   
                            </tr>
                        </table>
                    </td>
                    <td style="text-align: right">
                            <img src="<?=is_string($img ?? '') ? htmlspecialchars($img) : '' ?>" style="text-align: right" height="100" width="100" alt="qr">
                       <div style="min-width: 100px">
                        <div style="margin:0 40px">
                            <p style="text-align: center; font-size:8px; ">QR Code &nbsp;&nbsp; &nbsp; </p>
                        </div>
                       </div>
                    </td>
                </tr>
            </table>
            <hr>
        <div style="display: flex; gap: 10px; align-items: center">
            <span style=" 
                border: 1px solid #8f8f8f;
                height: 16px;
                width: 16px;
                margin: 0 3px;
                display: inline;
            "></span>
            <span style="font-size: 9px;">Brand substitution not permitted</span>
        </div>
        <ul style="width: 100%; margin: 15px 0; list-style: none; padding:0px">
            @foreach($medicines as $rx)
            <li style="border-bottom: 1px solid #8f8f8f; margin-bottom: 10px; padding-left:0px; margin-left:0px;">
                <p style="margin: 0; font-size:11px"><?= is_string($rx['brand_name'] ?? "") ? htmlspecialchars($rx['brand_name']) : "" ?></p>
                <p style="font-size: 10.5px"><?= is_string($rx['drug_name'] ?? "") ? htmlspecialchars($rx['drug_name']) : "" ?></p>
                <table style="width: 100%">
                <tr>
                    @if (isset($rx['Complex_instruction']))
                        <td>
                                <span style="display: inline-block; margin-right: 80px; font-size: 10px;"><?= is_string($rx['Complex_instruction'] ?? "") ? htmlspecialchars($rx['Complex_instruction']) : "" ?></span>
                        </td>
                    @else
                        @if (isset($rx['dose']) && $rx['dose'] != '1')
                        <td>
                            <span style="display: inline-block; margin-right: 20px; font-size: 11px;"><?= is_string($rx['dose'] ?? "") ? htmlspecialchars($rx['dose']) : "-" ?></span>
                        </td>    
                        @endif
                        <td>
                            <span style="display: inline-block; margin-right: 20px; font-size: 10px;"><?= is_string($rx['frequency'] ?? "") ? htmlspecialchars($rx['frequency']) : "-" ?></span>
                        </td>
                        <td>
                            <span style="display: inline-block; margin-right: 80px; font-size: 10px;"><?= is_string($rx['food'] ?? "") ? htmlspecialchars($rx['food']) : "" ?>
                            </span>
                        </td>
                    @endif
                    <td>
                        <span
                        style="display: inline-block; margin-right: 20px; font-size: 10px;"
                        >
                            <?= (is_string($rx['prn'] ?? "") && $rx['prn'] != "") ? "(" . htmlspecialchars($rx['prn']) . ")" : "" ?>
                        </span>
                    </td>
                    <td>
                        <span style="display: inline-block; margin-right: 80px; font-size: 10px;"><?= is_string($rx['route'] ?? "") ? htmlspecialchars($rx['route']) : "" ?></span>
                    </td>
                    <td style="text-align: right;">
                        @php
                            $quantity = $rx['quantity'] ?? '';
                            $repeats = $rx['repeats'] ?? 0;
                            $repeatText = $repeats > 1 ? 'Repeats' : 'Repeat';
                        @endphp
                    
                        @if(is_string($quantity))
                            <p style="text-align: right; font-size: 11px;">
                                @php
                                    echo $quantity . ' X ' . $repeats . ' ' . $repeatText;
                                @endphp
                            </p>
                        @endif
                    </td>
                </tr>
                </table>
            </li>
            @endforeach
        </ul>
    </div>
</body>

</html>