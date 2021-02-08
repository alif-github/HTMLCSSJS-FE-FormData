var personId = 1;
const hasil = document.getElementById('bodyTable');
const button = document.getElementById('button');
const page = document.getElementsByClassName('page');
let nama = document.getElementById('nama');
let tempatLahir = document.getElementById('tempatLahir');
let ttl = document.getElementById('ttl');
let alamat = document.getElementById("alamat");
var gender = document.getElementsByClassName('jenisKelamin');
var hobby = document.getElementsByClassName('hobby');
var agama = document.getElementById("agama");
let tanggal = 0;
let people = [];
const btn = document.getElementById('button');
var current_halaman = 1;
var limit = 5;
var nowPage = document.getElementById('nowPage');

dummy();
init();
function handleButton() {

	console.log("Handle");

	if(button.innerHTML === "Submit"){
		if(nama.value.length > 0 && ttl.value.length > 0 
            && alamat.value.length > 0 && tempatLahir.value.length > 0 
            && agama.value.length > 0){
			input();
		}else{
			alert("Data Harus Terisi");
		}
	} else {
		//tidak submit
		updateData(button.getAttribute("data-type"));
		// console.log(button.getAttribute("data-type"));
	}	
}

function dummy(){
    for (let i = 0; i < 50; i++) {
        let person = {
            id: personId,
            nama: (i+1)+"Anonim"+(i+1),
            tempatLahir: "Jakarta",
            tanggal: "1998-02-15",
            ttl: "22",
            gender: "Male",
            kesukaan: "Jogging",
            agama: "Islam",
            alamat: "Bekasi"
        };
        people.push(person);
        personId++;
    }
	showingDummy(current_halaman);
}

input = () => {
    var today = new Date();
		var birthday = new Date(ttl.value);
		var year = 0;
		if (today.getMonth() < birthday.getMonth()) {
			year = 1;
		} else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
			year = 1;
		}
		var age = today.getFullYear() - birthday.getFullYear() - year;
 
		if(age < 0){
			age = 0;
        }
    var checkedhobby ="";
    for(var i = 0; hobby[i]; i++){
        if(hobby[i].checked){
            checkedhobby = checkedhobby + hobby[i].value + "\n";
        }
    }

    var checkedgender = null;
    length = gender.length;
    for (var i = 0; i < length; i++) {
        if (gender[i].checked) {
          // do whatever you want with the checked radio
          checkedgender = gender[i].value;
          // only one radio can be logically checked, don't check the rest
          break;
        }
    }

	let person = {
		id: personId,
		nama: nama.value,
        tempatLahir: tempatLahir.value,
        tanggal: ttl.value,
        ttl: age,
        gender: checkedgender,
        kesukaan: checkedhobby,
        agama: agama.value,
		alamat: alamat.value
	};
	people.push(person);
	personId++;

	showingDummy(numOfPages());
	current_halaman = numOfPages();

	next.innerHTML = current_halaman;
	previous.innerHTML = current_halaman - 1;
	nowPage.innerHTML = current_halaman;

	console.log(people.length);
	console.log((people.length) % limit);

	nama.value="";
    tempatLahir.value="";
	ttl.value="";
    alamat.value="";
}

deleteClicked = (id) => {
	const person = people.find(function(person){
		return person.id === id
	})

	if(confirm(`Apakah anda yakin ingin menghapus data ${person.nama}`)){
		people = people.filter(function(person){
			return person.id != id
		})
	}
	showingDummy(current_halaman);

	console.log(current_halaman);
	console.log("length array", people.length)

	if(((people.length)+1) % limit == 1) {
		console.log("Masuk sini")
		next.innerHTML = current_halaman - 1;
		previous.innerHTML = current_halaman - 2;
		nowPage.innerHTML = current_halaman - 1;
	}
}

editClicked = (id) => {
	

	const personUpdated = people.findIndex(person =>{
		return person.id === id
	});

	nama.value = people[personUpdated].nama;
	tempatLahir.value = people[personUpdated].tempatLahir;
	ttl.value = people[personUpdated].ttl;
	alamat.value = people[personUpdated].alamat;

	btn.innerHTML = "Update";
	btn.setAttribute("data-type",personUpdated);
	
}

