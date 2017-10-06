class OldPowerSocket {
    getVolts() {
        return 220;
    }
}

class PowerAdapter {
    constructor(socket) {
        this.socket = socket;
    }

    getVolts() {}
}

class USAPowerAdapter extends PowerAdapter {
    getVolts() {
        return this.socket.getVolts() / 2;
    }
}

class ChinaPowerAdapter extends PowerAdapter {
    getVolts() {
        return this.socket.getVolts() - 100;
    }
}

const powerSocket = new OldPowerSocket();
let usaPowerAdapter = new USAPowerAdapter(powerSocket);
let chinaPowerSocket = new ChinaPowerAdapter(powerSocket);
console.log("Old power socket gives " + powerSocket.getVolts());
console.log("Socket with USA adapter gives " + usaPowerAdapter.getVolts());
console.log("Socket with China adapter gives " + chinaPowerSocket.getVolts());

