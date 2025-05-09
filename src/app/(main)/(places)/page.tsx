import { Map, SearchBar, CategoryList } from '@/features/place';

export default function Home() {
  return (
    <div className="relative h-full w-full">
      <Map places={[]} />
      <div className="absolute top-0 left-0 z-10 flex w-full flex-col gap-5 px-4 pt-4">
        <SearchBar />
        <CategoryList />
      </div>
    </div>
  );
}
