$(".color-item").click(function () {
    $(".color-item").removeClass("active")
    $(this).addClass("active")

    const darkColor = $(this).attr("data-dark")
    const lightColor = $(this).attr("data-light")

    $(".dark-color").css("background-color", darkColor)
    $(".dark-color-item").css("color", darkColor)
    $(".light-color").css("background-color", lightColor)
})

function slider() {
    for (let i = 1; i <= $("#content-skill").children().length; i++) {
        let oldValue = $("#slider-" + i).val()
        $("#slider-" + i).css("background", `linear-gradient(to right, #737373 0%, #737373 ${oldValue}%, #494F56 ${oldValue}%, #494F56 100%)`)
        $(".slider").attr("contenteditable", "false")
        $(".slider-value").attr("contenteditable", "false")
        let slider = document.getElementById("slider-" + i)
        slider.oninput = function () {
            let value = (this.value - this.min) / (this.max - this.min) * 100
            this.style.background = 'linear-gradient(to right, #737373 0%, #737373 ' + value + '%, #494F56 ' + value + '%, #494F56 100%)'
            $("#slider-value-" + i).html($(this).val() + "%")
        }
    }
}
slider()

$(".add-element").click(function () {
    const element = $(this).attr("data-class")
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
        addElement(element)
        enableEditable()
        userEdit()
        handleTrashIcon()
        displayPlusIcon()
        slider()
    }
    xhr.open("GET", "cv-2.html", true)
    xhr.send()
})


