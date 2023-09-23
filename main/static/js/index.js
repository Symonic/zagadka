let odpowiedz, odp1, odp2, koniec
async function pobierz_zagadke(){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let data = { up : 10 }
    await fetch('pobierz_zagadke/', {
        method : "POST", 
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body : JSON.stringify(data)
    }).then(result => result.json()).then(data => {
        document.querySelector('#pytanie').innerHTML = data.tresc
        odpowiedz = data.odpowiedz
        odp1 = data.podp1
        odp2 = data.podp2
        koniec = data.koniec
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
        if (wartosc == odpowiedz){
            console.log("Poprawna odpowiedz");
            document.querySelector('#odpowiedz').innerHTML = `
                <p>Gratulacje! Poprawna odpowiedź</p>
                </p>Czy chcesz przejść do następnej zagadki?</p>
                <button id="nastep-zagad">Tak</button>
                <button id="butt-jeszcze-raz">Rozwiąż jeszcze raz</button>
            `

            // OBSŁUGA PRZYCISKU JESZCZE RAZ
            document.querySelector('#butt-jeszcze-raz').addEventListener('click', () => {
                location.reload()
            })

            // OBSŁUGA PRZYCISKU NASTEP-ZAGAD
            document.querySelector('#nastep-zagad').addEventListener('click', () => {
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                let data = { up : 1 } // 1 - zwiekszenie o 1 numeru zagadki
                fetch('pobierz_zagadke/', {
                    method : "POST", 
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    body : JSON.stringify(data)
                }).then(response => {
                    location.reload()
                })
                
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