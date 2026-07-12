import SkeletonPokedex from "./skeleton/skeleton-pokedex";

export function CardLoading() {
  return (
    <div className="grid grid-cols-4 gap-4 mx-2">
      {Array.from({ length: 20 }).map((_, i) => (
        <SkeletonPokedex key={i} />
      ))}
    </div>
  );
}