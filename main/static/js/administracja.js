let fileinput = document.querySelector("#prze-plik")
let fileinput2 = document.querySelector("#prze-plik2")
let fileinput3 = document.querySelector('#prze-plik3')
let fileinput4 = document.querySelector('#prze-plik4')
let fileinput5 = document.querySelector('#prze-plik5')
let fileinput6 = document.querySelector('#prze-plik6')
let fileinput7 = document.querySelector('#prze-plik7')

let file = '', file2 = '', file3 = '', file4 = '', file5 = '', file6 = '', file7 = '';

fileinput.addEventListener('change', () => {
    file = fileinput.files[0];

    console.log(file.size);

    let _URL = window.URL || window.webkitURL;

    let image = new Image();
    let objectUrl = _URL.createObjectURL(file);

    image.onload = function () {
        let height = this.height;
        let width = this.width;
        
        if(height !=66 || width != 150){
            
            alert(`Niepoprawny wymiar pliku \noczek. wys: 66px\nmax. szer: 150px`);
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
        
        if(height !=66 || width != 150){
            
            alert(`Niepoprawny wymiar pliku \noczek. wys: 66px\nmax. szer: 150px`);
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
        
        if(height != 66 || width != 58){
            
            alert(`Niepoprawny wymiar pliku \noczek. wys: 66px\noczek. szer: 58px`);
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
        
        if(height != 720 || width != 830){
            
            alert(`Niepoprawny wymiar pliku \noczek. wys: 720px\noczek. szer: 830px`);
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
        
        if(height != 66 || width != 150){
            
            alert(`Niepoprawny wymiar pliku \noczek. wys: 66px\nmax. szer: 150px`);
            fileinput5.value = '';
            file5 = ''
        }
    }
    image.src = objectUrl
})

fileinput6.addEventListener('change', () => {
    file6 = fileinput6.files[0];

    console.log(file6.size);

    let _URL = window.URL || window.webkitURL;

    let image = new Image();
    let objectUrl = _URL.createObjectURL(file6);

    image.onload = function () {
        let height = this.height;
        let width = this.width;
        
        if(height !=66 || width != 150){
            
            alert(`Niepoprawny wymiar pliku \noczek. wys: 66px\nmax. szer: 150px`);
            fileinput6.value = '';
            file6 = ''
        }
    }
    image.src = objectUrl
})

fileinput7.addEventListener('change', () => {
    file7 = fileinput7.files[0];

    console.log(file7.size);

    let _URL = window.URL || window.webkitURL;

    let image = new Image();
    let objectUrl = _URL.createObjectURL(file7);

    image.onload = function () {
        let height = this.height;
        let width = this.width;
        
        if(height !=66 || width != 150){
            
            alert(`Niepoprawny wymiar pliku \noczek. wys: 66px\nmax. szer: 150px`);
            fileinput7.value = '';
            file7 = ''
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

document.querySelector('#butt-czysc6').addEventListener('click', () => {
    fileinput6.value = '';
    file6 = ''
})

document.querySelector('#butt-czysc7').addEventListener('click', () => {
    fileinput7.value = '';
    file7 = ''
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

document.querySelector("#butt-plik6").addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const formData = new FormData();

    if(file6 != ''){
        formData.append("docfile", file6);
        fetch('nowa_graf/odp/', {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            body: formData
        })
    }
    
})

document.querySelector("#butt-plik7").addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const formData = new FormData();
    console.log('pressed')
    if(file7 != ''){
        formData.append("docfile", file7);
        fetch('nowa_graf/submitnext/', {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            body: formData
        })
    }
    
})

document.querySelector("#nowa-zag-butt").addEventListener('click', () => {
    let nowa_zagadka = document.querySelector("#zagadka-content-nowa");
    let form = document.createElement('form');

    let pole_nazwa = document.createElement('input');
    pole_nazwa.setAttribute("type", "text");
    pole_nazwa.setAttribute("name", "pole-nazwa");
    pole_nazwa.setAttribute("placeholder", "Nazwa zagadki");

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
    let file_grafika = ''

    let submit = document.createElement('button');
    submit.setAttribute('id', 'form-submit');
    submit.innerText = "Utwórz";

    let form_square = document.createElement('div');
    form_square.setAttribute('id', 'form-square');

    let label_square = document.createElement('div');
    label_square.setAttribute('id', 'label-square');

    label_square.innerHTML = `
    Nazwa <br />
    Treść <br />
    Odpowiedź <br />
    Podpowiedź 1 <br />
    Podpowiedź 2 <br />
    Klucz wejściowy <br />
    Klucz wyjściowy <br />
    Plik Grafiki: 
    `

    pole_grafika.addEventListener('change', (event) => {
        file_grafika = pole_grafika.files[0];
    
    
        let _URL = window.URL || window.webkitURL;
    
        let image = new Image();
        let objectUrl = _URL.createObjectURL(file_grafika);
    
        image.onload = function () {
            let height = this.height;
            let width = this.width;
            
            if(height != 720 || width != 830){
                
                alert(`Niepoprawny wymiar pliku \noczek. wys: 720px\noczek. szer: 830px`);
                pole_grafika.value = '';
                file_grafika = ''
            }
            else{
                image.classList.add('podglad-image')
                form_square.appendChild(image)
            }
        }
        image.src = objectUrl
        console.log(event.target.value);
    })

    

    let br = new Array(7);
    for(let i=0; i<6;i++){
        br[i] = document.createElement('br');
    }
    

    form.append(pole_nazwa);
    form.append(br[0]);
    form.append(pole_tresc);
    form.append(br[1]);
    form.append(pole_odpowiedz);
    form.append(br[2]);
    form.append(pole_podp1);
    form.append(br[3]);
    form.append(pole_podp2);
    form.append(br[4]);
    form.append(pole_kluczWe);
    form.append(br[5]);
    form.append(pole_kluczWy);
    form.append(br[6]);
    form.append(pole_grafika);
    
    form_square.appendChild(form);
    form_square.appendChild(submit);
    nowa_zagadka.appendChild(label_square);
    nowa_zagadka.appendChild(form_square);
    //nowa_zagadka.appendChild(submit);


    document.querySelector('#form-submit').addEventListener('click', () => {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const data = new FormData(form);
        
            fetch('/pobierz_zagadke/utworz', {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            body: data
        }).then(response => location.reload())
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
        nowa_zagadka.removeChild(form_square);
        nowa_zagadka.removeChild(label_square);
        nowa_zagadka.removeChild(submit)
    })

    
})

//////////// PRZYCISKI EDYCJI ///////////////////////////////////////////////////////////////////////

let edit_buttons = document.querySelectorAll('.edit');


for(button of edit_buttons){
    button.addEventListener('click', (event) => {
        const grandParent = event.target.parentElement.parentElement
        let grandchild = grandParent.children[0]
        let child = grandchild.children[2]
        let sec_child = grandchild.children[1]
        

        let submit = document.createElement('button');
        submit.setAttribute('id', 'form-edit');
        submit.innerText = "Zatwierdź zmiany";
        child.appendChild(submit);

        
        
        let minus = document.createElement('img');
        minus.setAttribute('src', '/media/images/rest/minus.png');
        minus.setAttribute('id', 'icon-minus');
        minus.setAttribute('class', 'icon');

        event.target.parentElement.prepend(minus)
        
        let edit = event.target
        event.target.parentElement.removeChild(edit);
        child.classList.add('edit-form')
        sec_child.classList.add('edit-form')
        
        minus.addEventListener('click', (event) => {
            event.target.parentElement.prepend(edit)
            event.target.parentElement.removeChild(minus)
            child.classList.remove('edit-form')
            sec_child.classList.remove('edit-form')
            child.removeChild(submit)
        })
        
        submit.addEventListener('click', () => {

            // obsługa przycisku TAK ////////////////////////////////////////////////////////////////////////////////////////
            if(confirm('Czy na pewno chcesz edytować te dane?')){
                const form = child.children[0]
                if(form.children[6].value == ''){
                    form.removeChild(form.children[7])
                }
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
                    location.reload()
                })
                
            }else{
                console.log("Nie edytowano")
            }
        })
    })
}

         ///// OBSLUGA ALERTU PRZYCISKU GRAFIKI

let files_input_collection = document.querySelectorAll('.file_zagadka_edit');

for(element of files_input_collection){
    element.addEventListener('change', (event) => {
        let file_grafika = event.target.files[0];
    
    
        let _URL = window.URL || window.webkitURL;
    
        let image = new Image();
        let objectUrl = _URL.createObjectURL(file_grafika);
    
        image.onload = function () {
            let height = this.height;
            let width = this.width;
            
            if(height != 720 || width != 830){
                
                alert(`Niepoprawny wymiar pliku \noczek. wys: 720px\noczek. szer: 830px`);
                event.target.value = '';
                file_grafika = ''
            }
        }
        image.src = objectUrl
    })
}



/////////// PRZYCISKI USUWANIA //////////////////////////////////////////////////////////

let remove_buttons = document.querySelectorAll('.remove');

for (button of remove_buttons){
    button.addEventListener('click', (event) => {
        

        // obsługa przycisku TAK ////////////////////////////////////////////////////////////////////////////////////////
        if(confirm('Czy na pewno chcesz usunąć tą zagadkę?')){
            const grandParent = event.target.parentElement.parentElement
            let grandchild = grandParent.children[0]
            let child = grandchild.children[2]
    
            const form = child.children[0]
            const data = new FormData(form)
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
            fetch(`/pobierz_zagadke/remove`, {
                method: "POST",
                headers: {'X-CSRFToken': csrftoken},
                body: data
            }).then(response => location.reload())
        }else{
            console.log("Nie usunięto")
        } 
    })
}


/// PRZYCISK WYLOGUJ

document.querySelector('#butt-wylog').addEventListener('click', () => {
    fetch('/logout/').then(response => response.json()).then(data => {
        if(data.odpowiedz == "wylogowano"){
            location.replace('/')
        }
    });
})


/// ZATWIERDZANIE TEKSTU GRATULACYJNEGO

document.querySelector('#but-grat-text').addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const formData = new FormData();
    const tresc = document.querySelector('#text-gratulacje');

    formData.append("tytul", "text_gratulacje");
    formData.append('tresc', tresc.value)
    fetch('nowa_graf/grat/', {
        method: "POST",
        headers: {'X-CSRFToken': csrftoken},
        body: formData
    }).then(response => {
        if(response.status == 201){
            if(confirm("Pomyślnie zaktualizowano!")){
                location.reload();
            }
        }
        else{
            alert("Błąd!")
        }
    });
})


//// ZATWIERDZENIE TEKSTU STARTOWEGO

document.querySelector('#but-start-text').addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const formData = new FormData();
    const tresc = document.querySelector('#text-start');

    formData.append("tytul", "text_start");
    formData.append('tresc', tresc.value)
    fetch('nowa_graf/starty/', {
        method: "POST",
        headers: {'X-CSRFToken': csrftoken},
        body: formData
    }).then(response => {
        if(response.status == 201){
            if(confirm("Pomyślnie zaktualizowano!")){
                location.reload();
            }
        }
        else{
            alert("Błąd!")
        }
    });
})


