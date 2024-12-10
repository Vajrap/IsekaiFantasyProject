function loadScript(url, async = false, defer = true){
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = async;
        script.defer = defer;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function loadScripts(urls, async = false, defer = true) {
    await new Promise((resolve, reject) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    });

    const promises = urls.map(url => loadScript(url, async, defer));
    await Promise.all(promises);
}



const load_server = [
    '../server.js'
]

const load_home = [
    '../home/home.js'
]

const load_login = [
    '../home/login/login.js'
]

const load_popup = [
    '../popup/popup.js'
]


loadScripts(load_server)
    .then(() => loadScripts(load_home))
    .then(() => loadScripts(load_login))
    .then(() => loadScripts(load_popup))
    .catch((error) => {
        console.log(`erroe loadScripts`, error)
    })