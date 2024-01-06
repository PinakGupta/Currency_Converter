const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected=select;
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected=select;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(eve)=>{
        updateFlag(eve.target);
    })
}

const updateFlag = (element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

const updateExchangeRate = async() =>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" ||  amtVal <1){
        amtVal=1;
        amount.value="1";
    }
    let c1=fromCurr.value.toLowerCase();
    let c2=toCurr.value.toLowerCase();
    const URL=`${BASE_URL}/${c1}/${c2}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[c2];
    
    let finalAmount=amtVal*rate;
    console.log(msg.innerText);
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    console.log(msg.innerText);
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})

btn.addEventListener("click",(eve)=>{
    eve.preventDefault();
    updateExchangeRate();
})
