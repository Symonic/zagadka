let odpowiedz, odp1, odp2, koniec, kl_wej, kl_wyj
let hasla = new Array(100);

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

    await fetch('haslo/pobierz/', {
        method : "GET",
        headers : {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
    }).then(result => result.json()).then(data => {
        for(let i=0;i<data.length;i++){
            hasla[i] = data[i].fields.tresc;
        }
    })
    //ukonczenie()
}
    //document.querySelector('#pytanie').innerHTML = zagadka.tresc
    pobierz_zagadke()

    
    /// KODY PODSUMOWANIA ////////////////////////////
    //                                              //
    //      1 - brak podpowiedzi                    //
    //      2 - jedna podpowiedz                    //
    //      3 - dwie podpowiedzi                    //
    //      4 - dwie podpowiedzi i odkryte haslo    //
    //      5 - jedna podpowiedz i odkryte haslo    //
    //      6 - odkryte haslo                       //
    //                                              //
    //////////////////////////////////////////////////

    /// SPRAWDZANIE SESJI pod kątem uzytych podpowiedzi

    numer_zagadki = sessionStorage.getItem('nr_zagadki');
    kod_podsumowania = sessionStorage.getItem(`z${numer_zagadki}`);
    console.log('numer_zagadki : '+ numer_zagadki);
    console.log(sessionStorage.getItem(`z${numer_zagadki}`))
    console.log(sessionStorage.getItem('podp1'));
    console.log(sessionStorage.getItem('podp2'));
    console.log(sessionStorage.getItem('odp'));

    ///


    // PODPOWIEDZ 1
    document.querySelector("#buttp1").addEventListener('click', () => {
        let okno = document.createElement('div');
        let container = document.querySelector(".container");
        let body = document.querySelector("body");
        
        okno.setAttribute('id', 'okno');
        okno.innerHTML = `
            <p id="czy_na_pewno">Czy na pewno chcesz wyświetlić podpowiedź?</p>
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
            
            sessionStorage.setItem('podp1', 'uzyte');
            if(kod_podsumowania==1){
                kod_podsumowania=2;
            }
            else if(sessionStorage.getItem('podp2') == 'nieuzyte'){
                kod_podsumowania=2;
            }
            else if(sessionStorage.getItem('podp2') == 'uzyte'){
                kod_podsumowania=3;
            }
            else if(sessionStorage.getItem('podp2') == 'uzyte' && sessionStorage.getItem('odp')=='uzyte'){
                kod_podsumowania=4;
            }
            else if(sessionStorage.getItem('podp2') == 'nieuzyte' && sessionStorage.getItem('odp')=='uzyte'){
                kod_podsumowania=5;
            }
        })
    })

    

    // PODPOWIEDZ 2
    document.querySelector("#buttp2").addEventListener('click', () => {
        let okno = document.createElement('div');
        let container = document.querySelector(".container");
        let body = document.querySelector("body");

        okno.setAttribute('id', 'okno');
        okno.innerHTML = `
            <p id="czy_na_pewno">Czy na pewno chcesz wyświetlić podpowiedź?</p>
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
        
            sessionStorage.setItem('podp2', 'uzyte');
            if(kod_podsumowania==1){
                kod_podsumowania=2;
            }
            else if(sessionStorage.getItem('podp1') == 'nieuzyte'){
                kod_podsumowania=2;
            }
            else if(sessionStorage.getItem('podp1') == 'uzyte'){
                kod_podsumowania=3;
            }
            else if(sessionStorage.getItem('podp1') == 'uzyte' && sessionStorage.getItem('odp')=='uzyte'){
                kod_podsumowania=4;
            }
            else if(sessionStorage.getItem('podp1') == 'nieuzyte' && sessionStorage.getItem('odp')=='uzyte'){
                kod_podsumowania=5;
            }
        })
    })



    // OPDOWIEDZ
    document.querySelector('#but-pokaz-odp').addEventListener('click', () => {
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
        document.querySelector('#butt-potw-tak').addEventListener('click', (event) => {
                let minuty = 0;
                let sekundy = 10;

                let x = setInterval(function(){
                    document.querySelector('#okno').innerHTML = `
                    ${minuty}:${sekundy}
                    `
                    if(sekundy>0){
                        sekundy--;
                    }
                    else{
                        sekundy = 59;
                        minuty--;
                    }

                    if(minuty==0 && sekundy ==0){
                        clearInterval(x)
                        body.removeChild(body.lastChild);
                        container.classList.toggle('container-darken')
                        document.querySelector("#podpowiedz").innerHTML = `Odpowiedź: ${odpowiedz}`
        
                        sessionStorage.setItem('odp', 'uzyte');
                        if(kod_podsumowania==1){
                        kod_podsumowania=6;
                        }
                        else if(sessionStorage.getItem('podp1') == 'nieuzyte' && sessionStorage.getItem('podp2') == 'nieuzyte'){
                            kod_podsumowania=6;
                        }
                        else if(sessionStorage.getItem('podp1') == 'uzyte' && sessionStorage.getItem('podp2') == 'nieuzyte'){
                            kod_podsumowania=5;
                        }
                        else if(sessionStorage.getItem('podp1') == 'nieuzyte' && sessionStorage.getItem('podp2') == 'uzyte'){
                            kod_podsumowania=5;
                        }
                        else if(sessionStorage.getItem('podp1') == 'uzyte' && sessionStorage.getItem('podp2')=='uzyte'){
                            kod_podsumowania=4;
                        }
                    }
                    
                },1000)
        })
    })

    // OBSŁUGA PRZYCISKU DALEJ
    document.querySelector('#butt-next').addEventListener('click', () => {
        let wartosc = document.querySelector("#wprowadz").value;
        console.log(kl_wyj);
        if (wartosc == odpowiedz){
            console.log("Poprawna odpowiedz");



            ////////// OBSZAR TESTOWY
            let okno = document.createElement('div');
            let container = document.querySelector(".container");
            let body = document.querySelector("body");
            
            let napis_grat = document.querySelector('#paragraf-gratulacje').value;
            okno.setAttribute('id', 'okno-gratulacje');
            okno.innerHTML = `
                <p id="paragraf-gratulacje">${napis_grat}</p>
                
                <div id="dalsze-menu"></div>
                `;
    
            container.classList.toggle('container-darken');
            document.querySelector("body").appendChild(okno);
    
          

    

            if(koniec){
                ukonczenie()
            }
            else{
                document.querySelector('#dalsze-menu').innerHTML = `
                <p>Poprawna odpowiedź! Kod do następnej zagadki to: ${kl_wyj}</p>
                <button id="nastep-zagad">Przejdź do następnej zagadki</button>
                <br />
                <button id="butt-jeszcze-raz">Rozwiąż jeszcze raz</button>
                <button id="butt-przejdz-start">Przejdz do strony głównej</button>
                <div id="server-info"></div>
            `
            }
            

            // OBSŁUGA PRZYCISKU JESZCZE RAZ
            document.querySelector('#butt-jeszcze-raz').addEventListener('click', () => {
                location.reload()
            })

            // OBSŁUGA PRZYCISKU NASTEP-ZAGAD
            document.querySelector('#nastep-zagad').addEventListener('click', () => {
                

                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                let data = { up : 1 } 

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
                        sessionStorage.setItem(`z${numer_zagadki}`, kod_podsumowania);
                        sessionStorage.setItem('podp1', 'nieuzyte');
                        sessionStorage.setItem('podp2', 'nieuzyte');
                        sessionStorage.setItem('odp', 'nieuzyte');
                        numer_zagadki++;
                        sessionStorage.setItem('nr_zagadki', numer_zagadki);
                        sessionStorage.setItem(`z${numer_zagadki}`, 1);
                        
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
        else{
            let okno_wiadomosci = document.querySelector('#podpowiedz');
            let numer = Math.floor(Math.random()*8)           

            okno_wiadomosci.innerHTML = `
            ${hasla[numer]}
            `
        }
    })


    async function ukonczenie(){
        if(koniec == true){
            document.querySelector('#dalsze-menu').innerHTML = `
                Ukończyłeś wszystkie zagadki! <br />
                <button id="od-nowa">Rozpocznij od początku</button>
                <button id="butt-jeszcze-raz">Powtórz ostatnią zagadkę</button>
                <button id="butt-pods">Przejdź do podsumowania</button>
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

            document.querySelector('#butt-pods').addEventListener('click', () => {
                sessionStorage.setItem(`z${numer_zagadki}`, kod_podsumowania);
                location.replace('/gratulacje/'); ///PRZEJSCIE DO PODSUMOWANIA /////////////////////////
            })
        }

        
    }