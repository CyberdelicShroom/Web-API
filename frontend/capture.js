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
            const name = document.getElementById('name').value;
            const data = {name, image64, coords};
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

// document.getElementById('submit').onclick = async () => {
//     let name = document.getElementById('name').value;
//     // data = {name, image64};
//     let data = {NAME: name};
//     const options = {
//         //POST to server
//         method: 'POST',
//         //format of the data you want to post to server (e.g. JSON)
//         headers: {
//         "Content-Type": "application/json",
//         },
//         //body of data to post to server
//         body: JSON.stringify(data),
//     };
//     try {
//         const response = await fetch('http://127.0.0.1:3000/selfie', options);
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const dataFromServer = await response.json();
//         console.log("Data from server:", dataFromServer);   
//     } catch (error) {
//         console.error(error.message);
//     }
// }