updateData = (id) => {

	var today = new Date();
		var birthday = new Date(ttl.value);
		var year = 0;
		if (today.getMonth() < birthday.getMonth()) {
			year = 1;
		} else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
			year = 1;
		}
		var age = today.getFullYear() - birthday.getFullYear() - year;
 
		if(age < 0){
			age = 0;
        }
    var checkedhobby ="";
    for(var i = 0; hobby[i]; i++){
        if(hobby[i].checked){
            checkedhobby = checkedhobby + hobby[i].value + "\n";
        }
    }

    var checkedgender = null;
    length = gender.length;
    for (var i = 0; i < length; i++) {
        if (gender[i].checked) {
          // do whatever you want with the checked radio
          checkedgender = gender[i].value;
          // only one radio can be logically checked, don't check the rest
          break;
        }
    }

	let orang = {
			id : people[id].id,
			nama : nama.value,
			tempatLahir: tempatLahir.value,
        	tanggal: ttl.value,
        	ttl: age,
        	gender: checkedgender,
        	kesukaan: checkedhobby,
        	agama: agama.value,
			alamat: alamat.value
	};

	people.splice(id, 1, orang);// orang , 1, 
	btn.removeAttribute("data-type");
	btn.innerHTML ="Submit";
	showingDummy(current_halaman);
	

	nama.value="";
    tempatLahir.value="";
	ttl.value="";
    alamat.value="";

	// // nama.value = personEdited.nama;
	// // umur.value = personEdited.umur;
	// // id.value = personEdited.id;

	// btn.innerHTML = "Update";
}

function init() {
	previous.innerHTML = current_halaman;
	next.innerHTML = current_halaman + 1;
	nowPage.innerHTML = current_halaman;
}

function prevPage() {
	console.log('masuk prev Page');
	if(current_halaman > 1) {
		current_halaman--;
		previous.innerHTML = current_halaman - 1;
		next.innerHTML = current_halaman + 1;
		showingDummy(current_halaman);
	}
	nowPage.innerHTML = current_halaman;
	console.log(current_halaman);
}

function nextPage() {
	console.log('masuk next Page');
	if(current_halaman < numOfPages()) {
		current_halaman++;
		next.innerHTML = current_halaman + 1;
		previous.innerHTML = current_halaman - 1;
		showingDummy(current_halaman);
	}
	nowPage.innerHTML = current_halaman;
	console.log(current_halaman);
}

function showingDummy(page) {
	var previous = document.getElementById('previous');
	var next = document.getElementById('next');
	var page_span = document.getElementById('page');

	//validate this page
	if (page < 1) {
		page = 1;
	} 
	else if (page > numOfPages()) {
		page = numOfPages();
	}

	hasil.innerHTML = '';
	for (let j = (page-1) * limit; j < (page * limit) && j < people.length; j++) {
		hasil.innerHTML += ` 
		<tr style="border: 1px solid black" class="trFill">
			<td class="tdCenter"> ${people[j].id} </td>
			<td class="tdCenter"> ${people[j].nama} </td>
            <td class="tdCenter"> ${people[j].tempatLahir}, ${people[j].tanggal} </td>
			<td class="tdCenter"> ${people[j].ttl} tahun </td>
            <td class="tdCenter"> ${people[j].gender} </td>
            <td class="tdCenter"> ${people[j].kesukaan} </td>
            <td class="tdCenter"> ${people[j].agama} </td>
            <td class="tdCenter"> ${people[j].alamat} </td>
            <td class="tdAction">
				<button class="buttonedit" type="button" onclick="editClicked(${people[j].id})">
					Edit
				</button>
				<button class="buttondelete" type="button" onclick="deleteClicked(${people[j].id})">
					delete
				</button>
			</td>
		<tr>	
		`
	}
	page_span.innerHTML = page + "/" +numOfPages();

	if(page == 1) {
		previous.style.visibility = "hidden";
	} else {
		previous.style.visibility = "visible";
	}

	if(page == numOfPages()) {
		next.style.visibility = "hidden";
	} else {
		next.style.visibility = "visible";
	}
}

function numOfPages() {
	return Math.ceil(people.length / limit);
}

function findPerson() {
	var inputFind = document.getElementById('inputFind');
	var filter = inputFind.value;
	
	console.log(filter);
	hasil.innerHTML = '';
	for (let j = 0; j < people.length; j++) {
		if (people[j].nama.indexOf(filter) > -1) {
			console.log("jumlahnya ada ", people[j].nama.indexOf(filter))
			hasil.innerHTML += ` 
			<tr style="border: 1px solid black" class="trFill">
				<td class="tdCenter"> ${people[j].id} </td>
				<td class="tdCenter"> ${people[j].nama} </td>
				<td class="tdCenter"> ${people[j].tempatLahir}, ${people[j].tanggal} </td>
				<td class="tdCenter"> ${people[j].ttl} tahun </td>
				<td class="tdCenter"> ${people[j].gender} </td>
				<td class="tdCenter"> ${people[j].kesukaan} </td>
				<td class="tdCenter"> ${people[j].agama} </td>
				<td class="tdCenter"> ${people[j].alamat} </td>
				<td class="tdAction">
					<button class="buttonedit" type="button" onclick="editClicked(${people[j].id})">
						Edit
					</button>
					<button class="buttondelete" type="button" onclick="deleteClicked(${people[j].id})">
						delete
					</button>
				</td>
			<tr>	
			`
		}
	}
}