//// DODAWANIA NOWEGO LOSOWEGO HASLA ZLEJ ODPOWIEDZI

document.querySelector('#nowe-haslo-but').addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const formData = new FormData();
    const tresc = document.querySelector('#nowe-haslo');

    formData.append("tytul", "text_start");
    formData.append('tresc', tresc.value)
    fetch('/haslo/dodaj/', {
        method: "POST",
        headers: {'X-CSRFToken': csrftoken},
        body: formData
    }).then(response => {
        if(response.status == 201){
            if(confirm("Pomyślnie zaktualizowano!")){
                location.reload();
            }
        }
        else{
            alert("Błąd!")
        }
    });
})


/// USUWANIE KOMUNIKATU ZLEJ ODPOWIEDZI

let haslo_remove_buttons = document.querySelectorAll('.minusek');

for(button of haslo_remove_buttons){
    button.addEventListener('click', (event) => {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        let parent = event.target.parentElement;
        
        let id = parent.children[1].value;

        let formData = new FormData()
        formData.append('pole-id', id)

        fetch('/haslo/usun/', {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            body: formData
        }).then(response => {
            if(response.status == 201){
                if(confirm("Pomyślnie usunięto!")){
                    location.reload();
                }
            }
            else{
                alert("Błąd!")
            }
        });
    })
}

