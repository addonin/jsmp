class TransportService {
    getTransport(type) {
        switch(type) {
            case "car": return new Car();
            case "ship": return new Ship();
            //add new type of transport, for example, plain
        }
    }
}

class DeliveryService {
    constructor(transportService) {
        this.idCounter = 0;
        this.transportService = transportService;
    }

    deliver(transportType, content) {
        let transport = transportService.getTransport(transportType);
        transport.setParcel(content);
        transport.deliver();
    }
}

class Transport {
    setParcel(parcel) {
        this.parcel = parcel;
    }
    deliver() {
    }
}

class Car extends Transport {
    deliver(parcel) {
        console.log("I deliver " + this.parcel + " by land");
    }
}

class Ship extends Transport {  
    deliver(parcel) {
        console.log("I deliver " + this.parcel + " by sea");
    }  
}

let transportService = new TransportService();
let deliveryService = new DeliveryService(transportService);
deliveryService.deliver("car", "book");
deliveryService.deliver("ship", "beer");