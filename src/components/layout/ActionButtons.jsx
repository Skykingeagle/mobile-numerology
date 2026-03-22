import React from "react";
import { Box, Button, Stack } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ActionButtons = ({ reportData, handleReset }) => {
  const handleExportPdf = () => {
    const input = document.getElementById("print-area");
    const originalDisplay = input.style.display;
    input.style.display = "block"; // Make sure it's visible for capture

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      const pdfHeight = pdfWidth / ratio;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`numerology-report-${reportData.mobileNumber}.pdf`);
      input.style.display = originalDisplay; // Revert style
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const shareText = `Check out the numerology analysis for ${reportData.mobileNumber}! Overall Strength: ${reportData.strength}%. Recommendation: ${reportData.recommendation}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Numerology Report",
          text: shareText,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      alert(
        "Share feature is available on mobile devices. For desktop, you can copy the page URL.",
      );
    }
  };

  return (
    <Box
      className="no-print"
      sx={{ mt: 3, p: 2, border: "1px dashed grey", borderRadius: 2 }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
      >
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleExportPdf}
        >
          Export PDF
        </Button>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Print
        </Button>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={handleShare}
        >
          Share
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
        >
          Analyse Next
        </Button>
      </Stack>
    </Box>
  );
};

export default ActionButtons;
