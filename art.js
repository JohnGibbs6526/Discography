// fetching function that will be used when the user submits the form

const key = "cIRvvnoIdclGUgBGdUOT";
const secret = "whfMKUHqNtwljWbrEejkdGXmSbcYkAHe";
const tokens = `&key=${key}&secret=${secret}`;

// for searches

const getDisc = async query => {
    let page = Math.floor(Math.random() * 5) + 1;

    // fetches

    const search = await fetch(`https://api.discogs.com/database/search?artist=${query}&page=${page}&per_page=3${tokens}`);
    const sData = await search.json();

    const master = await fetch(`${sData.results[0].master_url}`);
    const mData = await master.json();

    if (search.status != 200 || master.status != 200) {
        throw new Error("Search fetching failed.");
    }

    console.log(sData);
    console.log(mData);

    return sData;
};

// for masters

const getMaster = async masterURL => {
    const master = await fetch(masterURL);
    const mData = await master.json();

    if (master.status != 200) {
        throw new Error("Master fetching failed.");
    }

    return mData;
}

const form = document.querySelector("form");

form.addEventListener("submit", e => {
    e.preventDefault();

    let info = document.querySelector("#music-info");
    info.innerHTML = "";

    let rand = Math.floor(Math.random() * 3) + 1;

    // get the Discogs API data

    getDisc(form.work.value)
        .then(data => {

            // input album

            info.innerHTML += `
                <h1>${form.work.value}</h1>
                <h2>Album</h2>
                <div>${data.results[rand].title}</div>
            `;

            return data.results[rand].master_url;
        }
    ).then(master => {
        return getMaster(master);
    }).then(data => {

        // input tracklist
        
        info.innerHTML += "<h3>Tracklist</h3>";

        data.tracklist.forEach(track => {
            info.innerHTML += `<div>${track.title}</div>`;
        });
    });
});