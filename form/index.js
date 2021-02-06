var personId = 1;
const hasil = document.getElementById('bodyTable');
const button = document.getElementById('button');
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

dummy();
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
	}	
}

function dummy(){
    for (let i = 0; i < 10; i++) {
        let person = {
            id: personId,
            nama: "Anonim",
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
        hasil.innerHTML = '';
	    console.log(people);
	    people.forEach(person => {
		hasil.innerHTML += ` 
		<tr style="border: 1px solid black">
			<td class="tdCenter"> ${person.id} </td>
			<td class="tdCenter"> ${person.nama} </td>
            <td class="tdCenter"> ${person.tempatLahir},${person.tanggal} </td>
			<td class="tdCenter"> ${person.ttl} tahun </td>
            <td class="tdCenter"> ${person.gender} </td>
            <td class="tdCenter"> ${person.kesukaan} </td>
            <td class="tdCenter"> ${person.agama} </td>
            <td class="tdCenter"> ${person.alamat} </td>
            <td class="tdAction">
				<button class="buttonedit" type="button" onclick="editClicked(${person.id})">
					Edit
				</button>
				<button class="buttondelete" type="button" onclick="deleteClicked(${person.id})">
					delete
				</button>
			</td>
		<tr>	
		`
	    });  
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
            checkedhobby = checkedhobby + hobby[i].value + ",";
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

	showData();

	nama.value="";
    tempatLahir.value="";
	ttl.value="";
    alamat.value="";
}

showData = () => {
	hasil.innerHTML = '';
	console.log(people);
	people.forEach(person => {
		hasil.innerHTML += ` 
		<tr style="border: 1px solid black">
			<td class="tdCenter"> ${person.id} </td>
			<td class="tdCenter"> ${person.nama} </td>
            <td class="tdCenter"> ${person.tempatLahir},${person.tanggal} </td>
			<td class="tdCenter"> ${person.ttl} tahun </td>
            <td class="tdCenter"> ${person.gender} </td>
            <td class="tdCenter"> ${person.kesukaan} </td>
            <td class="tdCenter"> ${person.agama} </td>
            <td class="tdCenter"> ${person.alamat} </td>
            <td class="tdAction">
				<button class="buttonedit" type="button" onclick="editClicked(${person.id})">
					Edit
				</button>
				<button class="buttondelete" type="button" onclick="deleteClicked(${person.id})">
					delete
				</button>
			</td>
		<tr>	
		`
	});
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
	showData();
}

editClicked = (id) => {
	

	const personUpdated = people.findIndex(person =>{
		return person.id === id
	});

	nama.value = people[personUpdated].nama;
	umur.value = people[personUpdated].umur;

	btn.innerHTML = "Update";
	btn.setAttribute("data-type",personUpdated);
	
}

updateData = (id) => {

	let orang = {
			id : people[id].id,
			nama : nama.value,
			umur : umur.value
		};

	people.splice(id, 1, orang);// orang , 1, 
	showData();
	

	nama.value="";
	umur.value="";

	// // nama.value = personEdited.nama;
	// // umur.value = personEdited.umur;
	// // id.value = personEdited.id;

	// btn.innerHTML = "Update";
	btn.removeAttribute("data-type");
	btn.innerHTML ="Submit";
}