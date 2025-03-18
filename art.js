// fetching function that will be used later

const getDisc = async () => {
    const resp = await fetch("https://api.discogs.com/oauth/request_token?key=cIRvvnoIdclGUgBGdUOT");
    
    const data = await resp.json();

    if (resp.status != 200) {
        throw new Error("Uh oh!");
    }
};

const form = document.querySelector("form");

form.addEventListener("submit", e => {
    e.preventDefault();
});