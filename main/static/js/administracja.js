let fileinput = document.querySelector("#prze-plik");
let fileinput2 = document.querySelector("#prze-plik2")
let fileinput3 = document.querySelector('#prze-plik3')
let fileinput4 = document.querySelector('#prze-plik4')
let fileinput5 = document.querySelector('#prze-plik5')

let file = '', file2 = '', file3 = '', file4 = '', file5 = '';

fileinput.addEventListener('change', () => {
    file = fileinput.files[0];

    console.log(file.size);

    let _URL = window.URL || window.webkitURL;

    let image = new Image();
    let objectUrl = _URL.createObjectURL(file);

    image.onload = function () {
        let height = this.height;
        let width = this.width;
        
        if(height > 100 || width > 400){
            
            document.querySelector("#plik-info").innerHTML = `Niepoprawny wymiar pliku (400x100)`
            fileinput.value = '';
            file = ''
        }
    }
    image.src = objectUrl
})

fileinput2.addEventListener('change', () => {
    file2 = fileinput2.files[0];

    console.log(file2.size);

    let _URL = window.URL || window.webkitURL;

    let image = new Image();
    let objectUrl = _URL.createObjectURL(file2);

    image.onload = function () {
        let height = this.height;
        let width = this.width;
        
        if(height > 100 || width > 400){
            
            document.querySelector("#plik-info").innerHTML = `Niepoprawny wymiar pliku (400x100)`
            fileinput2.value = '';
            file2 = ''
        }
    }
    image.src = objectUrl
})

fileinput3.addEventListener('change', () => {
    file3 = fileinput3.files[0];

    console.log(file3.size);

    let _URL = window.URL || window.webkitURL;

    let image = new Image();
    let objectUrl = _URL.createObjectURL(file3);

    image.onload = function () {
        let height = this.height;
        let width = this.width;
        
        if(height > 106 || width > 40){
            
            document.querySelector("#plik-info").innerHTML = `Niepoprawny wymiar pliku (40x106)`
            fileinput3.value = '';
            file3 = ''
        }
    }
    image.src = objectUrl
})

fileinput4.addEventListener('change', () => {
    file4 = fileinput4.files[0];

    console.log(file4.size);

    let _URL = window.URL || window.webkitURL;

    let image = new Image();
    let objectUrl = _URL.createObjectURL(file4);

    image.onload = function () {
        let height = this.height;
        let width = this.width;
        
        if(height > 100 || width > 600){
            
            document.querySelector("#plik-info").innerHTML = `Niepoprawny wymiar pliku (600x100)`
            fileinput4.value = '';
            file4 = ''
        }
    }
    image.src = objectUrl
})

fileinput5.addEventListener('change', () => {
    file5 = fileinput5.files[0];

    console.log(file5.size);

    let _URL = window.URL || window.webkitURL;

    let image = new Image();
    let objectUrl = _URL.createObjectURL(file5);

    image.onload = function () {
        let height = this.height;
        let width = this.width;
        
        if(height > 100 || width > 300){
            
            document.querySelector("#plik-info").innerHTML = `Niepoprawny wymiar pliku (300x100)`
            fileinput5.value = '';
            file5 = ''
        }
    }
    image.src = objectUrl
})


document.querySelector('#butt-czysc').addEventListener('click', () => {
    fileinput.value = '';
    file = ''
})

document.querySelector('#butt-czysc2').addEventListener('click', () => {
    fileinput2.value = '';
    file2 = ''
})

document.querySelector('#butt-czysc3').addEventListener('click', () => {
    fileinput3.value = '';
    file3 = ''
})

document.querySelector('#butt-czysc4').addEventListener('click', () => {
    fileinput4.value = '';
    file4 = ''
})

document.querySelector('#butt-czysc5').addEventListener('click', () => {
    fileinput5.value = '';
    file5 = ''
})

document.querySelector("#butt-plik").addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const formData = new FormData();

    if(file != ''){
        formData.append("docfile", file);
        fetch('nowa_graf/podp1/', {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            body: formData
        })
    }
    
})

