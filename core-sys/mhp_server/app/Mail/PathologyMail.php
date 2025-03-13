<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PathologyMail extends Mailable
{
    use Queueable, SerializesModels;
    public $pathology_pdf;
    public $pathology_data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($pathology_pdf, $pathology_data)
    {
        //
        $this->pathology_pdf = $pathology_pdf;
        $this->pathology_data = $pathology_data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.pathology_text', ['pathology' => $this->pathology_data])->subject(' Important Pathology Report from Macro Health')->from('info@macrohealthplus.org', 'MHP')->attachData($this->pathology_pdf, 'pathology.pdf', [
            'mime' => 'application/pdf',
        ]);
    }
}
