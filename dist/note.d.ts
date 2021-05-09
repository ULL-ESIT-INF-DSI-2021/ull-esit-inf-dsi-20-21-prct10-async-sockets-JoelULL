/**
 * @enum colors Possible colors
 */
export declare class Note {
    private user;
    private title;
    private body;
    private color;
    constructor(user: string, title: string, body: string, color: string);
    getName(): string;
    /**
     * Returns Note's title
     * @returns Note's title
     */
    getTitle(): string;
    /**
     * Returns Note's body
     * @returns Note's body
     */
    getBody(): string;
    /**
     * Returns Note's color
     * @returns Note's color
     */
    getColor(): string;
}
