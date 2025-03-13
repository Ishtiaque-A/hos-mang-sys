<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RadiologyMail extends Mailable
{
    use Queueable, SerializesModels;
    public $radiology_pdf;
    public $radiology_data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($radiology_pdf, $radiology_data)
    {
        //
        $this->radiology_pdf = $radiology_pdf;
        $this->radiology_data = $radiology_data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.radiology_text', ['radiology' => $this->radiology_data])->subject(' Important Report from Macro Health')->from('karlosray@gmail.com', 'MHP')->attachData($this->radiology_pdf, 'reportMHP.pdf', [
            'mime' => 'application/pdf',
        ]);
    }
}
