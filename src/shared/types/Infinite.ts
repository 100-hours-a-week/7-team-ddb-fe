export interface InfiniteList<T> {
  items: T[];
  pagination: Pagination;
  links: Links;
}

interface Pagination {
  limit: number;
  nextCursor: string | null;
  hasNext: boolean;
}

interface Links {
  self: { href: string };
  next: { href: string };
}
