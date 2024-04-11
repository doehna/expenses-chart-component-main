document.addEventListener('DOMContentLoaded', async function () {
    try {
        const jsonData = await fetchJSONData();
        const chartBarForDay = document.querySelectorAll(".chart__bar-for-day");
        let lastWeek = changeWeeksOrder(jsonData, new Date().getDay());
        let arrayIndex = 0;
        let today = getTodayName();
        let max = getMaxOfJson(jsonData);

        chartBarForDay.forEach(element => {
            addDayName(arrayIndex, element.lastElementChild, lastWeek);
            addTodayClass(element, today);
            setBarHeight(element.firstElementChild, max, jsonData[arrayIndex]);
            addDailyAmount(element.children[1], lastWeek, arrayIndex);
            arrayIndex++;
        });
    }
    catch (error) {
        console.error('Error:', error);
    }

});

async function fetchJSONData() {
    try {
        const response = await fetch("data.json")
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function addDayName(arrayIndex, element, lastWeek) {
        element.innerHTML = lastWeek[arrayIndex].day;
}

function changeWeeksOrder(array, dayId) {
    for (let i = 7; i > dayId; i--) {
        array.splice(0, 0, array.splice(6, 1)[0]);
    }
    return array;
}

function addTodayClass(element, today) {
    element.lastElementChild.innerHTML === today ? element.firstElementChild.classList.add("today") : element.lastElementChild.innerHTML;
}

function getTodayName() {
    var date = new Date();
    return date.toLocaleDateString("en-EN", { weekday: 'short' }).toLocaleLowerCase();
}

function setBarHeight(element, max, jsonElement) {
        element.style.height = `${((jsonElement.amount / max) * 120)}px`;
}

function getMaxOfJson(jsonData) {
    let max = 0;
    jsonData.forEach(element => {
        max = element.amount > max ? element.amount : max;
    })
    return max;
}

function addDailyAmount(element, lastWeek, arrayIndex) {
    element.innerHTML = `$${lastWeek[arrayIndex].amount}`;
}