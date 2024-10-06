getData();

const logs = [];

document.getElementById('time').addEventListener('click', event => {
  sortData((a, b) => b.timestamp - a.timestamp);
});

document.getElementById('caption').addEventListener('click', event => {
  sortData((a, b) => {
    if (a.caption.toLowerCase() < b.caption.toLowerCase()) return -1;
    if (a.caption.toLowerCase() > b.caption.toLowerCase()) return 1;
    return 0;
  });
});

function sortData(compare) {
  for (let item of logs) {
    item.elt.remove();
  }
  logs.sort(compare);
  for (let item of logs) {
    document.body.append(item.elt);
  }
}

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
            const timestamp = +item.timestamp;
            const dateString = new Date(timestamp).toLocaleString();
            date.textContent = `Time captured: ${dateString}`;
            coords.textContent = `Coordinates: [${item.coords[0]}°, ${item.coords[1]}°]`;
            // console.log("Image path:",item.image);
            console.log("Image path sliced:",item.image.slice(19));
            const imgSrc = item.image.slice(19);

            image.src = imgSrc;
            image.alt = imgSrc;

            root.append(caption, coords, date, image);
            logs.push({ elt: root, timestamp: timestamp, caption: item.caption });
            document.body.append(root);
        }
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
}