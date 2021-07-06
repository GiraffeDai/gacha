function addOption() {
    var d = document.getElementById('opt');
    var c = d.cloneNode(true);
    c.childNodes.forEach(element => {
        if (element.tagName == "INPUT") {
            element.value = "";
        }
    });
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "-";
    deleteButton.className = "removeButton";
    deleteButton.onclick = function () {
        removeOption(this);
    };
    c.appendChild(deleteButton);
    c.style.paddingLeft = '25px';
    document.getElementById("comment").appendChild(c);
}

function removeOption(element) {
    element.parentElement.remove();
}

function checkNumVal(v, max) {
    if (v.length > max) {
        v = v.slice(0, max);
    }
    v = v.replace(/\-/g, '');
    var v1 = parseInt(v);
    if (isNaN(v1)) {
        return "";
    }
    if (v1 <= 0) {
        return "";
    }
    return v;
}

function calculateGacha() {
    //
    var perOne = parseInt(document.getElementById('perOneInput').value);
    if (isNaN(perOne) == true) {
        document.getElementById('perOneInput').focus();
        return showErrorAlert("【1抽花費xx顆石頭】未填寫或數值錯誤");
    }
    //
    var gachaMaxTimes = parseInt(document.getElementById('gachaMaxInput').value);
    if (isNaN(gachaMaxTimes) == true) {
        document.getElementById('gachaMaxInput').focus();
        return showErrorAlert("【達成天井需要xx抽】未填寫或數值錯誤");
    }
    //
    var nowHave = parseInt(document.getElementById('nowhaveInput').value);
    if (isNaN(nowHave) == true) {
        document.getElementById('nowhaveInput').focus();
        return showErrorAlert("【目前擁有xx顆石頭】未填寫或數值錯誤");
    }
    //
    var gachaMaxShouldHave = perOne * gachaMaxTimes;
    if (gachaMaxShouldHave <= 0) {
        return showErrorAlert("發生錯誤，請檢查資料正確性");
    }
    var yetNeedHave = gachaMaxShouldHave - nowHave;
    //
    var allOption = document.querySelectorAll(".divCenter.rwdtxt");
    var allOptionData = [];
    allOption.forEach(opt => {
        var optionData = [];
        opt.childNodes.forEach(element => {
            if (element.tagName == "INPUT") {
                var optVal = parseInt(element.value);
                if (!isNaN(optVal)) {
                    optionData.push(optVal);
                }
            }
        });
        if (optionData.length == 2) {
            allOptionData.push(optionData);
        }
    });
    //
    if (allOptionData.length <= 0) {
        return showErrorAlert("需至少填寫完整一項參數\n【每隔x天，可獲得xx顆石頭】");
    }
    var totalDayCount = 0;
    do {
        totalDayCount++;
        allOptionData.forEach(optData => {
            if (totalDayCount % optData[0] == 0) {
                yetNeedHave -= optData[1];
            }
        });
    }
    while (yetNeedHave >= 1);
    showSuccessAlert(totalDayCount);
}

function showExample(){
    Swal.fire({
        imageUrl: './example.png',
        customClass: 'swal-wide',
      })
}

function showSuccessAlert(totalDayCount) {
    var dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() + totalDayCount);
    dateTime = new Date(dateTime);
    Swal.fire({
        icon: 'info',
        text: "需耗時" + totalDayCount + "天\n預計於 " + dateTime.toLocaleDateString() + " 達成天井目標"
    });
}

function showErrorAlert(message) {
    Swal.fire({
        icon: 'error',
        text: message
    });
}
