import API from "@/libs/api";
import { useMemo, useCallback } from "react";
import useSWR from 'swr';
import fetcher from "@/libs/fetcher";


const useComments = (postId) => {
    if (!postId) {
      return {
        data: null,
        mutate: () => {}, // Placeholder function
        isLoading: false,
        error: null,
      };
    }
  
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tweets/${postId}/comments/`;
    const { data, mutate, isLoading, error } = useSWR(url, fetcher);
    return { data, mutate, isLoading, error };
  };
  

export {
    useComments
};

