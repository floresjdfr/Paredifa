const SERVICE_URL = 'http://localhost:9000/hello_world';

function bind_button_txt(btn, txt){
    const onclick = e => {
           fetch(SERVICE_URL, {method:'get'})
                .then(resp => resp.json())
                .then(json => txt.innerHTML += `\n>>> msg=${json.msg}` )
                .catch(e => txt.innerHTML += `\n*** ${e} ***`)
            
           }
    window.addEventListener("click", onclick, false)  
}

function setup_app(){
    let [btn, txt] = ['btn', 'txt'].map(e => document.getElementById(e))
    bind_button_txt(btn, txt)
}
////////////////////////////////////////////////////
window.addEventListener("load", setup_app, false);  
////////////////////////////////////////////////////