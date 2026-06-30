import { DeliveryChargerService } from "./DeliveryCharger.services.js";

export const DeliveryChargerResolver = {
    Query: {
        getAllDeliveryChargers: async (_: any, __: any, context: any) => {
            return DeliveryChargerService.getAllDeliveryChargers();
        },

        getDeliveryChargerById: async (_: any, { id }: any, context: any) => {
            return DeliveryChargerService.getDeliveryChargerById(id);
        },

        getDeliveryCharger: async (_: any, __: any, context: any) => {
            return DeliveryChargerService.getDeliveryCharger();
        }
    },
    Mutation: {
        createDeliveryCharger: async (_: any, { input }: any, context: any) => {
            return DeliveryChargerService.createDeliveryCharger(input);
        },
        updateDeliveryCharger: async (_: any, { id, input }: any, context: any) => {
            return DeliveryChargerService.updateDeliveryCharger(id, input);
        },
        deleteDeliveryCharger: async (_: any, { id }: any, context: any) => {
            return DeliveryChargerService.deleteDeliveryCharger(id);
        }
    }
};