function addElement(element) {
    let classElement
    switch (element) {
        case "name":
            addNameElement()
            break
        case "contact":
            classElement = `<div class="cv-main-left-item contact editable">
                <div class="title dark-color"><span>Liên Hệ</span></div>
                <ul>
                    <li class="address">Địa chỉ: 903 Trần Xuân Soạn, p. Tân Phong, quận 7, TP Hồ Chí
                        Minh</li>
                    <li class="phone">SĐT: 012345678</li>
                    <li class="email">Email: baovy@gmail.com</li>
                    <li class="github">Github: baovy@nodejs_vivian</li>
                </ul>
            </div>`
            addCvMainLeftElement("contact", classElement)
            break
        case "hobby":
            classElement = `<div class="cv-main-left-item hobby editable">
                <div class="title dark-color"><span>Sở thích</span></div>
                <ul>
                    <li>Vào những ngày cuối tuần
                        tôi thường cùng bạn bè gặp
                        nhau.
                    </li>
                    <li>Và trong những kì nghỉ
                        dài,tôi thường đi du lịch để
                        có thêm nhiều trải nghiệm
                    </li>
                </ul>
            </div>`
            addCvMainLeftElement("hobby", classElement)
            break
        case "activity":
            classElement = `<div class="cv-main-left-item activity editable">
                <div class="title dark-color"><span>Hoạt động</span></div>
                <ul id="content-activity">
                    <li class="activity-1">
                        <div class="header">THÁNG 7/2020</div>
                        <div class="content">MÙA HÈ XANH: Làm việc teamwork,
                            phát gạo cho người dân, dọn cỏ và sinh
                            hoạt ở nhà văn hoá
                        </div>
                    </li>
                    <li class="activity-2">
                        <div class="header">THÁNG 11/2020</div>
                        <div class="content">LEADER FLY: Dự án được thực hiện dự
                            trên sự quản lí tài chính của cá nhân
                            mỗi người, đưa ra những phân tích và
                            chiếc lược cho content
                        </div>
                    </li>
                    <li class="activity-3">
                        <div class="header">THÁNG 1/2021</div>
                        <div class="content">
                            XUÂN TÌNH NGUYỆN: Phát quà xuân
                            cho các bạn nhỏ tại tỉnh Long An. Tham
                            gia bữa ăn tình thương và các hoạt
                            động ca hát.
                        </div>
                    </li>
                    <li class="activity-4">
                        <div class="header">THÁNG 6/2021</div>
                        <div class="content">
                            HỔ TRỢ COVID 19: Tham gia hỗ trợ phòng chống dịch Covid 19.
                        </div>
                    </li>
                </ul>
            </div>`
            addCvMainLeftElement("activity", classElement)
            break
        case "education":
            classElement = `<div class="cv-main-right-item education editable">
                <div class="title education-1">
                    <i class="fas fa-graduation-cap dark-color-icon"></i>
                    Học vấn
                </div>
                <ul id="content-education" class="light-color">
                    <li class="education-2">
                        <div class="school">
                            Đại học Tôn Đức Thắng
                        </div>
                        <div class="time">
                            2019 - nay
                        </div>
                        <ul class="light-color">
                            <li>
                                Xếp loại: Khá
                            </li>
                            <li>
                                Điểm tích lũy: 7.8/10.0
                            </li>
                            <li>
                                Hệ chính quy
                            </li>
                        </ul>
                    </li>
                    <li class="education-3">
                        <div class="school">
                            THPT Lê Thành Phương
                        </div>
                        <div class="time">
                            2016 - 2019
                        </div>
                        <ul class="light-color">
                            <li>
                                Xếp loại: Giỏi
                            </li>
                            <li>
                                Điểm tích lũy: 8.9/10
                            </li>
                            <li>
                                Hệ chính quy
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>`
            addCvMainRightElement("education", classElement)
            break
        case "award":
            classElement = `<div class="cv-main-right-item award editable">
                <div class="title">
                    <i class="fas fa-award dark-color-icon"></i>
                    Giải thưởng
                </div>
                <ul class="light-color">
                    <li>2020: Giải nhất Hackathon</li>
                    <li>2019: Giả ba thiết kế website với Wix.com</li>
                </ul>
            </div>`
            addCvMainRightElement("award", classElement)
            break
        case "skill":
            classElement = `<div class="cv-main-right-item skill editable">
                <div class="title">
                    <i class="fas fa-lightbulb dark-color-icon"></i>
                    Kỹ năng
                </div>
                <ul id="content-skill" class="light-color">
                    <li>
                        <span>Làm việc nhóm</span>
                        <input class="slider" type="range" min="1" max="100" value="20" id="slider-1">
                        <span id="slider-value-1" class="slider-value">20%</span>
                    </li>
                    <li>
                        <span>Tự học</span>
                        <input class="slider" type="range" min="1" max="100" value="20" id="slider-2">
                        <span id="slider-value-2" class="slider-value">20%</span>
                    </li>
                    <li>
                        <span>Quản lý thời gian</span>
                        <input class="slider" type="range" min="1" max="100" value="20" id="slider-3">
                        <span id="slider-value-3" class="slider-value">20%</span>
                    </li>
                </ul>
            </div>`
            addCvMainRightElement("skill", classElement)
            break
        case "experience":
            classElement = ` <div class="cv-main-right-item experience editable">
                <div class="title experience-1">
                    <i class="fas fa-briefcase dark-color-icon"></i>
                    Kinh nghiệm làm việc
                </div>
                <ul class="light-color" id="content-experience">
                    <li class="experience-2">
                        <div class="school">
                            Công ty TNHH Phần mềm FPT
                        </div>
                        <div class="time">
                            Thực tập Lập trình Fontend | 6/2020 - nay
                        </div>
                        <ul>
                            <li>
                                Hỗ trợ các anh chị trong team Frontend
                            </li>
                            <li>
                                Làm việc với Tester
                            </li>
                            <li>
                                Hoàn thành tốt các công việc được giao
                            </li>
                            <li>
                                Tháng 12/2020 đạt giải nhân viên của tháng
                            </li>
                            <li>
                                Tháng 5/2021 trở thành nhân viên chính thức
                            </li>
                        </ul>
                    </li>
                    <li class="experience-3">
                        <div class="school">
                            Shopee
                        </div>
                        <div class="time">
                            Nhân viên BA | 10/2019 - 5/2020
                        </div>
                        <ul>
                            <li>
                                Xây dựng hệ thống cho team Dev code
                            </li>
                            <li>
                                Làm việc, lấy ý kiến của khách hàng
                            </li>
                            <li>
                                Quản lý tài liệu cho team
                            </li>
                            <li>
                                Hoàn thành tốt các công việc được giao
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>`
            addCvMainRightElement("experience", classElement)
            break
    }
    loadMargin()
}


