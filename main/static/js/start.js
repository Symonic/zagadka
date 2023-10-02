document.querySelector('#butt-rozpocznij').addEventListener('click', () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                let data = { up : "first" } // 1 - zwiekszenie o 1 numeru zagadki
                fetch('pobierz_zagadke/', {
                    method : "POST", 
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    body : JSON.stringify(data)
                }).then((response) => {
                    location.reload()
                })
                
})

document.querySelector('#butt-next').addEventListener('click', () => {
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