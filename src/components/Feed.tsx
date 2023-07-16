"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import type { Post } from "@/lib/types";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./post/PostCard";
import Spinner from "./Spinner";

export default function Feed() {
  let feed: "Home" | "Following" = "Home";
  useEffect(() => {
    feed = localStorage.getItem("feed") as "Home" | "Following";
  });

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["homeFeed"],
    queryFn: async ({ pageParam }) =>
      (await axios.get(`/api/posts?postId=${pageParam}&feed=${feed}`)).data,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length == 11) {
        return lastPage[lastPage.length - 1].postId;
      } else {
        return undefined;
      }
    },
    enabled: !!feed,
  });

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );

  if (data && data?.pages[0].length > 0)
    return (
      <>
        <InfiniteScroll
          dataLength={data.pages.flatMap((page) => page).length}
          hasMore={hasNextPage || false}
          loader={
            <div className="flex w-full justify-center">
              <Spinner size="md" />
            </div>
          }
          endMessage={<p className="text-ring/70 text-center">No more posts</p>}
          next={fetchNextPage}
          className="flex flex-col gap-2.5 pb-2.5"
        >
          {data.pages.map((page) => {
            return page.map((post: Post) => {
              return <PostCard key={post.postId} post={post} />;
            });
          })}
        </InfiniteScroll>
      </>
    );
  else return <p className="text-ring/70 text-center">No posts yet...</p>;
}
