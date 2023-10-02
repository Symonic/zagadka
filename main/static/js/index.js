let odpowiedz, odp1, odp2, koniec, kl_wej, kl_wyj
async function pobierz_zagadke(){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let data = { up : 10 }
    await fetch('pobierz_zagadke/', {
        method : "POST", 
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body : JSON.stringify(data)
    }).then(result => result.json()).then(data => {
        document.querySelector('#pytanie').innerHTML = `
        <img src="/media/${data.grafika}" /><br />
        ${data.tresc}
        `
        odpowiedz = data.odpowiedz
        odp1 = data.podp1
        odp2 = data.podp2
        koniec = data.koniec
        kl_wej = data.klucz_wejsciowy
        kl_wyj = data.klucz_wynikowy
    })
    ukonczenie()
}
    //document.querySelector('#pytanie').innerHTML = zagadka.tresc
    pobierz_zagadke()
    
    

    

    // PODPOWIEDZ 1
    document.querySelector("#buttp1").addEventListener('click', () => {
        let okno = document.createElement('div');
        let container = document.querySelector(".container");
        let body = document.querySelector("body");
        
        okno.setAttribute('id', 'okno');
        okno.innerHTML = `
            <p id="czy_na_pewno">Czy na pewno chcesz wyświetlić odpowiedź?</p>
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
            document.querySelector("#podpowiedz").innerHTML = `Podpowiedź: ${odp1}`
        })
    })

    

    // PODPOWIEDZ 2
    document.querySelector("#buttp2").addEventListener('click', () => {
        let okno = document.createElement('div');
        let container = document.querySelector(".container");
        let body = document.querySelector("body");

        okno.setAttribute('id', 'okno');
        okno.innerHTML = `
            <p id="czy_na_pewno">Czy na pewno chcesz wyświetlić odpowiedź?</p>
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
            document.querySelector("#podpowiedz").innerHTML = `Podpowiedź: ${odp2}`
        })
    })

    

    // OBSŁUGA PRZYCISKU DALEJ
    document.querySelector('#butt-next').addEventListener('click', () => {
        let wartosc = document.querySelector("#wprowadz").value;
        console.log(kl_wyj);
        if (wartosc == odpowiedz){
            console.log("Poprawna odpowiedz");
            document.querySelector('#odpowiedz').innerHTML = `
                <p>Poprawna odpowiedź! Kod do następnej zagadki to: ${kl_wyj}</p>
                <input type="text" placeholder="podaj kod kolejnej zagadki" id="kod-zagadki">
                <button id="nastep-zagad">Przejdź</button>
                <br />
                <button id="butt-jeszcze-raz">Rozwiąż jeszcze raz</button>
                <button id="butt-przejdz-start">Przejdz do strony głównej</button>
                <div id="server-info"></div>
            `

            // OBSŁUGA PRZYCISKU JESZCZE RAZ
            document.querySelector('#butt-jeszcze-raz').addEventListener('click', () => {
                location.reload()
            })

            // OBSŁUGA PRZYCISKU NASTEP-ZAGAD
            document.querySelector('#nastep-zagad').addEventListener('click', () => {
                const klucz_wejsciowy = document.querySelector('#kod-zagadki').value;

                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                let data = { up : klucz_wejsciowy } 

                fetch('pobierz_zagadke/', {
                    method : "POST", 
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    body : JSON.stringify(data)
                }).then(response => response.json()).then(data => {
                    if(data.serverresp == "niepowodzenie"){
                        document.querySelector('#server-info').innerHTML = `
                        <p>Nie udało się znaleźć zagadki o podanym kodzie!</p>
                        `
                    }
                    else{
                        location.reload();
                    }
                })   
                
            })

            document.querySelector('#butt-przejdz-start').addEventListener('click', () => {
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                let data = { up : "restart" }
                
                fetch('pobierz_zagadke/', {
                    method : "POST", 
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    body : JSON.stringify(data)
                }).then(response => location.reload())
            })
        }
    })

    async function ukonczenie(){
        if(koniec == true){
            document.querySelector('#odpowiedz').innerHTML = `
                <button id="od-nowa">Rozpocznij od początku</button>
                <button id="butt-jeszcze-raz">Powtórz ostatnią zagadkę</button>
            `
            document.querySelector('#od-nowa').addEventListener('click', () => {
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                let data = { up : "restart" } // restart - rozpoczecie od poczatku
                fetch('pobierz_zagadke/', {
                    method : "POST", 
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    body : JSON.stringify(data)
                }).then((response) => {
                    location.reload()
                })
            })

            document.querySelector('#butt-jeszcze-raz').addEventListener('click', () => {
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                let data = { up : 0 } // 0 - ostatnia zagadka
                fetch('pobierz_zagadke/', {
                    method : "POST", 
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    body : JSON.stringify(data)
                }).then((response) => {
                    location.reload()
                })
            })
        }

        
    }