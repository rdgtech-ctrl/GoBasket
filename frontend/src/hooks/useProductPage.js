import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api.js";

export function useProductPage() {
  const { slug } = useParams();
  // useParams() A React Router hook that returns an object containing all dynamic URL parameters defined in your route.
  // const { slug }
  // Destructures the slug parameter from the object returned by useParams().
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => apiFetch(`/api/products/${slug}`),
    enabled: Boolean(slug),
  });
//   useQuery : uses TanSack Query to fetch data with automatic caching and state management

  return {
    slug,
    product: data?.product ?? null,
    isLoading,
    error,
  };
//   Returns an object with:slug,product,isLoading,error
}
