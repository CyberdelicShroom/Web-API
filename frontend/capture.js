function setup(){
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(420,340);
    let coords = {};
    function getCoords() {
        if ('geolocation' in navigator) {
            console.log("Geolocation available");
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.getElementById("lat").textContent = latitude.toFixed(4);
                document.getElementById("long").textContent = longitude.toFixed(4);
                coords = {latitude, longitude};
            });
        } else {
            console.log("Geolocation is not available");
        }
    }
    getCoords();
    document.getElementById('submit').onclick = async () => {
        if ('geolocation' in navigator) {
            console.log("Geolocation available");
            video.loadPixels();
            const image64 = video.canvas.toDataURL();
            const caption = document.getElementById('caption').value;
            const data = {caption, image64, coords};
            postData();
            async function postData() {
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                };
                const response = await fetch('/api', options);
                const dataFromServer = await response.json();
                console.log("From server:", dataFromServer);
            }
        } else {
            console.log("Geolocation is not available");
        }
    }
}