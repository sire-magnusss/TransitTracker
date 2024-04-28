import photo1 from "../assets/images/combis/SesfikileHiace.png";
import photo2 from "../assets/images/combis/toyota2002.png";
import photo3 from "../assets/images/combis/passengerToyotaHiaceVan.png";

const combis = [
  {
    id: 1,
    make: "Toyota HiAce SuperGL",
    plate: "B724 AYH",
    photo: photo1,
    isFull: false,
    eta: "5 mins",
    driverName: "Sabo Ntumelang",
  },
  {
    id: 2,
    make: "Toyota Hiace 4WD",
    plate: "B667 AFE",
    photo: photo2,
    isFull: true,
    eta: "3 mins",
    driverName: "Kgosi Ishmael",
  },
  {
    id: 3,
    make: "Toyota Hiace Passenger Van",
    plate: "B989 BVS",
    photo: photo3,
    isFull: true,
    eta: "3 mins",
    driverName: "Tlotlo Duncan",
  },
];

export default combis;
