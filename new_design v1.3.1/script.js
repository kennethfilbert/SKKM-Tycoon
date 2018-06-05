var skkmAmount=1;
var seminarLevel=0;
var seminarMultiply=1.1;
var seminarSkkm=0;
var organisasiLevel=0;
var organisasiMultiply=1.1;
var organisasiSkkm=0;
var workshopLevel=0;
var workshopMultiply=1.1;
var workshopSkkm=0;
var lombaLevel=0;
var lombaMultiply=1.1;
var lombaSkkm=0;
var autoSkkm=0;
var loaded=0;

function init(){
    loadGame();
    initUpgrades();
    updateAutoSKKM();
    updateSkkm(0);
    document.getElementById("game-hero").src = "gedung_b.png"
    //document.getElementById("game-hero").addEventListener("click",function(){updateSkkm(1)})
    document.getElementById("seminar").addEventListener("click",function() {buySeminar()});
    document.getElementById("workshop").addEventListener("click",function() {buyWorkshop()});
    document.getElementById("organisasi").addEventListener("click",function() {buyOrganisasi()});
    document.getElementById("lomba").addEventListener("click",function() {buyLomba()});
    document.getElementById('game-hero').ondragstart = function() { return false; };
    document.getElementById("powerup").addEventListener("click",function(){hideOrShow()});
    document.getElementById('save').addEventListener("click",function() {saveGame()});
    document.getElementById('load').addEventListener("click",function(){loadGame()});
    document.getElementById('closesave').addEventListener("click",function(){closeSliderSave()});
    document.getElementById('closeload').addEventListener("click",function(){closeSliderLoad()});
    document.getElementById('loadtext').addEventListener("click",function(){loadFromText(document.getElementById('loadfile').value)})
    document.getElementById('reset').addEventListener("click",function(){resetData()});
    document.getElementById('reset2').addEventListener("click",function(){resetData()})
}
function resetData() {
    localStorage.removeItem("save");
}
function initUpgrades() {
    var buyCost;
    buyCost=1;
    document.getElementById("seminarCost").innerHTML = buyCost; 
    document.getElementById("seminarLevel").innerHTML= seminarLevel;
    seminarSkkm=seminarLevel*1;
    document.getElementById("seminarSkkm").innerHTML=seminarSkkm;
    buyCost=Math.floor(50*Math.pow(workshopMultiply,workshopLevel));
    document.getElementById("workshopCost").innerHTML = buyCost; 
    document.getElementById("workshopLevel").innerHTML= workshopLevel;
    workshopSkkm=workshopLevel*5;
    document.getElementById("workshopSkkm").innerHTML= workshopSkkm;
    buyCost=Math.floor(500*Math.pow(organisasiMultiply,organisasiLevel));
    document.getElementById("organisasiCost").innerHTML = buyCost; 
    document.getElementById("organisasiLevel").innerHTML= organisasiLevel;
    organisasiSkkm=organisasiLevel*10;
    document.getElementById("organisasiSkkm").innerHTML= organisasiSkkm;
    buyCost=Math.floor(2000*Math.pow(lombaMultiply,lombaLevel));
    document.getElementById("lombaCost").innerHTML = buyCost; 
    document.getElementById("lombaLevel").innerHTML= lombaLevel;
    lombaSkkm=lombaLevel*50;
    document.getElementById("lombaSkkm").innerHTML= lombaSkkm;
    
}
function closeSliderSave() {
    document.getElementById('sliderSave').classList.toggle('closed');
}
function closeSliderLoad() {
    document.getElementById('sliderLoad').classList.toggle('closed');
}
function loadFromText(data) {
    if(data=="") return;
    var savedata = JSON.parse(data);
    if (typeof savedata.skkmAmount !== "undefined") skkmAmount = savedata.skkmAmount; 
    if (typeof savedata.seminarLevel !== "undefined") seminarLevel = savedata.seminarLevel;
    if (typeof savedata.workshopLevel!=="undefined") workshopLevel= savedata.workshopLevel; 
    if (typeof savedata.organisasiLevel!=="undefined") organisasiLevel=savedata.organisasiLevel;
    document.getElementById('sliderSave').classList.toggle('closed');
}
function saveGame() {
    var save = {
        skkmAmount: skkmAmount,
        seminarLevel:seminarLevel,
        organisasiLevel:organisasiLevel,
        workshopLevel:workshopLevel,
        lombaLevel:lombaLevel
    }
    document.getElementById("savefile").value=JSON.stringify(save);
    localStorage.setItem("save",JSON.stringify(save)); 
    document.getElementById('sliderSave').classList.toggle('closed');
}
function loadGame() {
    var savedata = JSON.parse(localStorage.getItem("save")); 
    if(savedata==null) {
        return;
    }
    if(loaded==0) {
        if (typeof savedata.skkmAmount !== "undefined") skkmAmount = savedata.skkmAmount; 
        if (typeof savedata.seminarLevel !== "undefined") seminarLevel = savedata.seminarLevel;
        if (typeof savedata.workshopLevel!=="undefined") workshopLevel= savedata.workshopLevel; 
        if (typeof savedata.organisasiLevel!=="undefined") organisasiLevel=savedata.organisasiLevel;
        if (typeof savedata.lombaLevel!=="undefined") lombaLevel=savedata.lombaLevel;
    }
    if(loaded==1)document.getElementById('sliderLoad').classList.toggle('closed');
    loaded=1;    
}  
function updateSkkm(number) {
    skkmAmount=skkmAmount+number;
    document.getElementById("skkm").innerHTML=skkmAmount;
}
function buySeminar() {
    var buyCost=Math.floor(10*Math.pow(seminarMultiply,seminarLevel));
    if(seminarLevel==0) buyCost=1;
    if(skkmAmount >= buyCost) {
        seminarLevel=seminarLevel+1;
        skkmAmount=skkmAmount-buyCost;
        document.getElementById("seminarLevel").innerHTML= seminarLevel;
        document.getElementById("skkm").innerHTML=skkmAmount;
    }
    var nextCost=Math.floor(10 * Math.pow(seminarMultiply,seminarLevel));
    document.getElementById("seminarCost").innerHTML = nextCost; 
    seminarSkkm=seminarLevel;
    document.getElementById("seminarSkkm").innerHTML=seminarSkkm;
    updateAutoSKKM();
}
function buyWorkshop() {
    var buyCost=Math.floor(50*Math.pow(workshopMultiply,workshopLevel));
    if(skkmAmount >= buyCost) {
        workshopLevel=workshopLevel+1;
        skkmAmount=skkmAmount-buyCost;
        document.getElementById("workshopLevel").innerHTML= workshopLevel;
        document.getElementById("skkm").innerHTML=skkmAmount;
    }
    var nextCost=Math.floor(50 * Math.pow(workshopMultiply,workshopLevel));
    document.getElementById("workshopCost").innerHTML = nextCost; 
    workshopSkkm=workshopLevel*5;
    document.getElementById("workshopSkkm").innerHTML=workshopSkkm;
    updateAutoSKKM();
}
function buyOrganisasi() {
    var buyCost=Math.floor(500*Math.pow(organisasiMultiply,organisasiLevel));
    if(skkmAmount >= buyCost) {
        organisasiLevel=organisasiLevel+1;
        skkmAmount=skkmAmount-buyCost;
        document.getElementById("organisasiLevel").innerHTML= organisasiLevel;
        document.getElementById("skkm").innerHTML=skkmAmount;
    }
    var nextCost=Math.floor(500 * Math.pow(organisasiMultiply,organisasiLevel));
    document.getElementById("organisasiCost").innerHTML = nextCost; 
    organisasiSkkm=organisasiLevel*10;
    document.getElementById("organisasiSkkm").innerHTML=organisasiSkkm;
    updateAutoSKKM();
}
function buyLomba() {
    var buyCost=Math.floor(2000*Math.pow(lombaMultiply,lombaLevel));
    if(skkmAmount >= buyCost) {
        lombaLevel=lombaLevel+1;
        skkmAmount=skkmAmount-buyCost;
        document.getElementById("lombaLevel").innerHTML= lombaLevel;
        document.getElementById("skkm").innerHTML=skkmAmount;
    }
    var nextCost=Math.floor(2000 * Math.pow(lombaMultiply,lombaLevel));
    document.getElementById("lombaCost").innerHTML = nextCost; 
    lombaSkkm=lombaLevel*50;
    document.getElementById("lombaSkkm").innerHTML=lombaSkkm;
    updateAutoSKKM();
}

function hideOrShow() {
    var x = document.getElementById("Gedung-B");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
} 
function updateAutoSKKM() {
    autoSkkm=seminarSkkm+workshopSkkm+organisasiSkkm+lombaSkkm;
    document.getElementById("autoSkkm").innerHTML = autoSkkm; 
}
window.setInterval(function(){
    updateSkkm(seminarSkkm);
    updateSkkm(workshopSkkm);
    updateSkkm(organisasiSkkm);
    updateSkkm(lombaSkkm);
}, 1000);