// utils/formatName.ts

export function formatName(name: string): string {
    // Eliminar espacios de inicio y final
    name = name.trim();

    // Dividir el nombre en partes por los espacios
    let parts = name.split(' ');

    // Filtrar partes vacías y capitalizar cada parte
    parts = parts
        .filter(part => part !== '')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());

    // Unir las partes en una sola cadena
    return parts.join(' ');
}
