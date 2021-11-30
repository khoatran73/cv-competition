// Download CV PDF
const download = document.getElementById("download")
download.addEventListener("click", e => exportHtml2Pdf(e))

const exportHtml2Pdf = (e) => {
    if (window.pageYOffset > 0) {
        e.preventDefault()
        alert("Vui lòng Scroll lên đầu trang để tải CV")
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

// Display Page 2 tag
const setPage2 = setInterval(function () {
    if ($("#cv").height() > 1119.86) {
        if (!$("#cv").hasClass("page-2")) {
            $("#cv").addClass("page-2")
        }
    } else {
        if ($("#cv").hasClass("page-2")) {
            $("#cv").removeClass("page-2")
        }
    }
}, 500)

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
        alert("Tên CV chỉ được viết trên một dòng")
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

// Display trash icon
handleTrashIcon()
function handleTrashIcon() {
    $(".editable").focus(e => {
        const element = e.target
        const trashIcon = document.createElement("i")

        element.classList.add("editor-controller")
        trashIcon.classList.add("fas")
        trashIcon.classList.add("fa-trash-alt")
        element.appendChild(trashIcon)

        trashIcon.addEventListener("click", e => removeParent(e))
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
            alert("Chỉ được upload ảnh!!")
            return
        }

        const fileReader = new FileReader()
        fileReader.onload = event => userImage.src = event.target.result

        fileReader.readAsDataURL(file)
    })
})

function displayPlusIcon() {
    $(".skill").focus(e => {
        const element = e.target
        const plusIcon = document.createElement("i")

        element.classList.add("add-skill")
        plusIcon.classList.add("fas")
        plusIcon.classList.add("fa-plus")
        element.appendChild(plusIcon)

        plusIcon.addEventListener("click", () => addSkill())
    })

    $(".skill").focusout(() => $(".skill").removeClass("add-skill"))
}
displayPlusIcon()


