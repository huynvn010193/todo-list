import { useFirestore } from "@/lib/firebase";
import { Tool } from "@/constants/type";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export const useTools = () => {
  const db = useFirestore();

  return useQuery<Tool[]>({
    queryKey: ["tools"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "tools"));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Tool[];
    },
  });
};
