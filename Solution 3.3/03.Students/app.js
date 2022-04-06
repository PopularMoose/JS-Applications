async function solve() {
    const url = `http://localhost:3030/jsonstore/collections/students`;

    const table = document.querySelector('#results tbody');
    const SubmitButton = document.getElementById('submit');

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(x => {

        const firstName = x.firstName;
        const lastName = x.lastName;
        const facultyNumber = x.facultyNumber;
        const grade = Number(x.grade);

        const tableRow = document.createElement('tr');

        const firstNameCell = tableRow.insertCell(0);
        firstNameCell.innerText = firstName;

        const lastNameCell = tableRow.insertCell(1);
        lastNameCell.innerText = lastName;

        const facultyNumCell = tableRow.insertCell(2);
        facultyNumCell.innerText = facultyNumber;

        const gradeCell = tableRow.insertCell(3);
        gradeCell.innerText = grade;


        table.appendChild(tableRow);

    })

    SubmitButton.addEventListener('click', onClickSubmit);

    async function onClickSubmit(ev) {
        ev.preventDefault();

        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        if (isNaN(facultyNumberInput.value) || isNaN(gradeInput.value)) {
            return alert('Wrong input data!');
        }

        if (firstNameInput.value != '' || lastNameInput.value != ''
            || gradeInput.value != '' || facultyNumberInput.value != '') {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    facultyNumber: Number(facultyNumberInput.value),
                    grade: Number(gradeInput.value)
                })
            });
            const tableRow = document.createElement('tr');

            const firstNameCell = tableRow.insertCell(0);
            firstNameCell.innerText = firstNameInput.value;

            const lastNameCell = tableRow.insertCell(1);
            lastNameCell.innerText = lastNameInput.value;

            const facultyNumCell = tableRow.insertCell(2);
            facultyNumCell.innerText = facultyNumberInput.value;

            const gradeCell = tableRow.insertCell(3);
            gradeCell.innerText = gradeInput.value;
            table.appendChild(tableRow);
        }


        firstNameInput.value = '';
        lastNameInput.value = '';
        gradeInput.value = '';
        facultyNumberInput.value = '';
    }

}
solve();