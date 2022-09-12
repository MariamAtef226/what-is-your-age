let days = new Map([
  [1,31],
  [2,28],
  ["2leap",29],
  [3,31],
  [4,30],
  [5,31],
  [6,30],
  [7,31],
  [8,31],
  [9,30],
  [10,31],
  [11,30],
  [12,31]
]);

function checkLeap(year){
  if (year%4 == 0)
    return days.get("2leap");
  else
    return days.get(2);
}


window.onload= function(){


  let btn = document.querySelector("button");
  let mo = document.querySelector("#mo");
  let dy = document.querySelector("#dy");
  let hr = document.querySelector("#hr");
  let min = document.querySelector("#min");
  let sec = document.querySelector("#sec");
  let yr = document.querySelector("#yr");

  //creating years list
  let d = new Date();
  var j = d.getFullYear();
  for (; j>1921; j--){
    let o = document.createElement("option");
    if (j==d.getFullYear())
      o.selected=true;
    o.value = j;
    o.innerText = j;
    yr.append(o);
  }
  //creating month list
  for (j=1; j<d.getMonth()+2; j++){
    let o = document.createElement("option");
    if (j==1)
      o.selected = true;
    o.value = j;
    o.innerText = j;
    mo.append(o);
  }

  //update month value in case of year selection:
  yr.onchange = function(){
    dy.value = 1;
    let d = new Date();
    let l = document.querySelectorAll('#mo option');
    if (yr.value == d.getFullYear()){
      l.forEach(function(el){ if(el.value > d.getMonth()+1) el.remove()});
    }
    else{
      l.forEach(function(el){ el.remove();});
      for (j=1; j<13; j++){
        let o = document.createElement("option");
        if (j==1)
          o.selected = true;
        o.value = j;
        o.innerText = j;
        mo.append(o);
      }
    }
  }

  //create days
  for (k=1;k<32 ;k++){
    let o = document.createElement("option");
    if (k==1)
      o.selected = true;
    o.value = k;
    o.innerText = k;
    dy.append(o);
  }
  //validate day
  dy.onchange= function(){
    let d = new Date();
    let val1 = mo.value;
    let val2 = yr.value;
    //check leap year
    if (val1 == d.getMonth()+1 && val2 == d.getFullYear())
      var max = d.getDate();
    else if (val1 == 2)
      var max = checkLeap(val2);
    else
      var max = days.get(val1);
    if (dy.value > max){
      dy.value = max;

    }
}

  //creating layout of display
  let num1 = document.createElement("div");
  num1.innerText = 00;
  num1.style="font-size:5.5rem";
  let nums = [num1];
  for (let i = 0; i < 5; i++){
    nums.push(num1.cloneNode(true));
        nums[i].classList.add("time");
  }

  let txts = [];
  let strs = ["Years","Months","Days","Hours","Minutes","Seconds"];
  for (let i = 0; i < 6; i++){
    txts.push(document.createElement("div"));
    txts[i].innerText = strs[i];

  }

  let divs = [];
  for (let i = 0; i < 6; i++){
    let d = document.createElement("div")
    d.append(nums[i]);
    d.append(txts[i]);
    divs.push(d);
  }

  let bigdiv =document.querySelector(".age");
  for (let i = 0; i < 6; i++){
    bigdiv.append(divs[i]);
  }


  var intervalId;
  btn.addEventListener('click',function(event){
    event.preventDefault();
    let year = Number(yr.value);
    let month = Number(mo.value);
    let day = Number(dy.value);
    let hour = Number(hr.value);
    let minute = Number(min.value);
    let second =Number(sec.value);


      if (!intervalId) {
        intervalId = setInterval(calcAge,1000,year,month,day,hour,minute,second);
      } else {
        clearInterval(intervalId);
        intervalId = setInterval(calcAge,1000,year,month,day,hour,minute,second);
      }


  });

}

function calcAge(year,month,day,hour,minute,second){
  let currDate = new Date();
  let currYear = currDate.getFullYear();
  let currMonth = currDate.getMonth()+1;
  let currDay = currDate.getDate();
  let currHour = currDate.getHours();
  let currMin = currDate.getMinutes();
  let currSec = currDate.getSeconds();
  var s,m,h,d,mo,y;
  if (currSec >= second ){
  s = currSec-second;
}
  else{
  currMin -=1;
  let temp = currSec;
  temp += (60-second);
  s = temp;
}

  if (currMin >= minute ){
  m = currMin-minute;
}
  else{
  currHour -=1;
  let temp = currMin;
  temp += (60-minute);
  m = temp;
}

  if (currHour >= hour ){
  h = currHour-hour;
}
  else{
  currDay -=1;
  let temp = currHour;
  temp += (24-hour);
  h = temp;
}

  if (currDay >= day ){
  d = currDay - day;
}
  else{
  currMonth -=1;
  let temp = currDay;
  var temp2;
  if (currMonth == 2)
    temp2 = checkLeap(currYear);
  else
    temp2 = days.get(currMonth);
  temp += (temp2-day);
  d = temp;
}

  if (currMonth>= month ){
  mo = currMonth - month;
}
  else{
  currYear -=1;
  let temp = currMonth;
  temp += (12-month);
  mo = temp;
}

  y = currYear - year;


  let arr = [y,mo,d,h,m,s];
  let time = document.querySelectorAll(".time");

  for (let i = 0; i<6;i++){
    time[i].innerText = arr[i];
  }
}
