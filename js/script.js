document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const studentList = document.querySelector(".student-list");
  const linkList = document.querySelector(".link-list");

  let pages = Math.floor(data.length / 9); // number of pages not include search functionality;
  let currentPage = 1;
  let lastPage = 1;
  let slicedStudents = data.slice((currentPage - 1) * 9, currentPage * 9);

  //dynamically insert search form - extra credit;
  const label = document.createElement("label");
  label.for = "search";
  label.className = "student  // student list-search";

  label.innerHTML = `
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   `;

  header.insertAdjacentElement("beforeend", label);

  // Pagination
  for (let i = 1; i <= pages; i++) {
    linkList.innerHTML += `
      <li>
       <button type="button">${i}</button>
     </li>`;
  }

  function updateStudentList(){
   studentList.innerHTML = ``;
   for (let i = 0; i < slicedStudents.length; i++) {
      const { title, first, last } = slicedStudents[i].name;
      const { date } = slicedStudents[i].registered;
      const { large, medium, thumbnail } = slicedStudents[i].picture;
      studentList.innerHTML += `
        <li class="student-item cf">
            <div class="student-details">
              <img class="avatar" src="${medium}" alt="Profile Picture">
              <h3>${title} ${first} ${last}</h3>
              <span class="email">${slicedStudents[i].email}</span>
            </div>
            <div class="joined-details">
              <span class="date">Joined ${date}</span>
            </div>
          </li>
          `;
    }
  }

  let activeButtons = linkList.querySelectorAll("li button");
  // apply active status to the correct button
  activeButtons.forEach((button) => {
     button.addEventListener("click", (e) => {
      // Update currentPage before slicing students
      lastPage = +currentPage;
      currentPage = +e.target.textContent;
      slicedStudents = data.slice((currentPage - 1) * 9, currentPage * 9);
      updateStudentList();
      
      // Remove active class from all buttons
      activeButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to the clicked button
      e.target.classList.add("active");
    });

  });

  

  //end of the domload
});
