// fetching function that will be used later

const getDisc = async query => {
    const resp = await fetch(`https://api.discogs.com/database/search?artist=${query}&per_page=3&key=cIRvvnoIdclGUgBGdUOT&secret=whfMKUHqNtwljWbrEejkdGXmSbcYkAHe`);
    const data = await resp.json();

    if (resp.status != 200) {
        throw new Error("Uh oh!");
    }

    return data;
};

const form = document.querySelector("form");

form.addEventListener("submit", e => {
    e.preventDefault();

    let info = document.querySelector("#music-info");
    info.innerHTML = "";

    getDisc(form.work.value).then(data => {
        info.innerHTML += `<h1>${form.work.value}`;

        for (let i = 0; i < 3; i++) {
            info.innerHTML += `
                <h2>Album</h2>
                <div>${data.results[i].title}</div>
                <hr>
            `;
        }

        console.log(data);
    });
});