document.querySelector("#butt-plik2").addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const formData = new FormData();

    if(file2 != ''){
        formData.append("docfile", file2);
        fetch('nowa_graf/podp2/', {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            body: formData
        })
    }
    
})

document.querySelector("#butt-plik3").addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const formData = new FormData();

    if(file3 != ''){
        formData.append("docfile", file3);
        fetch('nowa_graf/submit/', {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            body: formData
        })
    }
    
})

document.querySelector("#butt-plik4").addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const formData = new FormData();

    if(file4 != ''){
        formData.append("docfile", file4);
        fetch('nowa_graf/tyt/', {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            body: formData
        })
    }
    
})

document.querySelector("#butt-plik5").addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const formData = new FormData();

    if(file5 != ''){
        formData.append("docfile", file5);
        fetch('nowa_graf/rozp/', {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            body: formData
        })
    }
    
})

document.querySelector("#nowa-zag-butt").addEventListener('click', () => {
    let nowa_zagadka = document.querySelector("#zagadka-content-nowa");
    let form = document.createElement('form');


    let pole_tresc = document.createElement('input');
    pole_tresc.setAttribute("type", "text");
    pole_tresc.setAttribute("name", "pole-tresc");
    pole_tresc.setAttribute("placeholder", "Treść zagadki");

    let pole_odpowiedz = document.createElement('input');
    pole_odpowiedz.setAttribute("type", "text");
    pole_odpowiedz.setAttribute("name", "pole-odpowiedz");
    pole_odpowiedz.setAttribute("placeholder", "Odpowiedź");
    
    let pole_podp1 = document.createElement('input');
    pole_podp1.setAttribute("type", "text");
    pole_podp1.setAttribute("name", "pole-podp1");
    pole_podp1.setAttribute("placeholder", "Podpowiedź 1");

    let pole_podp2 = document.createElement('input');
    pole_podp2.setAttribute("type", "text");
    pole_podp2.setAttribute("name", "pole-podp2");
    pole_podp2.setAttribute("placeholder", "Podpowiedź 2");

    let pole_kluczWe = document.createElement('input');
    pole_kluczWe.setAttribute("type", "text");
    pole_kluczWe.setAttribute("name", "pole-kluczWe");
    pole_kluczWe.setAttribute("placeholder", "Klucz wejściowy");

    let pole_kluczWy = document.createElement('input');
    pole_kluczWy.setAttribute("type", "text");
    pole_kluczWy.setAttribute("name", "pole-kluczWy");
    pole_kluczWy.setAttribute("placeholder", "Klucz wyjściowy");

    let pole_grafika = document.createElement('input');
    pole_grafika.setAttribute("type", "file");
    pole_grafika.setAttribute("name", "pole-grafika");
    pole_grafika.setAttribute("placeholder", "grafika");

    let submit = document.createElement('button');
    submit.setAttribute('id', 'form-submit');
    submit.innerText = "Utwórz";


    form.append(pole_tresc);
    form.append(pole_odpowiedz);
    form.append(pole_podp1);
    form.append(pole_podp2);
    form.append(pole_kluczWe);
    form.append(pole_kluczWy);
    form.append(pole_grafika);
    
    nowa_zagadka.appendChild(form);
    nowa_zagadka.appendChild(submit);


    document.querySelector('#form-submit').addEventListener('click', () => {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const data = new FormData(form);
            fetch('/pobierz_zagadke/', {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            body: data
        })
    })

    let plus = document.querySelector('#nowa-zag-butt');
    document.querySelector('#zagadka-icons-nowa').removeChild(plus);
    
    let minus = document.createElement('img');
    minus.setAttribute('src', '/media/images/rest/minus.png');
    minus.setAttribute('id', 'icon-minus');
    minus.setAttribute('class', 'icon');

    document.querySelector('#zagadka-icons-nowa').appendChild(minus);
    
    document.querySelector('#icon-minus').addEventListener('click', () => {
        document.querySelector('#zagadka-icons-nowa').removeChild(minus)
        document.querySelector('#zagadka-icons-nowa').appendChild(plus)
        nowa_zagadka.removeChild(form)
        nowa_zagadka.removeChild(submit)
    })

    
})

