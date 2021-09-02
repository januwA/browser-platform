let hasV8BreakIterator;
try {
    hasV8BreakIterator =
        typeof Intl !== "undefined" && Intl.v8BreakIterator;
}
catch (_a) {
    hasV8BreakIterator = false;
}
export class Platform {
    constructor() {
        this.isBrowser = typeof document === "object" && !!document;
        this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
        this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
        this.BLINK = this.isBrowser &&
            !!(window.chrome || hasV8BreakIterator) &&
            typeof CSS !== "undefined" &&
            !this.EDGE &&
            !this.TRIDENT;
        this.WEBKIT = this.isBrowser &&
            /AppleWebKit/i.test(navigator.userAgent) &&
            !this.BLINK &&
            !this.EDGE &&
            !this.TRIDENT;
        this.IOS = this.isBrowser &&
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !("MSStream" in window);
        this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
        this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
        this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    }
}
