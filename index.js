/**
 * Created by Administrator on 2018/3/1.
 */
var content = document.getElementById('content');
var now = document.getElementById('now');
var left = document.getElementById('left');
var right = document.getElementById('right');

/*动态创建底下的日期部分*/
var day = document.createElement('ul');

/*把类名'day'加给这个新创建的ul*/
day.classList.toggle('day');
/*将这个Ul放到类名为content的div里*/
content.appendChild(day);

/*获取系统当前时间*/
var d = new Date();
var monthLetter = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/*当前日期对象:当年年份，月份，天数，和每个月的第一天所对应的星期数*/
var date = {
    year: d.getFullYear(),
    month: [d.getMonth()+1, monthLetter[d.getMonth()]],
    day: d.getDate(),
    startDay: (d.getDate()-1)%7-(d.getDay()+1)
}


/*上下翻页改变以后的日期*/
var changeMonth = date.month[0];
var changeYear = date.year;

/*拿到那个月的开始第一天所对应的星期数*/
var changeStartDay = getStartDay(changeMonth, changeYear);
if(changeStartDay == 0) {
    changeStartDay = 7;
}

/*创建40个空li放到刚才创建的ul里，每个li里面还有1个a标签，a标签里面放日历下半部分中的天数*/
/*注意这时a标签里没有天数，后面根据每个月的天数不同动态加内容*/
for(var i=0; i<40; i++) {
    var oA = document.createElement('a');
    oA.href = '#';
    var oLi = document.createElement('li');
    oLi.appendChild(oA);
    day.appendChild(oLi);
}

var days = day.getElementsByTagName('a');

/*左右翻页后，改变日历下班部分*/
changeBody(changeYear, changeMonth, changeStartDay);
/*左右翻页后，改变日历上半部分*/
setStyle(changeStartDay);

/*左右翻页后，改变底部部分*/
function changeBody(changeYear, changeMonth, changeStartDay) {
    for(var i=0; i<40; i++) {
        days[i].innerHTML = '';
    }

    /*从开始日期开始，向后给a标签里加内容，1，2，3，4.......这个月有多少天，就加多少个*/
    for(var i=0; i<getNumberOfDaysInMonth(changeYear, changeMonth); i++) {
        days[changeStartDay+i-1].innerHTML = i+1+'';
    }
}


/*得到对应月份开始的第一天所处位置*/
function getStartDay(m, y) {
    var START_DAY_FOR_JAN_1_1800 = 3;
    var totalNumberOfDays = getTotalNumberOfDays(m, y);
    return (totalNumberOfDays+START_DAY_FOR_JAN_1_1800)%7;
}

/*拿到从格林威治时间到现在的所有时间*/
function getTotalNumberOfDays(m, y) {
    var total = 0;

    for(var i=1800; i<y; i++) {
        if(isLeapYear(i)) {
            total = total + 366;
        } else {
            total = total + 365;
        }
    }

    for(var i=1; i<m; i++) {
        total = total + getNumberOfDaysInMonth(y, i);
    }

    return total;
}

/*得到对应月中的天数*/
function getNumberOfDaysInMonth(y, m) {

    if(m == 1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12) {
        return 31;
    } else if(m==4 || m==6 || m==9 || m==11){
        return 30;
    } else if(m==2) {
        return isLeapYear(y)?29:28;
    }
}

/*判断是否为闰年*/
function isLeapYear(y) {
    return y%400 == 0 || (y%4==0&&y%100!=0);
}

/*设置上半部分的样子和点击以后底色变为绿色的样子*/
function setStyle(changeStartDay) {
    for(var j=0; j<days.length; j++) {
        /*先把所有的a背景颜色都去掉*/
        days[j].style.background = '#eeeeee';
    }
    /*再将当前日期的背景变为绿色*/
    days[changeStartDay+date.day-2].style.background = '#1abc9c';
    now.innerHTML = '';
    now.innerHTML = monthLetter[changeMonth-1] + '</br>' + changeYear;
}

for(var i=changeStartDay-1; i<days.length; i++) {

    /*当点击的日期大于当前日期时才变绿色*/
    if(parseInt(days[i].textContent)>=date.day) {
        days[i].addEventListener('click', function () {
            for(var j=0; j<days.length; j++) {
                days[j].style.background = '#eeeeee';
            }
            this.style.background = '#1abc9c';
            date.day = parseInt(this.textContent);
        }, false);
    }

    days[i].addEventListener('mouseover', function () {
        if(parseInt(this.textContent) != date.day) {
            this.style.background = 'orange';
        }
    }, false);
    days[i].addEventListener('mouseout', function () {
        if(parseInt(this.textContent) != date.day) {
            this.style.background = '#eeeeee';
        }
    }, false);

}

/*向左翻页*/
left.addEventListener('click', function () {

    now.innerHTML = '';

    /*每向左翻一页，改变日期减1*/
    changeMonth--;
    if(changeMonth == 0) {

        /*当翻到1月后，月份变为12月，年份减1*/
        changeYear--;
        now.innerHTML = 'December' + '</br>' + changeYear;
        changeMonth = 12;
    } else {
        now.innerHTML = monthLetter[changeMonth-1] + '</br>' + changeYear;
    }
    changeStartDay = getStartDay(changeMonth, changeYear);
    if(changeStartDay == 0) {
        changeStartDay=7;
    }
    changeBody(changeYear, changeMonth, changeStartDay);
    setStyle(changeStartDay);
}, false);

/*向右翻同理*/
right.addEventListener('click', function () {

    now.innerHTML = '';
    changeMonth++;
    if(changeMonth == 13) {
        changeYear++;
        now.innerHTML = 'January' + '</br>' + changeYear;
        changeMonth = 1;
    } else {
        now.innerHTML = monthLetter[changeMonth-1] + '</br>' + changeYear;
    }

    changeStartDay = getStartDay(changeMonth, changeYear);
    if(changeStartDay == 0) {
        changeStartDay=7;
    }
    changeBody(changeYear, changeMonth, changeStartDay);
    setStyle(changeStartDay);
}, false);
