function solve() {
    
    const label = document.querySelector('#info span');
    const DepartBtn = document.getElementById('depart');
    const ArriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    };
   
   async function depart() {

         DepartBtn.disabled = true;
          const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
          const res = await fetch(url);

          stop = await res.json();
          label.textContent = `Next stop ${stop.name}`;
         ArriveBtn.disabled = false;
    }

    function arrive() {

        label.textContent = `Arriving at ${stop.name}`;
       DepartBtn.disabled = false;
       ArriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();