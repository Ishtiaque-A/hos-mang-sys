<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Queueable;

class EScriptMail extends Mailable
{
    use Queueable, SerializesModels;

    public $prescription_pdf;

    public function __construct($prescription_pdf)
    {
        $this->prescription_pdf = $prescription_pdf;
    }

    public function build()
    {
        return $this->view('mail.prescription_text')->subject(' Important Prescription')->from('karlosray@gmail.com', 'MHP')->attachData($this->prescription_pdf, 'prescription.pdf', [
            'mime' => 'application/pdf',
        ]);

        // return $this->view('mail.prescription_text')
        //     ->subject('Import Prescription')
        //     ->from('karlosray@gmail.com', 'MHP')
        //     ->attachData($this->prescription_pdf['data'], [
        //         'mime' => 'application/pdf',
        //         'filename' => $this->prescription_pdf['filename'],
        //     ]);
    }
}
