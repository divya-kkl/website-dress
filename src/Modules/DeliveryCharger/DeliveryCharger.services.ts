import { deliveryChargerModel } from "../../DB/MongoDB/DeliveryCharger/DeliveryCharger.js";

export const DeliveryChargerService = {
    async getAllDeliveryChargers() {
        const chargers = await deliveryChargerModel.find().sort({ createdTime: -1 });
        return chargers.map(charger => ({
            id: charger._id,
            charge: charger.charge,
            status: charger.status,
            createdTime: charger.createdTime?.toString()
        }));
    },

    async getDeliveryCharger() {
        const charger = await deliveryChargerModel.findOne().sort({ createdTime: -1 });
        if (!charger) {
            throw new Error("Delivery Charger not found");
        }
        return {
            id: charger._id,
            charge: charger.charge,
            status: charger.status,
            createdTime: charger.createdTime?.toString()
        };
    },

    async getDeliveryChargerById(id: string) {
        const charger = await deliveryChargerModel.findById(id);
        if (!charger) {
            throw new Error("Delivery Charger not found");
        }
        return {
            id: charger._id,
            charge: charger.charge,
            status: charger.status,
            createdTime: charger.createdTime?.toString()
        };
    },

    async createDeliveryCharger(input: any) {
        const newCharger = await deliveryChargerModel.create(input);
        return {
            id: newCharger._id,
            charge: newCharger.charge,
            status: newCharger.status,
            createdTime: newCharger.createdTime?.toString()
        };
    },

    async updateDeliveryCharger(id: string, input: any) {
        const updatedCharger = await deliveryChargerModel.findByIdAndUpdate(id, input, { new: true });
        if (!updatedCharger) {
            throw new Error("Delivery Charger not found");
        }
        return {
            id: updatedCharger._id,
            charge: updatedCharger.charge,
            status: updatedCharger.status,
            createdTime: updatedCharger.createdTime?.toString()
        };
    },

    async deleteDeliveryCharger(id: string) {
        const deletedCharger = await deliveryChargerModel.findByIdAndDelete(id);
        if (!deletedCharger) {
            throw new Error("Delivery Charger not found");
        }
        return "Delivery Charger deleted successfully";
    }
};
