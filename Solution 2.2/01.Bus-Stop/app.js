//WITH ASYNC FUNCTION
async function getInfo() {
    
    const stopNameElement = document.getElementById('stopName');
    const busesList = document.getElementById('buses');


    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    
    try{
        stopNameElement.textContent = 'Loading...';
        busesList.replaceChildren();
        const res = await fetch(url);
        
        if(res.status !== 200){
            throw new Error('Stop ID not found!')
        }
        
        const data = await res.json();

        stopNameElement.textContent = data.name;
        

        Object.entries(data.buses).forEach(x => {
            
            const ListElement = document.createElement('li');
            ListElement.textContent = `Bus ${x[0]} arrives in ${x[1]} minutes`;

            busesList.appendChild(ListElement);
            
        })
    }catch(error){
        stopNameElement.textContent = 'Error';
    }
  
    //WITH CATCH AND THEN
    // function getInfo() {
    //     let submitBtn = document.getElementById('submit');
    //     let busList = document.getElementById('buses');
    //     let stop = document.getElementById('stopName');
     
    //     submitBtn.addEventListener('click', () => {
    //         let idVal = document.getElementById('stopId').value;
    //         let url = `http://localhost:3030/jsonstore/bus/businfo/${idVal}`;
     
     
    //         fetch(url)
    //             .then(data => data.json())
    //             .catch(err => {stop.textContent = 'Error'})
    //             .then(data => {
    //                 stop.textContent = '';
    //                 busList.innerHTML = '';
    //                 stop.textContent = data.name;
    //                 for (entry in data.buses) {
    //                     let listEl= document.createElement('li');
    //                     listEl.textContent = `Bus ${entry} arrives in ${data.buses[entry]} minutes`
    //                     busList.appendChild(listEl);
    //                 }
     
    //             })
    //             // Not sure if this catch is needed, but want to make sure that we don't have invalid entry in bus.json
    //             .catch(err => {stop.textContent = 'Error'})
     
     
    //     })
    // }

}