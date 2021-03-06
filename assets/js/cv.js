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

    for (let i = 0; i < cvMainLeft.children.length; i++) {
        const childClassLeft = cvMainLeft.children[i]?.classList[1]
        const childLeft = document.querySelector("." + childClassLeft)
        const rectLeft = childLeft?.getBoundingClientRect()
        const topCv = $("#cv").offset().top
        const topElementLeft = $("." + childClassLeft).offset()?.top - topCv

        if ((topElementLeft + rectLeft?.height) > 1135.86) {
            if (!$("#cv").hasClass("cv-height"))
                $("#cv").addClass("cv-height")

            return
        }
    }

    for (let i = 0; i < cvMainRight.children.length; i++) {
        const childClassRight = cvMainRight.children[i]?.classList[1]
        const childRight = document.querySelector("." + childClassRight)
        const rectRight = childRight?.getBoundingClientRect()
        const topCv = $("#cv").offset().top
        const topElementRight = $("." + childClassRight).offset()?.top - topCv

        if ((topElementRight + rectRight?.height) > 1135.86) {
            if (!$("#cv").hasClass("cv-height"))
                $("#cv").addClass("cv-height")

            return
        }
    }

    if ($("#cv").hasClass("cv-height"))
        $("#cv").removeClass("cv-height")

}

setCvHeight()

// allow editable
enableEditable()
function enableEditable() {
    $(".editable").attr('contenteditable', 'true')
    $("#file-name").attr('contenteditable', 'true')
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

    $(".link").click(() => {
        execCommandWithValue("createLink", prompt("Enter a link", "https://"))
    })

    $(".unlink").click(() => {
        execCommand("unlink")
    })

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
    // setCvHeight()
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
        trashIcon.contentEditable = "false"
        element.appendChild(trashIcon)

        trashIcon.addEventListener("click", e => {
            removeParent(e)
        })
    })

    $(".editable").focusout(e => {
        let element = e.target
        let listChild = element.childNodes

        // element.removeChild(listChild[listChild.length - 2])
        element?.removeChild(listChild[listChild?.length - 1])
    })
}

function removeParent(e) {
    const parent = e.target.parentNode
    swal({
        title: "DELETE",
        text: `Delete this Section ?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                parent?.remove()
                loadMargin()
                setCvHeight()
                swal("Your section has been deleted!", {
                    icon: "success",
                })
            } else {
                swal("Your section is safe!")
            }
        })
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


$(".editable").keydown(function () {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
        loadMargin()
        setCvHeight()
    }
    xhr.open("GET", "cv-3.html", true)
    xhr.send()

})
