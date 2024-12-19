export function hex() {
    let hex = '#';
    let isWhite = true;

    while (isWhite) {
        hex = '#';
        const characters = '0123456789ABCDEF';
        for (let i = 0; i < 6; i++) {
            hex += characters[Math.floor(Math.random() * 16)];
        }

        // Проверяем, является ли сгенерированный цвет белым
        isWhite = hex === '#FFFFFF';
    }

    return hex;
}