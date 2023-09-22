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