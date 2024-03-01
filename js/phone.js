const loadPhone = async (searchText) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  displayPhone(data.data);
};

const displayPhone = (phones) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = "";

  const showAllBtn = document.getElementById("showAllBtn");
  if (phones.length > 10) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  phones = phones.slice(0, 9);

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList = "card bg-base-100 shadow-xl";
    div.innerHTML = `
    <figure class="px-10 pt-10 bg-[#0D6EFD0D]">
        <img src="${phone.image}" alt="phone" class="rounded-xl" />
    </figure>
     <div class="card-body items-center text-center">
       <h2 class="card-title">${phone.phone_name}</h2>
       <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button class="btn bg-[#0D6EFD] text-white">Show Details</button>
        </div>
     </div>`;
    cardContainer.appendChild(div);
  });
  loadSpinner(false);
};

const searchHandler = () => {
  loadSpinner(true);
  const searchPhoneField = document.getElementById("searchPhoneField");
  const searchText = searchPhoneField.value;

  loadPhone(searchText);
  searchPhoneField.value = "";
};

const loadSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loadingSpinner");
  if(isLoading){
    loadingSpinner.classList.remove("hidden");
  }
  else{
    loadingSpinner.classList.add("hidden");
  }
};

// loadPhone();