//////////// PRZYCISKI EDYCJI ///////////////////////////////////////////////////////////////////////

let edit_buttons = document.querySelectorAll('.edit');


for(button of edit_buttons){
    button.addEventListener('click', (event) => {
        const grandParent = event.target.parentElement.parentElement
        let child = grandParent.children[0]
        
        let submit = document.createElement('button');
        submit.setAttribute('id', 'form-edit');
        submit.innerText = "Zmień";
        child.appendChild(submit);

        
        
        let minus = document.createElement('img');
        minus.setAttribute('src', '/media/images/rest/minus.png');
        minus.setAttribute('id', 'icon-minus');
        minus.setAttribute('class', 'icon');

        event.target.parentElement.prepend(minus)
        
        let edit = event.target
        event.target.parentElement.removeChild(edit);
        child.children[0].classList.add('edit-form')
        
        minus.addEventListener('click', (event) => {
            event.target.parentElement.prepend(edit)
            event.target.parentElement.removeChild(minus)
            child.children[0].classList.remove('edit-form')
            child.removeChild(submit)
        })
        
        submit.addEventListener('click', () => {

            let okno = document.createElement('div');
            let container = document.querySelector(".container2");
            let body = document.querySelector("body");
            
            okno.setAttribute('id', 'okno');
            okno.innerHTML = `
                <p id="czy_na_pewno">Czy na pewno chcesz edytować te dane?</p>
                <div id="przyciski_tak_nie">
                <button id="butt-potw-tak">tak</button>
                <button id="butt-potw-nie">nie</button>
                </div>
            `
    
            container.classList.toggle('container-darken');
            document.querySelector("body").appendChild(okno);
    
    
            // obsługa przycisku NIE ////////////////////////////////////////////////////////////////////////////////////////
            document.querySelector("#butt-potw-nie").addEventListener('click', () => {
                body.removeChild(body.lastChild);
                container.classList.toggle('container-darken');
            })
    
            // obsługa przycisku TAK ////////////////////////////////////////////////////////////////////////////////////////
            document.querySelector('#butt-potw-tak').addEventListener('click', () => {
                body.removeChild(body.lastChild);
                container.classList.toggle('container-darken')

                const form = child.children[0]
                const data = new FormData(form)
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
                fetch(`/pobierz_zagadke/edit`, {
                    method: "POST",
                    headers: {'X-CSRFToken': csrftoken},
                    body: data
                }).then(response => response.json()).then(data => {
                    let paragraph = document.createElement('p');
                    paragraph.setAttribute('id', 'edit-info-par')
                    paragraph.innerText = `${data.odpowiedz}`
                    child.append(paragraph);
                })
                
            })
        })
    })
}


/////////// PRZYCISKI USUWANIA //////////////////////////////////////////////////////////

let remove_buttons = document.querySelectorAll('.remove');

for (button of remove_buttons){
    button.addEventListener('click', (event) => {
        let okno = document.createElement('div');
        let container = document.querySelector(".container2");
        let body = document.querySelector("body");
        
        okno.setAttribute('id', 'okno');
        okno.innerHTML = `
            <p id="czy_na_pewno">Czy na pewno chcesz usunąć tą zagadkę?</p>
            <div id="przyciski_tak_nie">
            <button id="butt-potw-tak">tak</button>
            <button id="butt-potw-nie">nie</button>
            </div>
        `

        container.classList.toggle('container-darken');
        document.querySelector("body").appendChild(okno);


        // obsługa przycisku NIE ////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector("#butt-potw-nie").addEventListener('click', () => {
            body.removeChild(body.lastChild);
            container.classList.toggle('container-darken');
        })

        // obsługa przycisku TAK ////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector('#butt-potw-tak').addEventListener('click', () => {
            body.removeChild(body.lastChild);
            container.classList.toggle('container-darken')

            const grandParent = event.target.parentElement.parentElement;
            let child = grandParent.children[0]
    
            const form = child.children[0]
            const data = new FormData(form)
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
            fetch(`/pobierz_zagadke/remove`, {
                method: "POST",
                headers: {'X-CSRFToken': csrftoken},
                body: data
            })
        })  
    })
}