function addNameElement() {
    let element = document.getElementsByClassName("cv-header-name-group")
    if (element.length > 0) {
        swal("Oops...", "Không thể thêm một thành phần đã có!!!", "error")
        return
    }

    let classElement = `
        <div class="cv-header-name-group editable">
            <div class="name">Nguyen Tran Bao Vy</div>
            <div class="position">Frontend Developer</div>
        </div>`

    $(".cv-header").append(classElement)
}

function addCvMainLeftElement(className, classElement) {
    let element = document.getElementsByClassName(className)
    if (element.length > 0) {
        swal("Oops...", "Không thể thêm một thành phần đã có!!!", "error")
        return
    }

    $(".cv-main-left").append(classElement)
}

function addCvMainRightElement(className, classElement) {
    let element = document.getElementsByClassName(className)
    if (element.length > 0) {
        swal("Oops...", "Không thể thêm một thành phần đã có!!!", "error")
        return
    }

    $(".cv-main-right").append(classElement)
}

function addSkill() {
    let skill = document.createElement("li")
    let id = parseInt($("#content-skill").children().length) + 1
    skill.innerHTML = `<span>HTML</span>
    <input class="slider" type="range" min="1" max="100" value="20" id="slider-${id}">
    <span id="slider-value-${id}" class="slider-value">20%</span>
    `

    document.getElementById("content-skill").appendChild(skill)

    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
        slider()
    }
    xhr.open("GET", "cv-2.html", true)
    xhr.send()
}

function removePlusIcon(e) {
    let element = e.target
    let listChild = element.childNodes

    // element.removeChild(listChild[listChild.length - 2])
    element.removeChild(listChild[listChild.length - 1])
}


function displayPlusIcon() {
    $(".contact").focus(e => {
        const element = e.target
        const plusIcon = document.createElement("i")

        element.classList.add("add-contact")
        plusIcon.classList.add("fas")
        plusIcon.classList.add("fa-plus-circle")
        plusIcon.classList.add("open-contact-modal")
        element.appendChild(plusIcon)

        plusIcon.addEventListener("click", () => {
            $(".open-contact-modal").attr("data-toggle", "modal")
            $(".open-contact-modal").attr("data-target", "#contact-modal")
            checkContactItem()
        })
    })

    $(".contact").focusout(e => removePlusIcon(e))

    $(".hobby").focus(e => {
        const element = e.target
        const plusIcon = document.createElement("i")

        element.classList.add("add-hobby")
        plusIcon.classList.add("fas")
        plusIcon.classList.add("fa-plus-circle")
        element.appendChild(plusIcon)

        plusIcon.addEventListener("click", () => {
            addHobby()
            loadMargin()
        })
    })

    $(".hobby").focusout(e => removePlusIcon(e))

    $(".award").focus(e => {
        const element = e.target
        const plusIcon = document.createElement("i")

        element.classList.add("add-award")
        plusIcon.classList.add("fas")
        plusIcon.classList.add("fa-plus-circle")
        element.appendChild(plusIcon)

        plusIcon.addEventListener("click", () => {
            addAward()
            loadMargin()
        })
    })

    $(".award").focusout(e => removePlusIcon(e))

    $(".skill").focus(e => {
        const element = e.target
        const plusIcon = document.createElement("i")

        element.classList.add("add-skill")
        plusIcon.classList.add("fas")
        plusIcon.classList.add("fa-plus-circle")
        element.appendChild(plusIcon)

        plusIcon.addEventListener("click", () => {
            addSkill()
            loadMargin()
        })
    })

    $(".skill").focusout(e => removePlusIcon(e))

    $(".activity").focus(e => {
        const element = e.target
        const plusIcon = document.createElement("i")

        element.classList.add("add-activity")
        plusIcon.classList.add("fas")
        plusIcon.classList.add("fa-plus-circle")
        element.appendChild(plusIcon)

        plusIcon.addEventListener("click", () => {
            addActivity()
            loadMargin()
        })
    })

    $(".activity").focusout(e => removePlusIcon(e))

    $(".education").focus(e => {
        const element = e.target
        const plusIcon = document.createElement("i")

        element.classList.add("add-education")
        plusIcon.classList.add("fas")
        plusIcon.classList.add("fa-plus-circle")
        element.appendChild(plusIcon)

        plusIcon.addEventListener("click", () => {
            addEducation()
            loadMargin()
        })
    })

    $(".education").focusout(e => removePlusIcon(e))

    $(".experience").focus(e => {
        const element = e.target
        const plusIcon = document.createElement("i")

        element.classList.add("add-experience")
        plusIcon.classList.add("fas")
        plusIcon.classList.add("fa-plus-circle")
        element.appendChild(plusIcon)

        plusIcon.addEventListener("click", () => {
            addExperience()
            loadMargin()
        })
    })

    $(".experience").focusout(e => removePlusIcon(e))
}

