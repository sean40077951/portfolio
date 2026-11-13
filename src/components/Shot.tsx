import Image from "next/image";
import type { ProjectShot } from "@/content/types";

/**
 * 作品畫面。
 * 圖說不在這裡——每張圖都緊接在講它的章節文字底下，文字本身就是圖說。
 */
export function Shot({
  shot,
  priority = false,
}: {
  shot: ProjectShot;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-raise">
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        className="w-full"
        sizes="(max-width: 1024px) 100vw, 1024px"
        priority={priority}
      />
    </div>
  );
}
