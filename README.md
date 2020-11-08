## express-paginate

-   https://developer.aliyun.com/mirror/npm/package/express-paginate

```js
// 사용
app.use(paginate.middleware(10, 50));
// limit = 10 초기 리턴 개수
// maxLimit = 50 최대 리턴 개수
// 뒤에서 limit =10000으로 요청해도 최대 50개까지만 리턴된다.
```
