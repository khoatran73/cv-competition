$(".slider").css("background", "linear-gradient(to right, #374885 0%, #374885 19.1919%, #fff 19.1919%, #fff 100%)")
$(".slider").attr("contenteditable", "false")

// Color item clicked
$(".color-item").click(function (e) {
    $(".color-item").removeClass("active")
    $(this).addClass("active")

    const darkColor = $(this).attr("data-dark")
    const lightColor = $(this).attr("data-light")

    $(".dark-color").css("color", darkColor)
    $(".light-color").css("background-color", lightColor)
})

function slider() {
    for (let i = 1; i <= $("#content-skill").children().length; i++) {
        let oldValue = $("#slider-" + i).val()
        $("#slider-" + i).css("background", `linear-gradient(to right, #374885 0%, #374885 ${oldValue}%, #fff ${oldValue}%, #fff 100%)`)
        $(".slider").attr("contenteditable", "false")
        $(".slider-value").attr("contenteditable", "false")
        let slider = document.getElementById("slider-" + i)
        slider.oninput = function () {
            let value = (this.value - this.min) / (this.max - this.min) * 100
            this.style.background = 'linear-gradient(to right, #374885 0%, #374885 ' + value + '%, #fff ' + value + '%, #fff 100%)'
        }
    }
}
slider()

function removePlusIcon(e) {
    let element = e.target
    let listChild = element.childNodes

    // element.removeChild(listChild[listChild.length - 2])
    element?.removeChild(listChild[listChild.length - 1])
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


    $(".skill").focus(e => {
        const element = e.target
        const plusIcon = document.createElement("i")

        element.classList.add("add-skill")
        plusIcon.classList.add("fas")
        plusIcon.classList.add("fa-plus-circle")
        element.appendChild(plusIcon)

        plusIcon.addEventListener("click", () => addSkill())
    })

    $(".skill").focusout(e => removePlusIcon(e))

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
}

displayPlusIcon()

function addSkill() {
    let skill = document.createElement("div")
    let id = parseInt($("#content-skill").children().length) + 1
    skill.innerHTML = `<span>Self study</span>
    <input class="slider" type="range" min="1" max="100" value="20" id="slider-${id}">
    `

    document.getElementById("content-skill").appendChild(skill)

    // const xhr = new XMLHttpRequest()
    // xhr.onload = function () {
        slider()
    // }
    // xhr.open("GET", "cv-1.html", true)
    // xhr.send()
}

function addExperience() {
    let experience = document.createElement("li")
    let id = parseInt($("#content-experience").children().length) + 2
    experience.innerHTML = `<div class="school">
            Green Entrepreneurship Fellowship
        </div>
        <div class="time">
            Event Assistant | 2021
        </div>
        <ul>
            <li>
                Manage groups and social projects
            </li>
            <li>
                Support to organize training sessions
            </li>
        </ul>`
    experience.classList.add(`experience-${id}`)

    document.getElementById("content-experience").appendChild(experience)
}

