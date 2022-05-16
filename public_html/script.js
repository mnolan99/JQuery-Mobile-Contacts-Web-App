$(function () {
    
    // Martin Nolan - B00419772
    // This file should pass validation. However, each '$' may show as 
    // not defined as they refer to a variable or id from index.html
   
    // Clear localStorage when app is first opened
    localStorage.clear();
    
    // Variables to store the index of the selected
    // contact and the pre-populated contact details
    var index = 0;
    var personsArray = [
        {"firstname": "John",
            "surname": "Smith",
            "mobileno": "07342853061",
            "email": "johns@hotmail.co.uk"},
        {"firstname": "Jack",
            "surname": "Williams",
            "mobileno": "07864218539",
            "email": "jwilliams@gmail.com"},
        {"firstname": "Luke",
            "surname": "Brown",
            "mobileno": "01506384652",
            "email": "luke99@outlook.com"},
        {"firstname": "Danny",
            "surname": "White",
            "mobileno": "02046528935",
            "email": "dannywhite4@live.co.uk"},
        {"firstname": "Charlie",
            "surname": "Johnson",
            "mobileno": "07964863451",
            "email": "cj99@gmail.com"},
        {"firstname": "Ellie",
            "surname": "Jackson",
            "mobileno": "07746926358",
            "email": "ejack@outlook.com"},
        {"firstname": "Ted",
            "surname": "Williams",
            "mobileno": "08007405625",
            "email": "ted123@gmail.com"},
        {"firstname": "Emma",
            "surname": "Brown",
            "mobileno": "07136485746",
            "email": "emmab@live.co.uk"},
        {"firstname": "Nicky",
            "surname": "Scott",
            "mobileno": "07743517844",
            "email": "nick99@outlook.com"},
        {"firstname": "Paul",
            "surname": "Morris",
            "mobileno": "01506538465",
            "email": "mpaul@hotmail.co.uk"}
    ];

    // Check to see if localStorage is defined
    // and if it is, convert data to JSON string 
    if (localStorage.app !== undefined) {
        personsArray = JSON.stringify(localStorage.app);
    }

    // Update localStorage with new contact details
    function updateLocalStorage() {
        localStorage.app = JSON.stringify(personsArray);
    }
    updateLocalStorage();

    // Add a new contact and their detailss
    // to personsArray so that it can be displayed
    function addPerson() {
        var person = {};
        person.firstname = $("#tf_firstname").val();
        person.surname = $("#tf_surname").val();
        person.mobileno = $("#tf_mobileno").val();
        person.email = $("#tf_email").val();
        personsArray.push(person);
        updateLocalStorage();
        
        // Reset the value inside the form elements each time the page loads
        document.getElementById('tf_firstname').value = '';
        document.getElementById('tf_surname').value = '';
        document.getElementById('tf_mobileno').value = '';
        document.getElementById('tf_email').value = '';
    }

    // Delete selected contact from personsArray 
    // and update localStorage
    function deletePerson() {
        personsArray.splice(index, 1);
        updateLocalStorage();
    }

    // Get the contact details of the selected contact 
    // so that the edit contact form can be pre-populated
    function getPerson() {
        document.getElementById('tf_firstname_edit').value = personsArray[index].firstname;
        document.getElementById('tf_surname_edit').value = personsArray[index].surname;
        document.getElementById('tf_mobileno_edit').value = personsArray[index].mobileno;
        document.getElementById('tf_email_edit').value = personsArray[index].email;
    }

    // Edit the deatils of the selected contact, updating
    // the information in personsArray and the localStorage
    function editPerson() {
        personsArray[index].firstname = $("#tf_firstname_edit").val();
        personsArray[index].surname = $("#tf_surname_edit").val();
        personsArray[index].mobileno = $("#tf_mobileno_edit").val();
        personsArray[index].email = $("#tf_email_edit").val();
        updateLocalStorage();         
    }

    // Sort the list of contacts
    // This will only sort if the contacts name has a
    // capital letter at the beginning of the first name
    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    }

    // Get the number of contacts in personsArray
    function getNumber() {
        $("#number_of_contacts").html("");
        var num_of_contacts = personsArray.length;
        $("#number_of_contacts").append( num_of_contacts + " Contacts");
    }

    // Refresh the contacts list after new contact has 
    // been added or existing contact has been edited
    function refreshContactList() {
        $("#list_contacts").html("");
        $("#contactDetails").html("");
        $("#name").html("");
        
        // Sort the contact list by first name
        personsArray.sort(dynamicSort("firstname"));

        for (var i = 0; i < personsArray.length; i++) {
            $("#list_contacts").append(
                    "<li>" +
                    "<a href = \"#page_contactDetails\" >" +
                    "<h2>" + personsArray[i].firstname + " " + personsArray[i].surname + "</h2>" +
                    "</li>" +
                    "</a>"
                    );
        }

        // Set the selected contact index to the index 
        // of the contact that was clicked (DOM element)
        $('ul').children('li').click(function () {
            var index = $("li").index(this);
            viewContact(index);
        });

        $("#list_contacts").listview("refresh");
    }

    // Display the contact details for the selected contact
    function viewContact(val) {
        $("#contactDetails").html("");
        $("#name").html("");
        index = val;

        $("#name").append(personsArray[index].firstname + " " + personsArray[index].surname);
        $("#contactDetails").append("Telephone Number: " + "<h3>" + personsArray[index].mobileno + "</h3>" +
                 "Email Address: "  + "<h3>" + personsArray[index].email + " </h3>");
    }

    // Event handlers for button clicks and page load events
    $("#btn_add").on("click", addPerson);
    $("#page_home").on("pagebeforeshow", refreshContactList);
    $("#page_home").on("pagebeforeshow", getNumber);
    $("#page_contactDetails").on("pagecontainerbeforeshow", viewContact);
    $("#btn_delContact").on("click", deletePerson);
    $("#btn_edit_main").on("click", getPerson);
    $("#btn_edit").on("click", editPerson);
    });