import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("click", this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
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
      (successResult) => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude, // Math.random() * 50

          lng: successResult.coords.longitude,
        };
        console.log(coordinates);
        this.selectPlace(coordinates);
      },
      (error) => {
        modal.hide();
        alert(
          "code not locate you unfortunately. Please eneter an address manually!."
        );
      }
    );
  }

  findAddressHandler(event) {
    event.preventDefault();
    const address = document.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid address entered - Please try Again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "loading location - please wait!"
    );
    modal.show();

    
  }
}

const placeFinder = new PlaceFinder();
