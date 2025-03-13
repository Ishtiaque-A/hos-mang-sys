<html>
<head>
</head>
<body>
     <!-- Footer -->
     <div class="footer">
        @if (isset($data['use_doctor_signature']) && $data['use_doctor_signature'] == 1 && isset($data['doctor_signature']))
        <img
          style="width: 200px; height: 80px; object-fit: contain"
          src="{{ is_string($data['doctor_signature'] ?? '') ? htmlspecialchars($data['doctor_signature']) : '' }}"
          alt="doctor"
        />
        @endif
        <div></div>
        <h2 class="doctor-name">{{ is_string($data['doctorInfo']['docName'] ?? '') ? htmlspecialchars($data['doctorInfo']['docName']) : '' }}</h2>
    </div>
    <div style="border-top: 1px solid black; width: 100%; padding-top: 10px">
        @if (!isset($data['use_footer']) || $data['use_footer'] !== 1)
        <p style="text-align: center; font-size: 10px; margin: 0; padding: 0">
            .......... দিন পর GreatDoc অ্যাপ এ ফলোআপ / চেম্বারে
            ব্যাবস্থাপ্ত্র সহ সরাসরি আসবেন |
          </p>
        @endif
        @if (isset($data['use_footer']) && $data['use_footer'] === 1)
        <div class="footer-content" style="text-align: center; font-size: 10px; margin: 0; padding: 0; width: 100%">{!! $data['footer_content'] !!}</div>
        @endif
    </div>
</body>
</html>
