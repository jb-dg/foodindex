import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://world.openfoodfacts.org/api/v2";

export function useFetchQuery(path: string) {
  return useQuery({
    queryKey: [path],
    queryFn: async () => {
      await wait(1);
      return fetch(endpoint + path).then((result) => result.json());
    },
  });
}

export function useInfiniteFetchQuery(path: string, pageSize = 21) {
  return useInfiniteQuery({
    queryKey: [path, pageSize],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      await wait(1);
      const page = typeof pageParam === "number" ? pageParam : 1;
      const url = buildPagedUrl(path, page, pageSize);
      return fetch(url, {
        headers: {
          Accept: "application/json",
        },
      }).then((result) => result.json());
    },
    getNextPageParam: (lastPage) => {
      const page =
        typeof lastPage.page === "number"
          ? lastPage.page
          : Number(lastPage.page);
      const pageCount =
        typeof lastPage.page_count === "number"
          ? lastPage.page_count
          : Number(lastPage.page_count);

      if (!Number.isNaN(page) && !Number.isNaN(pageCount) && page < pageCount) {
        return page + 1;
      }

      if (typeof lastPage.next === "string") {
        const nextPage = extractNextPage(lastPage.next);
        if (nextPage !== null) {
          return nextPage;
        }
      }
      return undefined;
    },
  });
}

function buildPagedUrl(path: string, page: number, pageSize: number) {
  const separator = path.includes("?") ? "&" : "?";
  return `${endpoint}${path}${separator}page=${page}&page_size=${pageSize}`;
}

function extractNextPage(nextUrl: string) {
  const match = /[?&]page=(\d+)/.exec(nextUrl);
  return match ? Number(match[1]) : null;
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration * 1000));
}
