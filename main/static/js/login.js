document.querySelector('#butt-zaloguj').addEventListener('click', () => {
    let login = document.querySelector('#login').value
    let haslo = document.querySelector('#haslo').value

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let data = { login : login, haslo : haslo } 
    let odpowiedz

    async function zaloguj(){
        await fetch('', {
                method : "POST", 
                headers: {'X-CSRFToken': csrftoken},
                mode: 'same-origin',
                body : JSON.stringify(data)
                }).then(response => response.json()).then(data => {
                    if(data.odpowiedz == 'zalogowano'){
                        location.replace('/administracja/')
                    }
                })
    }
    zaloguj()
    
})

document.querySelector('#haslo').addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();
        document.querySelector('#butt-zaloguj').click();
    }
})

document.querySelector('#login').addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();
        document.querySelector('#butt-zaloguj').click();
    }
})