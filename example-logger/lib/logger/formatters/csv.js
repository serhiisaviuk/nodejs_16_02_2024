export const header = 'Date, level, category, message';
export default function formatMessage(date, level, category, message) {
    return `${date},${level},${category},${JSON.stringify(message)}`
}
