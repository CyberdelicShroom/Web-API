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
            const caption = document.createElement('div');
            const coords = document.createElement('div');
            const date = document.createElement('div');
            const image = document.createElement('img');

            caption.textContent = `Caption: ${item.caption}`;
            date.textContent = `Time captured: ${item.timestamp}`;
            coords.textContent = `Coordinates: [${item.coords[0]}°, ${item.coords[1]}°]`;
            // console.log("Image path:",item.image);
            console.log("Image path sliced:",item.image.slice(19));
            const imgSrc = item.image.slice(19);

            image.src = imgSrc;
            image.alt = imgSrc;

            root.append(caption, coords, date, image);
            document.body.append(root);
        }
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
}