<?php
require_once('tcpdf/tcpdf.php');

if (isset($_POST['inputText'])) {
    $inputText = $_POST['inputText'];

    // Create a new TCPDF instance
    $pdf = new TCPDF();

    // Set document information
    $pdf->SetCreator('PDF Generator');
    $pdf->SetAuthor('Your Name');
    $pdf->SetTitle('Repeated Text PDF');
    $pdf->SetSubject('Generated PDF');
    $pdf->SetKeywords('PDF, Text');

    // Add a page
    $pdf->AddPage();

    // Set font
    $pdf->SetFont('dejavusans', '', 12);

    // Repeat the input text 7 times
    for ($i = 0; $i < 7; $i++) {
        $pdf->Write(0, $inputText);
        $pdf->Ln();
    }

    // Output the PDF to the browser
    $pdf->Output('output.pdf', 'I');
}
?>
