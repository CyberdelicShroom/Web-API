getData();

async function getData(){
    try {
        const response = await fetch('/api');
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        
        for(item of data){
            const root = document.createElement('p');
            const name = document.createElement('div');
            const coords = document.createElement('div');
            const date = document.createElement('div');
            const image = document.createElement('img');

            name.textContent = `Name: ${item.name}`;
            date.textContent = `Time captured: ${item.timestamp}`;
            coords.textContent = `Coordinates: ${item.coords.latitude}°, ${item.coords.longitude}°`;
            image.src = item.image64;
            image.alt = 'Kewigs face';

            root.append(name, coords, date, image);
            document.body.append(root);
        }
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
}

// async function getData(){
//     try {
//         const response = await fetch('http://127.0.0.1:3000/selfie');
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(data[0]);
//         const {NAME, timestamp} = data[0];
//         const root = document.createElement('p');
//         const name_div = document.createElement('div');
//         const date_div = document.createElement('div');
//         name_div.textContent = NAME;
//         date_div.textContent = timestamp;
//         root.append(name_div, date_div);
//         document.body.append(root);
//     } catch (error) {
//         console.error(error.message);
//     }
// }