document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const addStudentButton = document.getElementById('addStudentButton');
    const studentUl = document.getElementById('studentUl');
    const searchButton = document.getElementById('searchButton');
    const searchNameInput = document.getElementById('searchName');
    const searchResult = document.getElementById('searchResult');
    let data = [];

    async function sendStudentDataToAPI(student, method = 'POST', url = 'http://localhost:1233/addstudent') {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            if (!response.ok) {
                throw new Error('Error sending student data');
            }

            const result = await response.text();
            console.log('Success:', result);
        } catch (error) {
            console.error('Failed to send student data:', error);
        }
    }

    function renderStudentList() {
        studentUl.innerHTML = '';
        data.forEach((student, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${student.name}, ${student.dob}, ${student.country}, ${student.city}</span>
                <div>
                    <button class="edit" onclick="updateStudent(${index})">Update</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </div>
            `;
            studentUl.appendChild(li);
        });
    }

    window.deleteStudent = async function(index) {
        const studentToDelete = data[index];
        data.splice(index, 1);
        await sendStudentDataToAPI({ name: studentToDelete.name }, 'DELETE', `http://localhost:1233/deletestudent`);
        renderStudentList();
    };

    window.updateStudent = function(index) {
        const student = data[index];
        document.getElementById('name').value = student.name;
        document.getElementById('dob').value = student.dob;
        document.getElementById('country').value = student.country;
        document.getElementById('city').value = student.city;

        addStudentButton.onclick = async () => {
            const updatedStudent = {
                name: document.getElementById('name').value,
                dob: document.getElementById('dob').value,
                country: document.getElementById('country').value,
                city: document.getElementById('city').value,
            };

            data[index] = updatedStudent;
            await sendStudentDataToAPI({ name: updatedStudent.name, updatefield: updatedStudent }, 'PUT', `http://localhost:1233/updatestudent`);
            renderStudentList();
            studentForm.reset();
            addStudentButton.onclick = addStudent;
        };
    };

    function addStudent() {
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;

        if (name && dob && country && city) {
            const student = { name, dob, country, city };
            data.push(student);
            sendStudentDataToAPI(student);
            renderStudentList();
            studentForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    }

    addStudentButton.onclick = addStudent;

    searchButton.onclick = () => {
        const searchName = searchNameInput.value.toLowerCase();
        const student = data.find(s => s.name.toLowerCase() === searchName);

        if (student) {
            searchResult.innerHTML = `
                <strong>Name:</strong> ${student.name}<br>
                <strong>Date of Birth:</strong> ${student.dob}<br>
                <strong>Country:</strong> ${student.country}<br>
                <strong>City:</strong> ${student.city}
            `;
        } else {
            searchResult.innerHTML = 'No student found with that name.';
        }
    };
});
