const basedelay = 10000

setTimeout(switchImage,basedelay + 5000);


function switchImage(){
    const poster1 = document.getElementById("poster1");
    const poster2 = document.getElementById("poster2");
    poster1.hidden = !poster1.hidden;
    poster2.hidden = !poster2.hidden;

    let delay = basedelay + Math.floor(Math.random() * 4000);
    setTimeout(switchImage,delay);
}