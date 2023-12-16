let odpowiedz, odp1, odp2, koniec, kl_wej, kl_wyj, numer_zagadki
let hasla = new Array(100);

async function pobierz_zagadke(){
    
    // SPRAWDZENIE CZY PRZYPADKIEM DO LINKU NIE JEST DOKLEJONY KLUCZ ZAGADKI
    let link_klucz = document.querySelector('#kod_wejsciowy_par').innerText
    console.log("to jest to: "+link_klucz )

    if(link_klucz != 'brak'){
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                let data = { up : link_klucz } 
                await fetch('/pobierz_zagadke/', {
                    method : "POST", 
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    body : JSON.stringify(data)
                }).then(result => result.json()).then(data => {
                    let pyt = document.createElement('p');
                    pyt.setAttribute('id', 'par-pyt');
                    pyt.innerHTML = `${data.tresc}`
                    document.querySelector('#tresc-pytania').appendChild(pyt);
                    let cont = document.querySelector('.container');
                    cont.style.backgroundImage=`url("/media/${data.grafika}")`;
                    //<img src="/media/${data.grafika}" /><br />
            
                    odpowiedz = data.odpowiedz
                    odp1 = data.podp1
                    odp2 = data.podp2
                    koniec = data.koniec
                    kl_wej = data.klucz_wejsciowy
                    kl_wyj = data.klucz_wynikowy
                    numer_zagadki = data.numer_zag
                    console.log("laga")
                })
                location.replace('/')
    }
    
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        let data = { up : 10 }
        await fetch('/pobierz_zagadke/', {
            method : "POST", 
            headers: {'X-CSRFToken': csrftoken},
            mode: 'same-origin',
            body : JSON.stringify(data)
        }).then(result => result.json()).then(data => {
            let pyt = document.createElement('p');
            pyt.setAttribute('id', 'par-pyt');
            pyt.innerHTML = `${data.tresc}`
            document.querySelector('#tresc-pytania').appendChild(pyt);
            let cont = document.querySelector('.container');
            cont.style.backgroundImage=`url("/media/${data.grafika}")`;
            //<img src="/media/${data.grafika}" /><br />
    
            odpowiedz = data.odpowiedz
            odp1 = data.podp1
            odp2 = data.podp2
            koniec = data.koniec
            kl_wej = data.klucz_wejsciowy
            kl_wyj = data.klucz_wynikowy
            numer_zagadki = data.numer_zag
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

    

    ///

        kod_podsumowania = sessionStorage.getItem(`z${numer_zagadki}`);
        sessionStorage.setItem(`uz${numer_zagadki}`, "wyswietlone")
        console.log('czy wyswietlone :', sessionStorage.getItem(`uz${numer_zagadki}`))
        console.log('numer_zagadki : '+ numer_zagadki);
        console.log(sessionStorage.getItem(`z${numer_zagadki}`))
        console.log(sessionStorage.getItem('podp1'));
        console.log(sessionStorage.getItem('podp2'));
        console.log(sessionStorage.getItem('odp'));
}
    //document.querySelector('#pytanie').innerHTML = zagadka.tresc
    pobierz_zagadke()

    
  


    // PODPOWIEDZ 1
    document.querySelector("#buttp1").addEventListener('click', () => {
        let okno = document.createElement('div');
        let container = document.querySelector(".container");
        let body = document.querySelector("body");
        
        okno.setAttribute('id', 'okno-gratulacje');
        okno.innerHTML = `
            <p id="par-gratulacje">Czy na pewno chcesz wyświetlić podpowiedź?</p>
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
            document.querySelector(".par-odp").innerHTML = `Podpowiedź: ${odp1}`
            document.querySelector(".par-odp").classList.add('par-odp-darken');
            
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

        okno.setAttribute('id', 'okno-gratulacje');
        okno.innerHTML = `
            <p id="par-gratulacje">Czy na pewno chcesz wyświetlić podpowiedź?</p>
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
            document.querySelector(".par-odp").innerHTML = `Podpowiedź: ${odp2}`
            document.querySelector(".par-odp").classList.add('par-odp-darken');
        
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

        okno.setAttribute('id', 'okno-gratulacje');
        okno.innerHTML = `
            <p id="par-gratulacje">Czy na pewno chcesz wyświetlić odpowiedź?</p>
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
                let sekundy = 5;

                let x = setInterval(function(){
                    document.querySelector('#okno-gratulacje').innerHTML = `
                    ${minuty}:${sekundy}
                    `
                    if(sekundy>0){
                        sekundy--;
                    }
                    else{
                        sekundy = 59;
                        minuty--;
                    }

                    if(minuty==0 && sekundy==0){
                        clearInterval(x)
                        body.removeChild(body.lastChild);
                        container.classList.toggle('container-darken')
                        document.querySelector(".par-odp").innerHTML = `Odpowiedź: ${odpowiedz}`
                        document.querySelector(".par-odp").classList.add('par-odp-darken');
        
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

    document.querySelector('#wprowadz').addEventListener('keypress', (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            document.querySelector('#butt-next').click();
        }
    })

    // OBSŁUGA PRZYCISKU DALEJ
    document.querySelector('#butt-next').addEventListener('click', () => {
        let wartosc = document.querySelector("#wprowadz").value;
        console.log(kl_wyj);
        if (wartosc.toLowerCase() == odpowiedz.toLowerCase()){
            console.log("Poprawna odpowiedz");



            ////////// OBSZAR TESTOWY
            let okno = document.createElement('div');
            let container = document.querySelector(".container");
            let body = document.querySelector("body");
            
            let napis_grat = document.querySelector('#gratulacje').innerText;
            console.log(napis_grat)
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
                <p id="par-gratulacje">Poprawna odpowiedź! Kod do następnej zagadki to: ${kl_wyj}</p>
                <button id="nastep-zagad">Przejdź do następnej zagadki</button>
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
                        //numer_zagadki++;
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
            let okno_wiadomosci = document.querySelector('.par-odp');
            let numer = Math.floor(Math.random()*8)           

            okno_wiadomosci.innerHTML = `
            ${hasla[numer]}
            `
            okno_wiadomosci.classList.add('par-odp-darken')
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


    