// ドップページ
import Image from 'next/image';
import LoginButton from '@/components/LoginButton';

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center pt-20">
      <div className="text-center">
        <Image
          src="/logo.png"
          alt="Schedule Snap ロゴ"
          width={120}
          height={120}
          className="mx-auto"
          /* ファーストビューの為、先に読み込んでおく */
          preload
        />
        <p>園からもらった予定表を撮影するだけ</p>
        <p>写真を撮るだけで</p>
        <p>大切な予定をGoogleカレンダーへ登録</p>

        <LoginButton />
        <p className="mt-4 text-xs text-gray-500">Googleログインすると</p>
        <p className="text-xs text-gray-500">
          読み取った予定をGoogleカレンダーへ登録できます。
        </p>
      </div>
    </main>
  );
}
