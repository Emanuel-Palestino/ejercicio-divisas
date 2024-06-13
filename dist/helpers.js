"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSQLDateFormat = void 0;
const getSQLDateFormat = (date) => {
    // Componentes de la fecha
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
exports.getSQLDateFormat = getSQLDateFormat;
//# sourceMappingURL=helpers.js.map