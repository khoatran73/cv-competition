// Download CV PDF
const download = document.getElementById("download")
download.addEventListener("click", e => exportHtml2Pdf(e))

const exportHtml2Pdf = (e) => {
    if (window.pageYOffset > 0) {
        e.preventDefault()
        swal("Oops...", "Vui lòng Scroll lên đầu trang để tải CV!!!", "error")
        return
    }
    const fileName = document.querySelector("#file-name")
    const cv = document.getElementById("cv")
    let name = fileName.innerHTML

    if (fileName.children.length > 0) {
        name = fileName.children[0].innerHTML
    }

    let option = {
        filename: `${name}.pdf`,
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', width: 210, height: 297 },
        html2canvas: { scale: 10 },
        margin: [0, -1.92, 0, 0]
    }
    html2pdf()
        .set(option)
        .from(cv)
        .save()
}

// loadMargin()

function setCvHeight() {
    const cvMainLeft = document.querySelector(".cv-main-left")
    const cvMainRight = document.querySelector(".cv-main-right")

    const childClassLeft = cvMainLeft.children[cvMainLeft.children.length - 1].classList[1]
    const childClassRight = cvMainRight.children[cvMainRight.children.length - 1].classList[1]

    const childLeft = document.querySelector("." + childClassLeft)
    const childRight = document.querySelector("." + childClassRight)

    const rectLeft = childLeft.getBoundingClientRect()
    const rectRight = childRight.getBoundingClientRect()

    const topCv = $("#cv").offset().top

    const topElementLeft = $("." + childClassLeft).offset().top - topCv
    const topElementRight = $("." + childClassRight).offset().top - topCv

    if ((topElementLeft + rectLeft.height) > 1135.86 || (topElementRight + rectRight.height) > 1135.86) {
        if (!$("#cv").hasClass("cv-height"))
            $("#cv").addClass("cv-height")
    } else {
        if ($("#cv").hasClass("cv-height"))
            $("#cv").removeClass("cv-height")
    }
}

setCvHeight()

// allow editable
enableEditable()
function enableEditable() {
    $(".editable").attr('contenteditable', 'true')
    $("#file-name").attr('contenteditable', 'true')
    $("#plus").attr("contentediable", "false")
}

$("#file-name").keypress(function (e) {
    if (e.which == 13) {
        e.preventDefault()
        swal("Oops...", "Tên của CV chỉ được viết trên một dòng!!!", "error")
    }
})

// User can edit style
userEdit()
function userEdit() {
    $(".bold").click(function () {
        execCommand("fontSize")
        execCommand('bold')
    })

    $(".italic").click(function () {
        execCommand("fontSize")
        execCommand('italic')
    })

    $(".underline").click(function () {
        execCommand("fontSize")
        execCommand('underline')
    })

    $(".list-ul").click(() => execCommand("insertUnorderedList"))

    $(".align-right").click(() => execCommand("justifyLeft"))

    $(".align-center").click(() => execCommand("justifyCenter"))

    $(".align-justify").click(() => execCommand("justifyFull"))

    $(".align-left").click(() => execCommand("justifyRight"))

    $("#font-select").change(() => {
        execCommand("fontSize")
        execCommandWithValue("fontName", $("#font-select").val())
    })
}

function execCommand(command) {
    document.execCommand(command, false, null)
}

function execCommandWithValue(command, value) {
    document.execCommand(command, false, value)
}

$(document).on('scroll', function () {
    loadMargin()
    setCvHeight()
})

// Display trash icon
handleTrashIcon()
function handleTrashIcon() {
    $(".editable").focus(e => {
        const element = e.target
        const trashIcon = document.createElement("i")

        element.classList.add("editor-controller")
        trashIcon.classList.add("far")
        trashIcon.classList.add("fa-trash-alt")
        element.appendChild(trashIcon)

        trashIcon.addEventListener("click", e => {
            removeParent(e)
            loadMargin()
            setCvHeight()
        })
    })

    $(".editable").focusout(() => $(".editable").removeClass("editor-controller"))

}

function removeParent(e) {
    const parent = e.target.parentNode
    parent.remove()
}

// Upload Image
const formUpload = document.getElementById("form-upload")
const userImage = document.getElementById("user-img")

formUpload.addEventListener("change", e => {
    const files = e.target.files
    files.forEach(file => {
        if (!file.type.startsWith("image/")) {
            swal("Oops...", "Chỉ được upload ảnh!!!", "error")
            return
        }

        const fileReader = new FileReader()
        fileReader.onload = event => userImage.src = event.target.result

        fileReader.readAsDataURL(file)

    })
    loadMargin()
})
