<html>
<head></head>
<body>
    @if (isset($data['use_header']) && $data['use_header'] === 1)
        <div style="text-align: center; font-size: 13px; font-weight: 500; line-height: 13px; color: #2e2e2e; margin-bottom: 10px;">
            {!! $data['header_content'] !!}
        </div>
    @endif

    @if (!isset($data['use_header']) || $data['use_header'] !== 1)
    <table class="header">
        <tr>
            <td class="doctor-info">
                <h2 class="doctor-name">{{ is_string($data['doctorInfo']['docName'] ?? "") ? htmlspecialchars($data['doctorInfo']['docName']) : '' }}</h2>
                <p style="margin: 0; padding: 0; line-height: 8px; font-size:10px; color:#2e2e2e">{{ is_string($data['doctorInfo']['academic'] ?? "") ? htmlspecialchars($data['doctorInfo']['academic']) : '' }}</p>
                <p style="margin: 0; padding: 0; line-height: 8px; font-size:10px; color:#2e2e2e">{{ is_string($data['doctorInfo']['specialist'] ?? "") ? htmlspecialchars($data['doctorInfo']['specialist']) : '' }}</p>
                <p style="margin: 0; padding: 0; line-height: 8px; font-size:10px; color:#2e2e2e">{{ is_string($data['doctorInfo']['usual_provider'] ?? "") ? htmlspecialchars($data['doctorInfo']['usual_provider']) : '' }}</p>
                <p style="margin: 0; padding: 0; line-height: 8px; font-size:10px; color:#2e2e2e">BMDC Reg. No - {{ is_string($data['doctorInfo']['dr_bmdc_reg_no'] ?? "") ? htmlspecialchars($data['doctorInfo']['dr_bmdc_reg_no']) : 'N/A' }}</p>
            </td>
            <td class="address">
                <p style="margin: 0; padding: 0"> {{ is_string($data['doctorInfo']['usual_provider']['usual_provider_name'] ?? "") ? htmlspecialchars($data['doctorInfo']['usual_provider']['usual_provider_name']) : 'N/A' }}</p>
                <p style="margin: 0; padding: 0; line-height: 8px; font-size:10px; color:#2e2e2e"> {{ is_string($data['doctorInfo']['usual_provider']['address'] ?? "") ? htmlspecialchars($data['doctorInfo']['usual_provider']['address']) : '' }}</p>
                <p style="margin: 0; padding: 0; line-height: 8px; font-size:10px; color:#2e2e2e">Serial Number: {{ is_string($data['doctorInfo']['usual_provider']['phone'] ?? "") ? htmlspecialchars($data['doctorInfo']['usual_provider']['phone']) : '' }}
                 <br>
                 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                 {{ is_string($data['doctorInfo']['usual_provider']['mobile'] ?? "") ? htmlspecialchars($data['doctorInfo']['usual_provider']['mobile']) : '' }}
                 </p>
            </td>
        </tr>
    </table>
@endif
</body>
</html>
