window.onload = function () {
    const downloadBtn = document.getElementById("download-pdf");
    const fileName = document.querySelector("#file-name")

    downloadBtn.addEventListener("click", () => {
        const doc = new jspdf.jsPDF({
            format: "a4",
            unit: "mm"
        })


        let scaleBy = 5;
        let w = 595
        let h = 842
        let canvas = document.createElement('canvas');
        canvas.width = w * scaleBy;
        canvas.height = h * scaleBy;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.getContext('2d').scale(2.66, 2.66)

        html2canvas(document.querySelector("#cv"), {
            canvas: canvas
        })
            .then(canvas => {
                let img = new Image()
                img.src = canvas.toDataURL("image/png")

                doc.addImage(img, 'png', 0, 0, 210, 297)
                doc.save(`${fileName.innerHTML}.pdf`)
            })


    })

}