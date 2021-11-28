// Color item clicked
$(".color-item").click(function () {
    $(".color-item").removeClass("active")
    $(this).addClass("active")

    console.log($(this).attr("data-light"))

    const darkColor = $(this).attr("data-dark")
    const lightColor = $(this).attr("data-light")

    $(".dark-color").css("background-color", darkColor)
    $(".light-color").css("background-color", lightColor)
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
                    <li class="address">Địa chỉ: 903 Trần Xuân Soạn</li>
                    <li class="phone">SĐT: 012345678</li>
                    <li class="email">Email: baovy@gmail.com</li>
                    <li class="github">Github: baovy@nodejs_vivian</li>
                </ul>
            </div>`
            addCvMainLeftElement("activicontactty", classElement)
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
                <ul>
                    <li>
                        <div class="header">THÁNG 7/2020</div>
                        <div class="content">MÙA HÈ XANH: Làm việc teamwork,
                            phát gạo cho người dân, dọn cỏ và sinh
                            hoạt ở nhà văn hoá
                        </div>
                    </li>
                    <li>
                        <div class="header">THÁNG 11/2020</div>
                        <div class="content">LEADER FLY: Dự án được thực hiện dự
                            trên sự quản lí tài chính của cá nhân
                            mỗi người, đưa ra những phân tích và
                            chiếc lược cho content
                        </div>
                    </li>
                    <li>
                        <div class="header">THÁNG 1/2021</div>
                        <div class="content">
                            XUÂN TÌNH NGUYỆN: Phát quà xuân
                            cho các bạn nhỏ tại tỉnh Long An. Tham
                            gia bữa ăn tình thương và các hoạt
                            động ca hát.
                        </div>
                    </li>
                </ul>
            </div>`
            addCvMainLeftElement("activity", classElement)
            break
        case "education":
            classElement = `<div class="education cv-main-right-item editable">
                <div class="title">Học vấn</div>
                <ul>
                    <li>Trình độ: Sinh viên năm 3</li>
                    <li>Trường: Đại học Tôn Đức Thắng</li>
                    <li>
                        Ngoại ngữ:
                        <ul>
                            <li>Tiếng Anh: IELTS 7.0</li>
                            <li>Tiếng Trung: HSK 5</li>
                        </ul>
                    </li>
                </ul>
            </div>`
            addCvMainRightElement("education", classElement)
            break
        case "award":
            classElement = ` <div class="award cv-main-right-item editable">
                <div class="title">Giải thưởng</div>
                <ul>
                    <li>Giải nhì: Cuộc thi nét đẹp sinh viên</li>
                    <li>Giải nhì: Cuộc thi học thuật</li>
                </ul>
            </div>`
            addCvMainRightElement("award", classElement)
            break
        case "skill":
            classElement = ` <div class="skill cv-main-right-item editable">
                <div class="title">Kỹ năng</div>
                <ul>
                    <li>HTML: 85%</li>
                    <li>CSS: 85%</li>
                    <li>JavaScript: 85%</li>
                </ul>
            </div>`
            addCvMainRightElement("skill", classElement)
            break
        case "experience":
            classElement = `<div class="experience cv-main-right-item editable">
                <div class="title">Kinh nghiệm làm việc</div>
                <ul>
                    <li>Tháng 2/2021- 6/2021: Thực tập tại
                        công ty FPT.
                    </li>
                    <li>Tháng 7/2021 - 9/2021: Làm việc tại
                        công ty Shopee.</li>
                    <li>Tháng 10/2021 - hiện tại: Làm việc
                        tại công ty Alta Softwave.</li>
                </ul>
            </div>`
            addCvMainRightElement("experience", classElement)
            break
        // default:

    }
}

function addNameElement() {
    let element = document.getElementsByClassName("cv-header-name-group")
    if (element.length > 0) {
        alert("Không thể thêm một thành phần đã có")
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
        alert("Không thể thêm một thành phần đã có")
        return
    }

    $(".cv-main-left").append(classElement)
}

function addCvMainRightElement(className, classElement) {
    let element = document.getElementsByClassName(className)
    if (element.length > 0) {
        alert("Không thể thêm một thành phần đã có")
        return
    }
        
    $(".cv-main-right").append(classElement)
}