function addEducation() {
    let education = document.createElement("li")
    let id = parseInt($("#content-education").children().length) + 2
    education.innerHTML =
        `<div class="school">
            Pha Lai high school
        </div>
        <div class="time">
            2016 - 2019
        </div>
        <ul>
            <li>
                GPA: 8.5/10
            </li>
            <li>
                Consolation prize for Informatics at Hai Duong
                province
            </li>
        </ul>`
    education.classList.add(`education-${id}`)

    document.getElementById("content-education").appendChild(education)
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

function checkSections() {
    const element = document.querySelector(".cv-header-name-group")
    if (element) {
        const addElement = $(`.add-element[data-class="name"]`)?.parent()[0]
        addElement.style.backgroundColor = "#A8D0E6"
    } else {
        const addElement = $(`.add-element[data-class="name"]`)?.parent()[0]
        addElement.style.backgroundColor = "#fff"
    }
    checkSection("introduce")
    checkSection("contact")
    checkSection("skill")
    checkSection("certification")
    checkSection("hobby")
    checkSection("education")
    checkSection("experience")
}

$("#add-element").click(function () {
    checkSections()
})

$(".add-element").click(function () {
    const element = $(this).attr("data-class")
    // const xhr = new XMLHttpRequest()
    // xhr.onload = function () {
        addElement(element)
        enableEditable()
        userEdit()
        handleTrashIcon()
        displayPlusIcon()
        slider()
    // }
    // xhr.open("GET", "cv-1.html", true)
    // xhr.send()
})

function addElement(element) {
    let classElement
    switch (element) {
        case "name":
            addNameElement()
            break
        case "introduce":
            classElement = `<div class="cv-main-left-item introduce editable">
                <div class="title">Introduce myself</div>
                <p>I am a good listener and desire to learn and discover more knowledge to sharpen
                    myself. I like creativity. My passion is to master programming languages to develop
                    more impressive websites that can provide customers with the best experience. </p>
            </div>`
            addCvMainLeftElement("introduce", classElement)
            break
        case "contact":
            classElement = `<div class="cv-main-left-item contact editable">
                <div class="title">Contact information</div>
                <div class="content" id="contact-content">
                    <div class="address">
                        <i class="fas fa-home dark-color"></i>
                        Number 19, Nguyen Huu Tho Street, T??n Phong Ward, District 7, HCMC
                    </div>
                    <div class="phone">
                        <i class="fas fa-phone-alt dark-color"></i>
                        0865998764
                    </div>
                    <div class="email">
                        <i class="fas fa-envelope  dark-color"></i>
                        hongngoc@gmail.com
                    </div>
                </div>
            </div>`
            addCvMainLeftElement("contact", classElement)
            break
        case "skill":
            classElement = `<div class="cv-main-left-item skill editable">
                <div class="title">Skill</div>
                <div class="content" id="content-skill">
                    <div>
                        <span>HTML</span>
                        <input class="slider" type="range" min="1" max="100" value="20" id="slider-1">
                    </div>
                    <div>
                        <span>CSS</span>
                        <input class="slider" type="range" min="1" max="100" value="20" id="slider-2">
                    </div>
                    <div>
                        <span>JavaScript</span>
                        <input class="slider" type="range" min="1" max="100" value="20" id="slider-3">
                    </div>
                </div>
            </div>`
            addCvMainLeftElement("skill", classElement)
            break
        case "certification":
            classElement = `<div class="cv-main-left-item certification editable">
                <div class="title">Certification</div>
                <div class="content">
                    <div>
                        IELTS 7.0
                    </div>
                    <div>
                        TOPIK 4
                    </div>
                    <div>
                        Cisco Certified DevNet Associate
                    </div>
                </div>
            </div>`
            addCvMainLeftElement("certification", classElement)
            break
        case "hobby":
            classElement = ` <div class="cv-main-left-item hobby editable">
                <div class="title">Hobby</div>
                <div class="content">
                    <div>
                        Traveling
                    </div>
                    <div>
                        Volunteering
                    </div>
                    <div>
                        Swimming
                    </div>
                    <div>
                        Music
                    </div>
                    <div>
                        Photo taking
                    </div>
                </div>
            </div>`
            addCvMainLeftElement("hobby", classElement)
            break
        case "education":
            classElement = `<div class="cv-main-right-item education editable">
                <div class="title light-color">
                    <i class="fas fa-graduation-cap dark-color"></i>
                    Education
                </div>
                <ul>
                    <li>
                        <div class="school">
                            Ton Duc Thang University
                        </div>
                        <div class="time">
                            Computer Networks and Data Communication | 2019 - Present
                        </div>
                        <ul>
                            <li>
                                GPA: 7.62/10.0
                            </li>
                            <li>
                                3rd prize of WebDesign Hackathon Contest based
                                on Wix.com organized by ICON club
                            </li>
                            <li>
                                Consolation prize of the Recursion contest
                                (knowledge synthesis contest) organized by ICON
                                club.
                            </li>
                            <li>
                                Member of Social Work Club.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="school">
                            Pha Lai high school
                        </div>
                        <div class="time">
                            2016 - 2019
                        </div>
                        <ul>
                            <li>
                                GPA: 8.5/10
                            </li>
                            <li>
                                Consolation prize for Informatics at Hai Duong
                                province
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>`
            addCvMainRightElement("education", classElement)
            break
        case "experience":
            classElement = `<div class="cv-main-right-item experience editable">
                <div class="title light-color experience-1">
                    <i class="fas fa-briefcase dark-color"></i>
                    Work Experience
                </div>
                <ul id="content-experience">
                    <li class="experience-2">
                        <div class="school">
                            Eteacher
                        </div>
                        <div class="time">
                            Math, Physics, Chemistry tutor | 2019-2021
                        </div>
                        <ul>
                            <li>
                                Top 30 excellent tutors in 2019
                            </li>
                            <li>
                                Teaching more than 10 students, minimum teaching
                                time is over 1 semester/student.
                            </li>
                            <li>
                                All of the students have made progress and
                                improved scores
                            </li>
                        </ul>
                    </li>
                    <li class="experience-3">
                        <div class="school">
                            Green Entrepreneurship Fellowship
                        </div>
                        <div class="time">
                            Event Assistant | 2021
                        </div>
                        <ul>
                            <li>
                                Manage groups and social projects
                            </li>
                            <li>
                                Support to organize training sessions
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>`
            addCvMainRightElement("experience", classElement)
            break
        // default:

    }
    loadMargin()
    setCvHeight()
}

function addNameElement() {
    let element = document.getElementsByClassName("cv-header-name-group")
    if (element.length > 0) {
        swal("Oops...", "Kh??ng th??? th??m m???t th??nh ph???n ???? c??!!!", "error")
        return
    }

    let classElement = `
        <div class="cv-header-name-group editable light-color">
            <div class="name">Nguyen Hong Ngoc</div>
            <div class="position">IoT Developer Intern</div>
        </div>`

    $(".cv-header").append(classElement)
}

function addCvMainLeftElement(className, classElement) {
    let element = document.getElementsByClassName(className)
    if (element.length > 0) {
        swal("Oops...", "Kh??ng th??? th??m m???t th??nh ph???n ???? c??!!!", "error")
        return
    }

    $(".cv-main-left").append(classElement)
}

function addCvMainRightElement(className, classElement) {
    let element = document.getElementsByClassName(className)
    if (element.length > 0) {
        swal("Oops...", "Kh??ng th??? th??m m???t th??nh ph???n ???? c??!!!", "error")
        return
    }

    $(".cv-main-right").append(classElement)
}

function marginTop(element, mT) {
    $("." + element).css("margin-top", mT + "px")
}

function loadMargin() {
    marginTopElement("certification")
    marginTopElement("hobby")
    for (let i = 1; i <= 10; i++) {
        marginTopElement("education-" + i)
        marginTopElement("experience-" + i)
    }
}

loadMargin()
// $(".editable").keydown(function () {
//     loadMargin()
//     setCvHeight()
// })

function marginTopElement(element) {
    if ($("." + element)?.length > 0) {
        // const xhr = new XMLHttpRequest()
        // xhr.onload = function () {
            let a4Height
            if (!element.includes("experience-") && !element.includes("education-")) {
                a4Height = 1135.66
            } else {
                a4Height = 1135.14
            }
            
            const topCv = $("#cv").offset()?.top
            const cssMarginTop = parseInt($("." + element).css("margin-top")) + 2
            const topElement = $("." + element).offset()?.top - topCv - cssMarginTop
            const rect = document.querySelector("." + element)?.getBoundingClientRect()
            const bottomElement = rect?.height + topElement
            const mT = a4Height - topElement
            if (topElement < a4Height && bottomElement > (a4Height - 16)) {
                marginTop(element, mT)
            } else {
                marginTop(element, 0)
            }
        // }
        // xhr.open("GET", "cv-1.html", true)
        // xhr.send()
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

$(".add-contact-item").click(function () {
    const dataClass = $(this).attr("data-class")
    if ($("." + dataClass).length > 0) {
        swal("Oops...", dataClass + " ???? c?? r???i", "error")
        return
    }

    const helper = {
        "address": `<div class="address">
                <i class="fas fa-home dark-color"></i>
                Number 19, Nguyen Huu Tho Street, T??n Phong Ward, District 7, HCMC
            </div>`,
        "phone": `<div class="phone">
                <i class="fas fa-phone-alt dark-color"></i>
                0865998764
            <div>`,
        "email": `<div class="email">
                <i class="fas fa-envelope dark-color"></i>
                hongngoc@gmail.com
            <div>`,
        "github": `<div class="github">
                <i class="fab fa-github dark-color"></i>
                hongngoc
            </div>`,
        "linkedin": `<div class="linkedin">
                <i class="fab fa-linkedin dark-color"></i>
                Nguy???n H???ng Ng???c
            </div>`,
        "website": `<div class="website">
                <i class="fas fa-globe dark-color"></i>
                Facebook
            </div>`
    }

    const element = helper[dataClass]

    $("#contact-content").append(element)
})