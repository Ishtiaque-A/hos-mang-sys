<html>
    <head>

    </head>
    <body>
        <table class="header" style="width: 100%">
            <tr>
                <td class="doctor-info">
                    <h4 class="doctor-name">{{ is_string($doctorInfo['docName'] ?? "") ? htmlspecialchars($doctorInfo['docName']) : "N/A" }}</h4>
                    <p style="font-size:11px">{{ is_string($doctorInfo['academic'] ?? "") ? htmlspecialchars($doctorInfo['academic']) : "" }}</p>
                    <p style="font-size:11px">{{ is_string($doctorInfo['specialist'] ?? "") ? htmlspecialchars($doctorInfo['specialist']) : "" }}</p>
                    <p style="font-size:11px"><span>BMDC No: {{ is_string($doctorInfo['dr_bmdc_reg_no'] ?? "") ? htmlspecialchars($doctorInfo['dr_bmdc_reg_no']) : "N/A" }}</span></p>
                </td>
                <td style="margin-left: 200px; text-align: right">
                    <h4 style="text-align: right; font-size: 16px; font-weight: 500; margin-bottom: 7px;">{{ is_string($doctorInfo['usual_provider']['usual_provider_name'] ?? "") ? htmlspecialchars($doctorInfo['usual_provider']['usual_provider_name']) : "N/A" }}</h4>
                    <p style="text-align: right; font-size:11px">{{ is_string($doctorInfo['usual_provider']['address'] ?? "") ? htmlspecialchars($doctorInfo['usual_provider']['address']) : "" }}</p>
                    <p style="text-align: right; font-size:11px"><span>Serial Number:</span> {{ is_string($doctorInfo['usual_provider']['mobile'] ?? "") ? htmlspecialchars($doctorInfo['usual_provider']['mobile']) : "" }}</p>
                    <p style="text-align: right; font-size:11px; margin-left: 250px">{{ is_string($doctorInfo['usual_provider']['phone'] ?? "") ? htmlspecialchars($doctorInfo['usual_provider']['phone']) : "" }}</p>
                </td>
            </tr>                
        </table>
        
    </body>
</html>