displayPlusIcon()

function addHobby() {
    let hobby = document.createElement("li")
    hobby.innerHTML = `
        <i class="fas fa-heart dark-color-item"></i>
        Chơi thể thao
    `

    document.getElementById("content-hobby").appendChild(hobby)
}

function addAward() {
    let award = document.createElement("li")
    award.innerHTML = `
        <i class="fas fa-award dark-color-item"></i>
        <b>2020:</b> Giải nhất Hackathon
    `

    document.getElementById("content-award").appendChild(award)
}


function addActivity() {
    let activity = document.createElement("div")
    let id = parseInt($("#content-activity").children().length) + 1
    activity.innerHTML = `
        <div class="header">KHOA CNTT - ĐH TĐT</div>
        <div class="time dark-color-item">Tháng 6/2020</div>
        <div class="content"><b>Mùa Hè Xanh:</b> Làm việc teamwork,
            phát gạo cho người dân, dọn cỏ và sinh
            hoạt ở nhà văn hoá.
        </div>`
    activity.classList.add(`activity-${id}`)

    document.getElementById("content-activity").appendChild(activity)
}

function addEducation() {
    let education = document.createElement("li")
    let id = parseInt($("#content-education").children().length) + 2
    education.innerHTML = `<div class="school">
            Đại học Tôn Đức Thắng
        </div>
        <div class="time">
            2019 - nay
        </div>
        <ul class="light-color">
            <li>
                Xếp loại: Khá
            </li>
            <li>
                Điểm tích lũy: 7.8/10.0
            </li>
            <li>
                Hệ chính quy
            </li>
        </ul>`
    education.classList.add(`education-${id}`)

    document.getElementById("content-education").appendChild(education)
}

function addExperience() {
    let experience = document.createElement("li")
    let id = parseInt($("#content-experience").children().length) + 2
    experience.innerHTML = ` <div class="school">
            Công ty TNHH Phần mềm FPT
        </div>
        <div class="time">
        Thực tập Lập trình Fontend | 6/2020 - nay
        </div>
        <ul class="light-color">
            <li>
                Hỗ trợ các anh chị trong team Frontend
            </li>
            <li>
                Làm việc với Tester
            </li>
            <li>
                Hoàn thành tốt các công việc được giao
            </li>
        </ul>`
    experience.classList.add(`experience-${id}`)

    document.getElementById("content-experience").appendChild(experience)
}


