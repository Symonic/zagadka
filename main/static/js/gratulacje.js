let ile_zagadek = document.querySelector('#ile-zag-par').innerText

let komunikaty = new Array(ile_zagadek);
let kod='1'

for(let i=0;i<ile_zagadek;i++){
    if(sessionStorage.getItem(`uz${i+1}`) == "niewyswietlone"){
        kod = '0'
    }
    else{
        kod = sessionStorage.getItem(`z${i+1}`)
    }

    switch(kod){
        case '1':
            komunikaty[i] = 'Nie użyłeś/aś żadnej podpowiedzi!';
            break;
        case '2':
            komunikaty[i] = 'Użyłeś/aś jednej podpowiedzi.'
            break;
        case '3':
            komunikaty[i] = 'Użyłeś/aś dwóch podpowiedzi.'
            break;
        case '4':
            komunikaty[i] = 'Użyłeś/aś dwóch podpowiedzi i odsłoniłeś/aś odpowiedź.'
            break;
        case '5':
            komunikaty[i] = 'Użyłeś/aś jednej podpowiedzi i odsłoniłeś/aś hasło.'
            break;
        case '6':
            komunikaty[i] = 'Nie użyłeś/aś żadnej podpowiedzi, ale odsłoniłeś/aś hasło.'
            break;
        default:
            komunikaty[i] = 'Nie rozwiązałeś/aś tej zagadki.'
            break;
    }
}

for(let i=1;i<=ile_zagadek;i++){

    let par = document.createElement('p');
    let br = document.createElement('br');
    par.innerHTML = `Zagadka ${i} : ${komunikaty[i-1]} <br />`

    document.querySelector('#wynikowe').appendChild(par);
}



document.querySelector('#od-nowa').addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let data = { up : "restart" } // restart - rozpoczecie od poczatku
    fetch('/pobierz_zagadke/', {
        method : "POST", 
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body : JSON.stringify(data)
    }).then((response) => {
        location.replace('/')
    })
})






            fb_div = document.querySelector('.fb-hover-div');
            fb_napis = document.querySelector('.fb-text');
            fb_icon = document.querySelector('.fb-icon');
            
            fb_div.addEventListener('mouseover', () => {
                fb_div.classList.add('fb-hover-div-wide');
                fb_napis.classList.add('fb-text-visible');
            })

            fb_div.addEventListener('mouseout', () => {
                fb_div.classList.remove('fb-hover-div-wide');
                fb_napis.classList.remove('fb-text-visible');
            })

            fb_div.addEventListener('click', () => {
                window.location = "https://www.facebook.com";
            })