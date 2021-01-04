import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location";
class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
  }
  sharePlaceHandler() {
    const shareLinkInputElement = document.getElementById("share-link");
    if (!navigator.clipboard) {
      shareLinkInputElement.select();

      return;
    } else {
    }
    navigator.clipboard.writeText(shareLinkInputElement.value).then(() =>{
        alert('Copied into clipboard')
    }).catch( err => {
        console.log(err);
        shareLinkInputElement.select();
    });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    const shareLinkInputElement = document.getElementById("share-link");
    shareLinkInputElement.value = `${
      location.origin
    }/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${
      coordinates.lng
    }`;
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "location feature is not available in your browser - please use a more model browser"
      );
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "loading location - please wait!"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude, // Math.random() * 50

          lng: successResult.coords.longitude,
        };
        // console.log(coordinates);

        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        alert(
          "code not locate you unfortunately. Please eneter an address manually!."
        );
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid address entered - Please try Again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "loading location - please wait!"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);

      this.selectPlace(coordinates, address);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();
