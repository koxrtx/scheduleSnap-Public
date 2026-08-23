// /api/v1/image は「画像を受け取る窓口」
import { Hono } from 'hono';
// 送られてくるデータのサイズを制限
import { bodyLimit } from 'hono/body-limit';
const imageRoute = new Hono();
imageRoute.post('/upload', bodyLimit({
    maxSize: 5 * 1024 * 1024, // 5 MiB
    onError: (c) => {
        return c.text('ファイルサイズが大きすぎます', 413);
    },
}), async (c) => {
    const body = await c.req.parseBody();
    const file = body['file'];
    if (!(file instanceof File)) {
        return c.text('ファイルが必要です', 400);
    }
    return c.text(`アップロード完了 ${file.name}`);
});
export default imageRoute;
