import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { CartItemType } from "../type/product";
import {
  addOrUpdateToCart as updateCart,
  removeFromCart as removeCart,
} from "../api/firebase";

export default function useCarts() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cartlist", uid || ""],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  const addOrUpdateToCart = useMutation({
    mutationFn: (product: CartItemType) => updateCart(uid as string, product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartlist", uid as string],
      });
    },
  });

  const removeFromCart = useMutation({
    mutationFn: (productId: string) => removeCart(uid as string, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartlist", uid as string],
      });
    },
  });
  return { cartQuery, addOrUpdateToCart, removeFromCart };
}
