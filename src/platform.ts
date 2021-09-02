// 当前平台是否支持V8 Break Iterator。 V8检查
// 检测所有基于 Blink 的浏览器是必要的
let hasV8BreakIterator: boolean;

// 我们需要围绕对 `Intl` 的引用进行 try/catch，因为在某些情况下可以访问它
// 导致 IE 抛出。 这些情况与特定版本的 Windows 相关，并且可能在以下情况下发生
// 消费者提供了一个 polyfill 的 `Map`。 看
// https://github.com/Microsoft/ChakraCore/issues/3189
// https://github.com/angular/components/issues/15687
try {
  hasV8BreakIterator =
    typeof Intl !== "undefined" && (Intl as any).v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}

export class Platform {
  isBrowser: boolean = typeof document === "object" && !!document;

  /** 当前浏览器是否为 Microsoft Edge. */
  EDGE: boolean = this.isBrowser && /(edge)/i.test(navigator.userAgent);

  /** 当前渲染引擎是否为微软三叉戟. */
  TRIDENT: boolean =
    this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);

  // EdgeHTML 和 Trident 模拟 Blink 特定的东西，需要从这个检查中排除
  /** 当前渲染引擎是否为Blink */
  BLINK: boolean =
    this.isBrowser &&
    !!((window as any).chrome || hasV8BreakIterator) &&
    typeof CSS !== "undefined" &&
    !this.EDGE &&
    !this.TRIDENT;

  // Webkit 是 EdgeHTML、Blink 和 Trident 中 userAgent 的一部分。 因此，我们需要确保 Webkit 独立运行，而不是用作其他引擎的基础。
  /** 当前渲染引擎是否为WebKit. */
  WEBKIT: boolean =
    this.isBrowser &&
    /AppleWebKit/i.test(navigator.userAgent) &&
    !this.BLINK &&
    !this.EDGE &&
    !this.TRIDENT;

  /** 当前平台是否为苹果iOS. */
  IOS: boolean =
    this.isBrowser &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !("MSStream" in window);

  // 很难检测到普通的 Gecko 引擎，因为大多数浏览器都识别
  // 他们自己作为 Gecko-like 浏览器，并根据它修改 userAgent。
  // 由于我们只涵盖了一个明确的 Firefox 案例，我们可以简单地检查 Firefox
  // 而不是对 Gecko 进行不稳定的检查。
  /** 当前浏览器是否为火狐. */
  FIREFOX: boolean =
    this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);

  /** 当前平台是否为Android. */
  // 移动端的 Trident 将 android 平台添加到 userAgent 以欺骗检测.
  ANDROID: boolean =
    this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;

  // Safari 浏览器将在其 userAgent 中包含 Safari 关键字。 有些浏览器可能是假的
  // 这只是将 Safari 关键字放在 userAgent 中。 为了让 Safari 更安全
  // Safari 浏览器也应该使用 Webkit 作为其布局引擎
  /** 当前浏览器是否为Safari. */
  SAFARI: boolean =
    this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
}
