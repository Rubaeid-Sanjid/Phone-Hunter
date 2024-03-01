const loadPhone = async (searchText, isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  displayPhone(data.data, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = "";

  const showAllBtn = document.getElementById("showAllBtn");
  if (phones.length > 10 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList = "card bg-base-100 shadow-xl";
    div.innerHTML = `
    <figure class="px-10 pt-10 bg-[#0D6EFD0D]">
        <img src="${phone.image}" alt="phone" class="rounded-xl" />
    </figure>
     <div class="card-body items-center text-center">
       <h2 class="card-title">${phone.phone_name}</h2>
       <p>Grab your desired phone and get ready to experience the ultimate in communication.</p>
        <div class="card-actions">
          <button onclick="showPhoneDetailsHandler('${phone.slug}')" class="btn bg-[#0D6EFD] text-white">Show Details</button>
        </div>
     </div>`;
    cardContainer.appendChild(div);
  });
  loadSpinner(false);
};

const searchHandler = (isShowAll) => {
  loadSpinner(true);
  const searchPhoneField = document.getElementById("searchPhoneField");
  const searchText = searchPhoneField.value;

  loadPhone(searchText, isShowAll);

  if (isShowAll) {
    searchPhoneField.value = "";
  }
};

const loadSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const showAllHandler = () => {
  searchHandler(true);
};

const showPhoneDetailsHandler = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();

  showPhoneDetails(data.data);
};

const showPhoneDetails = (phoneDetails) => {
    const phoneModelName = document.getElementById('phoneModelName');
    phoneModelName.innerText = phoneDetails.name;

    const phoneDetailsContainer = document.getElementById('phoneDetailsContainer');
    phoneDetailsContainer.innerHTML = `
    <img src="${phoneDetails?.image}" alt="">
    <h3><span class="font-semibold text-xl">Storage: </span>${phoneDetails?.mainFeatures?.storage}</h3>
    <h3><span class="font-semibold text-xl">Display Size: </span>${phoneDetails?.mainFeatures?.displaySize}</h3>
    <h3><span class="font-semibold text-xl">Chipset: </span>${phoneDetails?.mainFeatures?.chipSet}</h3>
    <h3><span class="font-semibold text-xl">Memory: </span>${phoneDetails?.mainFeatures?.memory}</h3>
    <h3><span class="font-semibold text-xl">Slug: </span>${phoneDetails?.slug}</h3>
    <h3><span class="font-semibold text-xl">Release Date: </span>${phoneDetails?.releaseDate}</h3>
    <h3><span class="font-semibold text-xl">Brand: </span>${phoneDetails.brand}</h3>
    <h3><span class="font-semibold text-xl">GPS: </span>${phoneDetails?.others?.GPS}</h3>
    `
    my_modal_5.showModal();
};
// loadPhone();
