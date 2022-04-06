async function solution() {

    const main = document.getElementById('main');
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

    const res = await fetch(url);
    const data = await res.json();


    data.forEach(x => {
        let divAccordion = createElement('div','',['class','accordion']);
        let divHead = createElement('div','',['class','head']);
        let span = createElement('span',x.title);
        let Btn = createElement('button','More',['class','button','id',x._id])

        let divExtra = createElement('div','',['class','extra']);
        let p = createElement('p')
        
         
        Btn.addEventListener('click',toggle);


        divExtra.appendChild(p);
        divAccordion.appendChild(divExtra);
        divHead.appendChild(Btn);
        divHead.appendChild(span);
        divAccordion.appendChild(divHead);
        main.appendChild(divAccordion);
    })
    
    async function toggle(e){

        const accordion = e.target.parentNode.parentNode;

        const p = e.target.parentNode.parentNode.children[0].children[0];
        
        const extra = e.target.parentNode.parentNode.children[0];
        

        const id = e.target.id;
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        
        const res = await fetch(url);
        const data = await res.json();

        p.textContent = data.content;

        const hidden = e.target.textContent === 'More';

        extra.style.display = hidden ? 'block':'none';
        e.target.textContent = hidden ? 'Less':'More';
        
    }

    function createElement(type, content, attributes = []) {

        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i+=2) {
               element.setAttribute(attributes[i],attributes[i+1]);
            }
        }
        return element;
    }
}
solution()