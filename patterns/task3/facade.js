class SkiResortTerminalBox {
    constructor() {
        this.skiingService = new SkiingService();
        this.skiLiftService = new SkiLiftService();
        this.apartmentService = new ApartmentService();
    }

    orderSkiPackage(fullName, height, weight, age, gender) {
        this.skiingService.rentSkiing(fullName, height, weight);
        this.skiLiftService.buyTicket(fullName);
        this.apartmentService.rentApartment(fullName, age, gender);
    }
}

class SkiingService {
    rentSkiing(fullName, height, weight) {
        console.log(fullName + " with h:" + height + " and w:" + weight + " successfully rent skiing");
    }
}

class SkiLiftService {
    buyTicket(fullName) {
        console.log(fullName + " bought 1 ticket for ski lift");
    }
}

class ApartmentService {
    rentApartment(fullName, age, gender) {
        console.log(fullName + " (age:" + age + ", gender:" + gender + ") rent an appartment");
    }
}

const terminalBox = new SkiResortTerminalBox();
terminalBox.orderSkiPackage("Dmitry Adonin", 190, 82, 33, "male");
