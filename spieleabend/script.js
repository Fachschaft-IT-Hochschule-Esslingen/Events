const today = new Date();
today.setHours(0,0,0,0);

const events = document.querySelectorAll("#events p");

let nextEvent = null;

events.forEach(p => {

    const text = p.textContent;
    const match = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);

    if(!match) return;

    const eventDate = new Date(match[3], match[2]-1, match[1]);

    if(eventDate < today){

        p.classList.add("past");

    } else if(!nextEvent){

        nextEvent = p;

    }

});

if(nextEvent){
    nextEvent.classList.add("next");
}