window.onload = function () {
    let btn = document.getElementById("download-pdf")
    let cv = document.getElementById("cv")
    let option = {
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait', width: 210, height: 297 },
        html2canvas: { scale: 10 },
        filenames: "document.pdf"
    }

    btn.addEventListener("click", function (e) {
        html2pdf()
            .set(option)
            .from(cv)
            .save()
    })
}