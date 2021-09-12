
(async function getPaste() {
    await fetch('http://localhost:3000')
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.length === 0) {
            const div = document.getElementById("pastes");
            const p = document.createElement('p');
            p.textContent = "The paste list is empty!";
            return div.appendChild(p);
        }
        data.forEach((element, index) => {
            const i = index.toString();
            const div = document.createElement('div');
            div.id = i;
            document.getElementById("pastes").appendChild(div);
            const myElement = createMyElement(element.id, element.title, element.content, index);
            document.getElementById(`${i}`).innerHTML = myElement;
        });
    });
})();

function createMyElement(id, title, content, index) {
    const myElement = 
        `<div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                    <strong>${title}</strong>
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}">
                <div class="accordion-body">
                    <strong>Paste ID: </strong> 
                        ${id}
                    <br>
                    <strong>Paste Content: </strong> <br>
                        ${content}
                    <br>
                    <button class="btn btn-dark" onclick="deletePaste(${id});"><i class="las la-trash la-lg"></i></button>
                </div>
            </div>
        </div>`;
    return myElement;
}

async function createPaste() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    if (title !== "" && content !== "") {
        await fetch('http://localhost:3000/pastes', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({title, content}),
        })
        .then(response => {
            return response.text();
        })
        .then((data) => {
            document.getElementById('message').innerHTML = `${data}${title}`;
            setTimeout(() => { refresh(); }, 3000);
        })
    }
}

async function deletePaste(id) {
    await fetch(`http://localhost:3000/pastes/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        return response.text();
    })
    .then(data => {
        document.getElementById("message").innerHTML = data;
        setTimeout(() => { refresh(); }, 3000);
    })   
}

function refresh() {
    window.location.reload();
}

