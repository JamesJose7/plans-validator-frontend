import config from "./config";

export default {
    urls() {
        return {
            report: (periodo, componente) => `${config.backendUrl}/validator/reporte/${periodo}/${componente}`
        }
    }
}
