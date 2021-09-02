## ajanuw-browser-platform

检测浏览器类型

## example
```js
const { Platform } = BrowserPlatform;
console.log(new Platform());
```


## Platform
```ts
 class Platform {
    isBrowser: boolean;
    EDGE: boolean;
    TRIDENT: boolean;
    BLINK: boolean;
    WEBKIT: boolean;
    IOS: boolean;
    FIREFOX: boolean;
    ANDROID: boolean;
    SAFARI: boolean;
}
```

See alse:
  - 源码来至[`@angular/cdk`](https://github.com/angular/components)

