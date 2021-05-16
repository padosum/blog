export const onClientEntry = () => {
  window.onload = () => { init() }
}

function init() {
    if(/#random$/.test(window.location.href)) {
        return random();
    }
};

function random() {
    var list = document.querySelectorAll('.wiki-index a')
    var random = Math.floor((Math.random() * list.length));
    var url = list[random].href;
    window.location.href = url;
}