function marginTop(element, mT) {
    $("." + element).css("margin-top", mT + "px")
}

function loadMargin() {
    marginTopElement("skill")
    for (let i = 1; i <= 10; i++) {
        marginTopElement("activity-" + i)
        marginTopElement("experience-" + i)
        marginTopElement("education-" + i)
    }
}

loadMargin()
$(".editable").keydown(function () {
    loadMargin()
    setCvHeight()
})

function marginTopElement(element) {
    if ($("." + element).length > 0) {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            const a4Height = 1134.85
            const topCv = $("#cv").offset().top
            const cssMarginTop = parseInt($("." + element).css("margin-top"))
            const topElement = $("." + element).offset()?.top - topCv - cssMarginTop
            const rect = document.querySelector("." + element)?.getBoundingClientRect()
            const bottomElement = rect?.height + topElement
            const mT = a4Height - topElement
            if (topElement < a4Height && bottomElement > (a4Height - 16)) {
                marginTop(element, mT)
            } else {
                marginTop(element, 0)
            }
        }
        xhr.open("GET", "cv-3.html", true)
        xhr.send()
    }
}

function checkSection(className) {
    const element = document.querySelector(`.${className}`)
    if (element) {
        const addElement = $(`.add-element[data-class=${className}]`)?.parent()[0]
        addElement.style.backgroundColor = "#A8D0E6"
    } else {
        const addElement = $(`.add-element[data-class=${className}]`)?.parent()[0]
        addElement.style.backgroundColor = "#fff"
    }
}

function checkContactItem() {
    const contactContent = document.getElementById("contact-content")
    const contactData = []//["address", "phone", "email", "github", "linkedin", "website"]
    contactContent.children.forEach(child => {
        const className = child?.classList[0]
        contactData.push(className)
    })

    document.querySelectorAll(".add-contact-item").forEach(contactItem => {
        const dataClass = contactItem.dataset.class
        if (contactData.includes(dataClass)) {
            contactItem.style.backgroundColor = "#A8D0E6"
        } else {
            contactItem.style.backgroundColor = "#fff"
        }
    })
}

function checkSections() {
    const element = document.querySelector(".cv-header-name-group")
    if (element) {
        const addElement = $(`.add-element[data-class="name"]`)?.parent()[0]
        addElement.style.backgroundColor = "#A8D0E6"
    } else {
        const addElement = $(`.add-element[data-class="name"]`)?.parent()[0]
        addElement.style.backgroundColor = "#fff"
    }
    checkSection("contact")
    checkSection("hobby")
    checkSection("activity")
    checkSection("education")
    checkSection("award")
    checkSection("skill")
    checkSection("experience")
}

$("#add-element").click(function () {
    checkSections()
})


$(".add-contact-item").click(function () {
    const dataClass = $(this).attr("data-class")
    if ($("." + dataClass).length > 0) {
        swal("Oops...", dataClass + " đã có rồi", "error")
        return
    }

    const helper = {
        "address": `<li class="address">
                <i class="fas fa-home dark-color-item"></i>
                19 Nguyễn Hữu Thọ, P. Tân Phong, Q.7, TP HCM
            </li>`,
        "phone": `<li class="phone">
                <i class="fas fa-phone-alt dark-color-item"></i>
                0865998764
            <li>`,
        "email": `<li class="email">
                <i class="fas fa-envelope dark-color-item"></i>
                baovy@gmail.com
            <li>`,
        "github": `<li class="github">
                <i class="fab fa-github dark-color-item"></i>
                baovy0105
            </li>`,
        "linkedin": `<li class="linkedin">
                <i class="fab fa-linkedin dark-color-item"></i>
                Bảo Vy
            </li>`,
        "website": `<li class="website">
                <i class="fas fa-globe dark-color-item"></i>
                Facebook
            </li>`
    }

    const element = helper[dataClass]

    $("#contact-content").append(element)
})