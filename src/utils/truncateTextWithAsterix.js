

export const truncateTextWithAsterix = (text, maxLength) => text.length > maxLength ? `${text.slice(0, maxLength)}***` : text;
