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
                })
    }
    zaloguj()
    
})