export default class StringHelper {
    static capitalize(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
} 